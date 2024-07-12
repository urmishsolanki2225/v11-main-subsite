import React, { useEffect, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { GridColDef } from "@mui/x-data-grid";
import route from "ziggy-js";

import PublishStatusIcon from "../../Components/General/PublishStatusIcon";
import Listing, {
    ListingMultiSelectActionHandler,
} from "../../Components/Listing";
import ShareRecord from "../../Components/ShareRecord";
import useDataSource from "../../Components/useDataSource";
import { AvailableLanguages } from "../../Config";
import AppBarHeader from "../../Layout/AppBarHeader";
import ContentScroll from "../../Layout/ContentScroll";
import { Collection } from "../../Models";
// Add By cyblance For sharing start
import { findTitle, Content } from "../../Models/Content";
// Add By cyblance For sharing end
import { AuthPageProps, IListingPageProps } from "../../Models/Inertia";
import Item from "../../Models/Item";
import Paginated from "../../Models/Paginated";
import { LangColumn, makeDateColumn } from "../../Utils/DataGridUtils";

//Add By cyblance For sharing start
// Add By cyblance For sharing end

interface IProps extends IListingPageProps, AuthPageProps {
    items: Paginated<Item>;
    collection?: Collection;
}
const List: React.FC<IProps> = ({
    items,
    collection,
    filter: _filter,
    sort,
    can,
}) => {
    const [search, setSearch] = useState<string>();
    const [filter, setFilter] = useState(_filter);
    const dataSource = useDataSource({
        mode: "inertia",
        paginatedData: items,
        search,
        filter,
        sort,
    });

    //Add By cyblance For sharing start
    const [hideColumn, sethideColumn] = React.useState(false);
    //Add By cyblance For sharing start

    const columns: GridColDef[] = [
        {
            field: "id",
            renderCell: (cell) => (
                <>
                    {cell.row.id} <PublishStatusIcon item={cell.row as Item} />
                </>
            ),
        },
        {
            field: "Share Post",
            sortable: false,
            hide: hideColumn,
            renderCell: (cell) => (
                <div>
                    {cell.row.status == "published" &&
                    (cell.row.type == "article" ||
                        cell.row.type == "static") ? (
                        <IconButton
                            onClick={(evt) => {
                                evt.stopPropagation(),
                                    handleModelClickOpen(
                                        cell.row.id,
                                        (cell.row as Item | Collection).contents
                                            .map(
                                                (content: Content) =>
                                                    content.lang
                                            )
                                            .join(",")
                                    );
                            }}
                        >
                            <ShareIcon />
                        </IconButton>
                    ) : (
                        <IconButton disabled>
                            <ShareIcon />
                        </IconButton>
                    )}
                </div>
            ),
        },
        {
            field: "title",
            renderCell: (cell) => (
                <InertiaLink
                    href={route("admin.items.edit", {
                        id: cell.row.id,
                    }).toString()}
                >
                    {findTitle(cell.row as Item) ||
                        (cell.row as Item).contents[0]?.title ||
                        "- no title -"}
                </InertiaLink>
            ),
            flex: 2,
        },
        LangColumn,
        makeDateColumn("created_at"),
        makeDateColumn("updated_at"),
        makeDateColumn("publish_at"),
        { field: "type" },
        { field: "subtype" },
    ];

    //Add By cyblance For sharing Start
    const [item_array, setMyArray] = useState([]) as any;
    const [shareids, setshareids] = React.useState("");
    const [sellangs, setSellangs] = React.useState("");
    const handleModelClickOpen = (id: any, lang: any) => {
        const langarray = lang.split(",");
        setSellangs(langarray);
        setshareids(id);
        setMyArray({ ...item_array, ["type"]: "items", ["id"]: id });
    };
    //Add By cyblance For sharing end

    const handleTrash: ListingMultiSelectActionHandler<Item> = (ids) => {
        Inertia.post(route("admin.items.multiple.trash"), {
            ids,
        });
    };
    const handleRestore: ListingMultiSelectActionHandler<Item> = (ids) => {
        Inertia.post(route("admin.items.multiple.restore"), {
            ids,
        });
    };
    const handleDestroy: ListingMultiSelectActionHandler<Item> = (ids) => {
        Inertia.delete(route("admin.items.multiple.destroy"), {
            data: { ids },
        });
    };

    const onCreate = () => {
        Inertia.get(route("admin.items.create"));
    };

    useEffect(() => {
        filter?.filter?.trashed === "only"
            ? sethideColumn(true)
            : sethideColumn(false);
    }, [filter]);

    useEffect(() => {
        setFilter(_filter);
    }, [_filter]);

    return (
        <>
            <AppBarHeader
                title={
                    collection ? `Items in '${findTitle(collection)}'` : `Items`
                }
                afterTitle={
                    collection?.id ? (
                        <Tooltip title="Edit collection">
                            <IconButton
                                size="small"
                                onClick={() =>
                                    Inertia.get(
                                        route("admin.collections.edit", {
                                            id: collection.id,
                                        })
                                    )
                                }
                                color="inherit"
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    ) : undefined
                }
                filterOptions={[
                    {
                        label: "Missing translations",
                        name: "missing_translations",
                    },
                    {
                        label: "Missing workarea",
                        name: "missing_workarea",
                    },
                    {
                        label: "Hide unpublished",
                        name: "status",
                        value: "published",
                    },
                    {
                        label: "Trashed items",
                        name: "trashed",
                        value: "only",
                    },
                ]}
                filter={filter}
                onSearch={setSearch}
                onChangeFilter={setFilter}
            >
                <IconButton
                    onClick={onCreate}
                    disabled={can ? !can?.items?.create : true}
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
                                      ...(can?.items?.restoreMany
                                          ? [
                                                {
                                                    identifier: "restore",
                                                    label: "Restore",
                                                    onAction: handleRestore,
                                                },
                                            ]
                                          : []),
                                      ...(can?.items?.forceDeleteMany
                                          ? [
                                                {
                                                    identifier: "destroy",
                                                    label: "Delete permanently",
                                                    onAction: handleDestroy,
                                                },
                                            ]
                                          : []),
                                  ]
                                : can?.items?.deleteMany
                                ? [
                                      {
                                          identifier: "trash",
                                          label: "Move to Trash",
                                          onAction: handleTrash,
                                      },
                                  ]
                                : [],
                    }}
                ></Listing>
            </ContentScroll>
            {/*Add By cyblance For sharing start*/}
            {shareids ? (
                <ShareRecord
                    RecordLang={sellangs}
                    Id={shareids}
                    setArray={item_array}
                    AvailableLang={AvailableLanguages}
                />
            ) : (
                <></>
            )}
            {/*Add By cyblance For sharing end*/}
        </>
    );
};

export default List;
