import React, { useEffect, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import route from "ziggy-js";

import LinkQuery from "../../Components/General/LinkQuery";
import PublishStatusIcon from "../../Components/General/PublishStatusIcon";
import Listing, {
    DataCellCollectionTree,
    ListingMultiSelectActionHandler,
} from "../../Components/Listing";
import ShareRecord from "../../Components/ShareRecord";
import useDataSource from "../../Components/useDataSource";
import { StatusType, AvailableLanguages } from "../../Config";
import AppBarHeader from "../../Layout/AppBarHeader";
import ContentScroll from "../../Layout/ContentScroll";
import { Item } from "../../Models";
import Collection from "../../Models/Collection";
//Add By cybalnce For sharing start
import { findTitle, Content } from "../../Models/Content";
//Add By cybalnce For sharing end
import { AuthPageProps, IListingPageProps } from "../../Models/Inertia";
import Paginated from "../../Models/Paginated";
import { LangColumn, makeDateColumn } from "../../Utils/DataGridUtils";

interface IProps extends IListingPageProps, AuthPageProps {
    collections: Paginated<Collection>;
    parent_types: string[];
    child_types: string[];
}
const List: React.FC<IProps> = ({
    collections,
    child_types,
    filter: _filter,
    sort,
    can,
}) => {
    const [filter, setFilter] = useState(_filter);
    const [search, setSearch] = useState<string>();
    const dataSource = useDataSource({
        mode: "inertia",
        paginatedData: collections,
        search,
        filter,
        sort,
    });

    // Add By cyblance For sharing start
    const [hideColumn, sethideColumn] = React.useState(false);
    // Add By cyblance For sharing end

    useEffect(() => {
        const newStatuses: { [key: number]: StatusType } = {};
        collections.data.forEach(({ id, status }) => {
            newStatuses[id] = status;
        });
    }, [collections]);

    const onCreate = () => {
        Inertia.get(route("admin.collections.create"));
    };

    useEffect(() => {
        setFilter(_filter);
    }, [_filter]);

    const columns: GridColDef[] = [
        {
            field: "id",
            renderCell: (cell) => (
                <Box display="flex" justifyContent="space-between">
                    {cell.id}{" "}
                    <DataCellCollectionTree
                        collection={cell.row as Collection}
                        onSelect={(subCollection) =>
                            Inertia.get(
                                route("admin.collections.edit", {
                                    id: subCollection.id,
                                })
                            )
                        }
                    />
                </Box>
            ),
            align: "right",
        },
        {
            field: "Share Post",
            sortable: false,
            hide: hideColumn,
            renderCell: (cell) => (
                <div>
                    {cell.row.status == "published" &&
                    (cell.row.type == "articles" ||
                        cell.row.type == "dossier") ? (
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
            flex: 1,
        },

        {
            field: "title",
            renderCell: (cell) => (
                <>
                    {child_types?.includes((cell.row as Collection).type) ? (
                        <>&mdash;&nbsp;&nbsp;</>
                    ) : (
                        <></>
                    )}
                    <InertiaLink
                        href={route("admin.collections.edit", {
                            id: cell.row.id,
                        }).toString()}
                    >
                        {<PublishStatusIcon item={cell.row as Collection} />}{" "}
                        {findTitle(cell.row as Collection) ?? "- no title -"}
                    </InertiaLink>
                </>
            ),
            flex: 2,
        },
        LangColumn,
        makeDateColumn("created_at"),
        makeDateColumn("updated_at"),
        {
            field: "items_count",
            headerName: "Items",
            renderCell: (cell) => (
                <LinkQuery
                    toRoute="admin.items.index"
                    query={{ filter: { ["collection.id"]: cell.row.id } }}
                >
                    {cell.value}
                </LinkQuery>
            ),
            align: "right",
        },
        { field: "type" },
        { field: "layout" },
    ];

    const filterOptions = [
        {
            label: "Missing translations",
            name: "missing_translations",
        },
        {
            label: "Empty collections",
            name: "items_count",
            value: "0",
        },
        {
            label: "Hide unpublished",
            name: "status",
            value: "published",
        },
        {
            label: "Trashed collections",
            name: "trashed",
            value: "only",
        },
    ];
    if (filter?.filter?.type?.includes("dossier")) {
        (filterOptions as any).push({
            label: "Show subdossiers",
            name: "type",
            value: "dossier,dossier_sub",
            disabledValue: "dossier",
        });
    }

    //Add By cyblance For sharing start
    const [collection_array, setMyArray] = useState([]) as any;
    const [shareids, setshareids] = React.useState("");
    const [sellangs, setSellangs] = React.useState("");
    const handleModelClickOpen = (id: any, lang: any) => {
        const langarray = lang.split(",");
        setSellangs(langarray);
        setshareids(id);
        setMyArray({
            ...collection_array,
            ["type"]: "collection",
            ["id"]: id,
        });
    };
    //Add By cyblance For sharing end

    const handleTrash: ListingMultiSelectActionHandler<Collection> = (ids) => {
        Inertia.post(route("admin.collections.multiple.trash"), {
            ids,
        });
    };
    const handleRestore: ListingMultiSelectActionHandler<Collection> = (
        ids
    ) => {
        Inertia.post(route("admin.collections.multiple.restore"), {
            ids,
        });
    };
    const handleDestroy: ListingMultiSelectActionHandler<Collection> = (
        ids
    ) => {
        Inertia.delete(route("admin.collections.multiple.destroy"), {
            data: { ids },
        });
    };

    useEffect(() => {
        filter?.filter?.trashed === "only"
            ? sethideColumn(true)
            : sethideColumn(false);
    }, [filter]);

    return (
        <>
            <AppBarHeader
                title="Collections"
                filterOptions={filterOptions}
                filter={filter}
                onSearch={setSearch}
                onChangeFilter={setFilter}
            >
                <IconButton
                    onClick={onCreate}
                    disabled={
                        !can?.collections?.create &&
                        !can?.collections?.createLimited
                    }
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
                                      ...(can?.collections?.restoreMany
                                          ? [
                                                {
                                                    identifier: "restore",
                                                    label: "Restore",
                                                    onAction: handleRestore,
                                                },
                                            ]
                                          : []),
                                      ...(can?.collections?.forceDeleteMany
                                          ? [
                                                {
                                                    identifier: "destroy",
                                                    label: "Delete permanently",
                                                    onAction: handleDestroy,
                                                },
                                            ]
                                          : []),
                                  ]
                                : can?.collections?.deleteMany
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
            {shareids ? (
                <ShareRecord
                    RecordLang={sellangs}
                    Id={shareids}
                    setArray={collection_array}
                    AvailableLang={AvailableLanguages}
                />
            ) : (
                <></>
            )}
        </>
    );
};

export default List;
