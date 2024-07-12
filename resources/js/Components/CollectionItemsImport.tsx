import React, { useEffect, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import route from "ziggy-js";

import { AppBarHeader } from "../Layout";
import { Collection, findTitle, ICollectionPageProps, Page } from "../Models";

import useDataSource from "./useDataSource";

const CollectionItemsImport: React.FC = () => {
    const { collection } = usePage<Page<ICollectionPageProps>>().props;
    const [open, setOpen] = useState(false);
    const [importItemCount, setImportItemCount] = useState(0);
    const [inputValue, setInputValue] = useState<string>();
    const [options, setOptions] = useState<Collection[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);

    const { paginatedData } = useDataSource<Collection>({
        mode: "xhr",
        // filter,
        search: inputValue,
        sort: "title",
        pageSize: 42,
        xhrUrl: route("admin.collections.index"),
    });

    useEffect(() => {
        setOptions(paginatedData?.data || []);
    }, [paginatedData]);

    useEffect(() => {
        if (!collections.length) {
            setImportItemCount(0);
            return;
        }
        // load items count
        axios
            .get<{ count: number; withoutExisting?: number }>(
                route("admin.collections.items.count", {
                    ids: collections.map(({ id }) => `${id}`).join(","),
                }),
                { params: { existing_collection_id: collection.id } }
            )
            .then(({ data }) => {
                if (data.withoutExisting !== undefined) {
                    setImportItemCount(data.withoutExisting);
                } else {
                    setImportItemCount(data.count);
                }
            });
    }, [collections, collection.id]);

    const onImport = () => {
        Inertia.post(
            route("admin.collection.items.import", { id: collection.id }),
            {
                collection_id: collections.map(({ id }) => id),
            } as any
        );
    };

    return (
        <>
            <Button
                color="primary"
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                Import items
            </Button>
            {open && (
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <AppBarHeader
                        title="Import items from other collections"
                        // onSearch={onSearch}
                        isDialog
                    >
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => setOpen(false)}
                            aria-label="close"
                            size="large"
                        >
                            <CloseIcon />
                        </IconButton>
                    </AppBarHeader>
                    <DialogContent>
                        <Typography variant="body1">
                            Search for 1 or more collections. The items that are
                            in <strong>all of those</strong> collections can be
                            imported into the current collection.
                        </Typography>
                        <Autocomplete<Collection, true>
                            multiple
                            value={collections}
                            options={options}
                            filterOptions={(x) => x}
                            onChange={(_evt, val) => setCollections(val)}
                            getOptionLabel={(collection) =>
                                `${findTitle(collection) || "-untitled-"} (${
                                    collection.items_count || 0
                                })`
                            }
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Collections"
                                    placeholder="Search for 1 or more collections"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            )}
                            renderOption={(props, collection) => (
                                <li {...props} key={collection.id}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            width: "100%",
                                            whiteSpace: "pre",
                                            alignItems: "baseline",
                                            borderRadius: 1,
                                            borderStyle: "solid",
                                            borderWidth: 0,
                                            borderColor: "divider",
                                            paddingLeft: 0,
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            component="span"
                                            sx={{ flexGrow: 0 }}
                                        >
                                            {findTitle(collection) ||
                                                "-untitled-"}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            component="span"
                                            sx={{
                                                flexShrink: 0,
                                                marginLeft: 0.5,
                                            }}
                                        >
                                            {collection.type}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            component="span"
                                            sx={{
                                                flexGrow: 1,
                                                textAlign: "end",
                                                flexShrink: 0,
                                                alignSelf: "flex-end",
                                            }}
                                        >
                                            #{collection.items_count}
                                        </Typography>
                                    </Box>
                                </li>
                            )}
                            isOptionEqualToValue={(
                                { id: optId },
                                { id: valId }
                            ) => optId === valId}
                        />
                        <Typography variant="body1">
                            There are <strong>{importItemCount}</strong> items
                            in the intersection of the selected collections,
                            which are not yet in the collection.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        {importItemCount > 0 && (
                            <Typography variant="caption" color="orange">
                                Note that importing is irreversible.
                            </Typography>
                        )}
                        <Button
                            disabled={!importItemCount}
                            color="primary"
                            onClick={() => onImport()}
                            variant="contained"
                            sx={{ marginLeft: 2 }}
                        >
                            Import {importItemCount} items
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default CollectionItemsImport;
