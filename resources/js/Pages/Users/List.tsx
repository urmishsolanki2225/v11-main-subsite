// Added By Cyblance for delete functionality start
import React, { useEffect, useState } from "react";
// Added By Cyblance for delete functionality end

import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { GridColDef, GridCellParams } from "@mui/x-data-grid";
import route from "ziggy-js";

import Listing, {
    ListingMultiSelectActionHandler,
} from "../../Components/Listing";
import useDataSource from "../../Components/useDataSource";
import AppBarHeader from "../../Layout/AppBarHeader";
import ContentScroll from "../../Layout/ContentScroll";
import { User } from "../../Models";
import { AuthPageProps, IListingPageProps } from "../../Models/Inertia";
import Paginated from "../../Models/Paginated";
import { makeDateColumn } from "../../Utils/DataGridUtils";

interface IProps extends IListingPageProps, AuthPageProps {
    users: Paginated<User>;
}
const List: React.FC<IProps> = ({ users, filter: _filter, sort, can }) => {
    const [search, setSearch] = useState<string>();
    const [filter, setFilter] = useState(_filter);
    const dataSource = useDataSource({
        mode: "inertia",
        paginatedData: users,
        search,
        filter,
        sort,
    });

    const columns: GridColDef[] = [
        { field: "id" },
        {
            field: "name",
            renderCell: (cell: GridCellParams) => (
                <>
                    <InertiaLink
                        href={route("admin.users.edit", {
                            id: cell.row.id,
                        }).toString()}
                    >
                        {(cell.row as User).name ?? "- no name -"}
                    </InertiaLink>
                </>
            ),
            flex: 2,
        },
        {
            field: "email",
            renderCell: (cell: GridCellParams) => (
                <>
                    <InertiaLink
                        href={route("admin.users.edit", {
                            id: cell.row.id,
                        }).toString()}
                    >
                        {(cell.row as User).email ?? "- no email -"}
                    </InertiaLink>
                </>
            ),
            flex: 2,
        },
        { field: "role" },
        makeDateColumn("created_at"),
        makeDateColumn("updated_at"),
    ];

    const handleTrash: ListingMultiSelectActionHandler<User> = (ids) => {
        Inertia.post(route("admin.users.multiple.trash"), {
            ids,
        });
    };
    const handleRestore: ListingMultiSelectActionHandler<User> = (ids) => {
        Inertia.post(route("admin.users.multiple.restore"), {
            ids,
        });
    };
    const handleDestroy: ListingMultiSelectActionHandler<User> = (ids) => {
        Inertia.delete(route("admin.users.multiple.destroy"), {
            data: { ids },
        });
    };

    const onCreate = () => {
        Inertia.get(route("admin.users.create"));
    };

    useEffect(() => {
        setFilter(_filter);
    }, [_filter]);

    const title = "Users";

    return (
        <>
            <AppBarHeader
                title={title}
                filter={filter}
                onSearch={setSearch}
                onChangeFilter={setFilter}
                filterOptions={
                    can?.users?.deleteMany
                        ? [
                              {
                                  label: "Deleted users",
                                  name: "trashed",
                                  value: "only",
                              },
                          ]
                        : []
                }
            >
                <IconButton
                    onClick={onCreate}
                    disabled={!can?.users?.create}
                    size="large"
                >
                    <AddIcon />
                </IconButton>
            </AppBarHeader>
            <ContentScroll>
                <Listing
                    columns={columns}
                    dataSource={dataSource}
                    multiSelectActions={{
                        actions:
                            filter?.filter?.trashed === "only"
                                ? [
                                      ...(can?.users?.restoreMany
                                          ? [
                                                {
                                                    identifier: "restore",
                                                    label: "Restore",
                                                    onAction: handleRestore,
                                                },
                                            ]
                                          : []),
                                      ...(can?.users?.forceDeleteMany
                                          ? [
                                                {
                                                    identifier: "destroy",
                                                    label: "Delete permanently",
                                                    onAction: handleDestroy,
                                                },
                                            ]
                                          : []),
                                  ]
                                : can?.users?.deleteMany
                                ? [
                                      {
                                          identifier: "trash",
                                          label: "Delete User",
                                          onAction: handleTrash,
                                      },
                                  ]
                                : [],
                    }}
                ></Listing>
            </ContentScroll>
        </>
    );
};

export default List;
