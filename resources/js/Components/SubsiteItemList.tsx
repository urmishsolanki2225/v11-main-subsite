import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { Inertia } from "@inertiajs/inertia";
import Dialog from "@mui/material/Dialog";
import route from "ziggy-js";
import AppBarHeader from "../Layout/AppBarHeader";
import useDataSource from "./useDataSource";
import { GridColDef } from "@mui/x-data-grid";
import { Item, findTitle } from "../Models";
import Listing, {ListingMultiSelectActionHandler} from "./Listing";
import { LangColumn, makeDateColumn } from "../Utils/DataGridUtils";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import { InertiaLink } from "@inertiajs/inertia-react";
import { AuthPageProps,IListingPageProps } from "../Models/Inertia";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';

interface IProps extends IListingPageProps,AuthPageProps{
    region_id?: any;
    can?: any;
    parentCallback?:any;
}

const SubsiteItemList: React.FC<IProps> = ({
    region_id,
    can,
    filter: _filter,
    parentCallback,
}) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState<string>();
    const [filter, setFilter] = useState(_filter);
    let setTypes: any = filter?.filter?.type;
    const [copyloader, copyToMain] = React.useState(false);

    const handleToggle = (id: string) => {
        Inertia.post(route("admin.items.removedpublication"), { id }, {
            preserveState: true,
            onSuccess: () => {
                dataSource.reload();
            }
        });
    };

    const handleTrash: ListingMultiSelectActionHandler<Item> = (ids) => {
        Inertia.post(route("admin.items.multiple.trash"), { ids }, {
            preserveState: true,
            onSuccess: () => {
                onClose();
            }
        });
    };
    const handleRestore: ListingMultiSelectActionHandler<Item> = (ids) => {
        Inertia.post(route("admin.items.multiple.restore"), { ids },{
            preserveState: true,
            onSuccess: () => {
                onClose();
            }
        });
    };
    const handleDestroy: ListingMultiSelectActionHandler<Item> = (ids) => {
        Inertia.delete(route("admin.items.multiple.destroy"), {
            data: { ids },
        });
    };

    const onClose = () =>{
        let childMessage = "success";
        setOpen(false);
        // region_id = undefined ;
        parentCallback(childMessage);
        setFilter(undefined);

    }

    useEffect(() => {
        if (region_id !== undefined && open == false) {
            setOpen(true);
        }
    }, [region_id, setOpen]);

    useEffect(() => {
        setFilter((_filter) => ({
            filter: {
                "collection.id": region_id,
            },
        }));
    }, [_filter,region_id]);

    const dataSource = useDataSource<Item>({
        mode: "xhr",
        filter: filter ,
        xhrUrl: route("admin.getallitemsmodel"),
        search,
    });

    const ItemBrowserColumns: GridColDef[] = [
        {
            field: "id",
            headerName: "Id",
            renderCell: (cell) => (
                <Box display="flex" justifyContent="space-between">
                    {cell.id}
                </Box>
            ),
        },
        {
            field: "title",
            headerName: "Title",
            renderCell: (cell) => (
                <>
                    {cell.row.is_site == 3 ?
                        <Tooltip title="Already Copied">
                            <BeenhereIcon
                                sx={{
                                    fontSize: theme.typography.fontSize,
                                }}
                            />
                        </Tooltip>
                        :
                        <></>
                    }
                    <InertiaLink
                        href={route("admin.items.edit", {
                            id: cell.row.id,
                        }).toString()}
                    >
                        {findTitle(cell.row as Item) ||
                            (cell.row as Item).contents[0]?.title ||
                            "- no title -"}
                    </InertiaLink>
                </>
            ),
            flex: 2,
        },
        LangColumn,
        makeDateColumn("created_at","Created at"),
        makeDateColumn("updated_at","Updated at"),
        { field: "type", headerName: "Type" },
        { field: "subtype", headerName: "Subtype" },
        {
            field: "Change Status",
            sortable: false,
            renderCell: (cell) => (
                <div>
                    <Switch
                        checked={cell.row.is_site == "3"}
                        onChange=
                        {
                            (evt) => {
                                evt.preventDefault();
                                handleToggle(cell.row.id)
                            }
                        }
                    />
                </div>
            ),
            flex: 1,
        },
    ];


    useEffect(() => {
        if (!open) {
          window.scrollTo(0, 0); // reset page view
        }
      }, [open]);

    const copytosite: ListingMultiSelectActionHandler<Item> = (ids) => {
        copyToMain(true);
        Inertia.post(route("admin.items.addmainsite", {}), { ids, setTypes }, {
            preserveState: true,
            onSuccess: (info) => {
                onClose();
                copyToMain(false);
            },
            onError: (e) => {
                copyToMain(false);
            }
        });
    };

    return (
        <>
        {open && (
            <Dialog
                key={region_id}
                open={true}
                onClose={onClose}
                maxWidth={false}
            >
                <AppBarHeader
                    title={"Subsite Items"}
                    isDialog
                    filterOptions={[
                        {
                            label: "Publication",
                            name: "publication.id",
                            value: '19',
                        },
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
                        {
                            label: "Only Subsite Items",
                            name: "is_site",
                            value: '2',
                        },
                    ]}
                    filter={filter}
                    onSearch={setSearch}
                    onChangeFilter={setFilter}
                >
                    <IconButton
                            edge="end"
                            color="inherit"
                            onClick={onClose}
                            aria-label="close"
                            size="large"
                        >
                        <CloseIcon />
                    </IconButton>
                </AppBarHeader>
                <Box
                    sx={{
                        paddingTop: 0,
                        height: "100%",
                        minHeight:"80vh" ,
                        maxHeight: "unset",
                        minWidth: "90vw" ,
                        maxWidth: "unset" ,
                        boxSizing: "border-box",
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Listing
                        columns={ItemBrowserColumns}
                        dataSource={dataSource}
                        multiSelectActions={{
                            actions:
                                filter?.filter?.trashed === "only"
                                    ?
                                    [
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
                                    ]:
                                    can?.items?.deleteMany
                                        ? [
                                            {
                                                identifier: "trash",
                                                label: "Move to Trash",
                                                onAction: handleTrash,
                                            },
                                        ]
                                        : [],
                            mainsite:
                                filter?.filter?.trashed != "only"
                                    ? [
                                        {
                                            identifier: "Add",
                                            label: "Copy to MainSite",
                                            onAction: copytosite,
                                            loader: copyloader
                                        },
                                    ]
                                    : [],
                        }}
                    />
                </Box>
            </Dialog>
        )}
        </>
    );
};
export default SubsiteItemList;