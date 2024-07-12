import React, { useMemo, useState } from "react";

import { usePage } from "@inertiajs/inertia-react";
import RemoveIcon from "@mui/icons-material/RemoveCircle";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";

import { AllowPageProps, Page } from "../Models";
import Collection from "../Models/Collection";

import { CollectionBrowser, CollectionPicker } from "./Browser";
import {
    ICollectionGroup,
    mapCollectionMenuTypes,
} from "./CollectionsManager.constants";
import Sorter from "./Sorter";
import CollectionSorterRenderer, {
    CollectionLinkSorterRenderer,
} from "./Sorter/CollectionSorterRenderer";

interface IProps {
    collections: Collection[];
    groupings?: ICollectionGroup[];
    noOrdering?: boolean;
    onChange: (collections: Collection[]) => void;
}
const CollectionsManager: React.FC<IProps> = ({
    collections,
    groupings = [],
    noOrdering = false,
    onChange,
}) => {
    const { allow } = usePage<Page<AllowPageProps>>().props;
    const [addFeedback, setAddFeedback] = useState<{
        severity: "error" | "warning" | "success";
        message: string;
    }>();

    const onRemove = (id: number) => {
        const newCollections = collections.filter((c) => c.id !== id);
        onChange(newCollections);
    };

    const onAdd = (collection: Collection) => {
        if (collections.find(({ id }) => id === collection.id)) {
            // already in collections
            setAddFeedback({
                severity: "warning",
                message: "This collection is already in the context",
            });
            return;
        }
        // check allowed collections
        if (allow?.membership?.collection_types) {
            if (
                allow.membership.collection_types.includes("*") ||
                allow.membership.collection_types.includes(collection.type)
            ) {
                // everything allowed or this type allowed
            } else {
                // ToDo check additional specific IDs
                if (allow.membership.collection_ids?.includes(collection.id)) {
                    // collection allowed by ID
                } else {
                    setAddFeedback({
                        severity: "error",
                        message: `You do not have permission to add a collection of type '${collection.type}' to the context`,
                    });
                    return;
                }
            }
        }
        setAddFeedback({
            severity: "success",
            message: "Collection added to context",
        });
        // check collection type, some are added to the start
        if (
            collection.type === "dossier" ||
            collection.type === "dossier_sub" ||
            collection.type === "workarea"
        ) {
            onChange([collection, ...collections]);
        } else {
            onChange([...collections, collection]);
        }
    };

    const menuTypeMapping = useMemo(() => {
        return mapCollectionMenuTypes(groupings);
    }, [groupings]);

    return (
        <>
            {addFeedback && (
                <Snackbar
                    open={true}
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    onClose={() => setAddFeedback(undefined)}
                    TransitionComponent={Slide}
                >
                    <Alert severity={addFeedback.severity} elevation={6}>
                        {addFeedback.message}
                    </Alert>
                </Snackbar>
            )}
            {groupings.map(({ label, menu }, i) => (
                <Grid container spacing={0} key={i} alignItems="baseline">
                    <Grid item xs={2}>
                        <Typography variant="subtitle2">{label}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <CollectionBrowser
                            label="Add"
                            options={menu}
                            onPick={onAdd}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <Box display="flex" flexWrap="wrap">
                            {collections
                                .filter(({ type }) =>
                                    menuTypeMapping[i].find(
                                        (val) => val === type
                                    )
                                )
                                .map((collection, j) => (
                                    <CollectionLinkSorterRenderer
                                        key={j}
                                        item={collection}
                                        removeHandle={
                                            <IconButton
                                                onClick={() =>
                                                    onRemove(collection.id)
                                                }
                                                size="small"
                                                color="secondary"
                                            >
                                                <RemoveIcon
                                                    sx={{ fontSize: "1rem" }}
                                                />
                                            </IconButton>
                                        }
                                    />
                                ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" />
                    </Grid>
                </Grid>
            ))}
            {!noOrdering && (
                <>
                    <Typography variant="h6">Ordering</Typography>
                    <Sorter
                        items={collections}
                        Renderer={CollectionSorterRenderer}
                        onChange={onChange}
                        // className={classes.sorter}
                        variant="row"
                    />
                </>
            )}
            <CollectionBrowser
                label="Add collection"
                options={CollectionPicker}
                onPick={(coll) => onAdd(coll)}
            />
        </>
    );
};

export default CollectionsManager;
