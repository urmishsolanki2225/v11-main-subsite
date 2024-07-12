import React, { useCallback, useEffect, useReducer, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Delta, formatters } from "jsondiffpatch";
import route from "ziggy-js";

import "jsondiffpatch/dist/formatters-styles/annotated.css";

import CollectionItemsImport from "../../Components/CollectionItemsImport";
import CollectionItemsOrdering from "../../Components/CollectionItemsOrdering";
import CollectionsManager from "../../Components/CollectionsManager";
import { CollectionGroups } from "../../Components/CollectionsManager.constants";
import ContentsEditor from "../../Components/ContentsEditor";
import ButtonConfirmDialog from "../../Components/General/ButtonConfirmDialog";
import { Confirm } from "../../Components/General/Confirm";
import ImagesManager from "../../Components/General/ImagesManager";
import { get as inertiaGet } from "../../Components/General/LinkQuery";
import MetaInfoManager from "../../Components/MetaInfoManager";
import Section, {
    CollectionContextSummary,
    SectionSummary,
} from "../../Components/Section";
import Sorter, { CollectionLinkSorterRenderer } from "../../Components/Sorter";
import { AppBarHeader, ContentScroll, useAppContext } from "../../Layout";
import {
    Collection,
    findTitle,
    CollectionContent,
    ICollectionPageProps,
    AuthPageProps,
} from "../../Models";
import collectionReducer from "../../Stores/collectionReducer";
import DispatchProvider from "../../Stores/DispatchProvider";
import jsondiff from "../../Utils/jsondiff";

const Edit: React.FC<ICollectionPageProps & AuthPageProps> = ({
    collection: _collection,
    can,
}) => {
    const [collection, dispatch] = useReducer(collectionReducer, _collection);
    const [diff, setDiff] = useState<Delta>();
    const { needSave, setNeedSave } = useAppContext();

    const onSave = () => {
        const _diff = { ...diff };
        if (_diff?.meta) {
            _diff.meta = collection.meta;
        }
        Inertia.patch(
            route("admin.collections.update", { collection }).toString(),
            _diff,
            { preserveState: false, replace: true }
        );
        setNeedSave(false);
    };

    const onReset = () => {
        // setCollection(_collection);
        dispatch({ type: "collection_reset", collection: _collection });
    };

    const onChangeContents = useCallback((contents: CollectionContent[]) => {
        dispatch({
            type: "patch",
            field: "contents",
            value: contents,
        });
    }, []);

    useEffect(() => {
        setNeedSave(!!diff);
    }, [setNeedSave, diff]);

    useEffect(() => {
        // setCollection(_collection);
        dispatch({ type: "collection_reset", collection: _collection });
    }, [_collection]);

    useEffect(() => {
        setDiff(jsondiff.diff(_collection, collection));
    }, [_collection, collection]);

    const inTrash = Boolean(collection.deleted_at);

    const onTrash = () => {
        Inertia.post(route("admin.collections.trash", { id: collection.id }));
    };
    const onRestore = () => {
        Inertia.post(route("admin.collections.restore", { id: collection.id }));
    };
    const onDestroy = () => {
        Inertia.delete(
            route("admin.collections.destroy", { id: collection.id })
        );
    };

    const onOrderSubcollections = useCallback((collections: Collection[]) => {
        dispatch({
            type: "patch",
            field: "sub_collections",
            value: collections,
        });
    }, []);

    return (
        <DispatchProvider dispatch={dispatch}>
            <AppBarHeader title="Edit Collection">
                <Button
                    variant="outlined"
                    onClick={onReset}
                    color="secondary"
                    disabled={!needSave}
                >
                    Reset
                </Button>
                <Button
                    variant={needSave ? "contained" : "outlined"}
                    onClick={onSave}
                    color="secondary"
                    disabled={!needSave}
                >
                    Save
                </Button>
            </AppBarHeader>
            <ContentScroll>
                <form autoComplete="off" autoCapitalize="off">
                    <Box padding={2}>
                        <Typography variant="h4">
                            {findTitle(collection)}
                        </Typography>
                    </Box>
                    <MetaInfoManager<Collection>
                        item={collection}
                        // onChange={onChange}
                    />
                    <Section
                        title="Contents"
                        open={true}
                        summary={
                            <SectionSummary
                                contents={[
                                    {
                                        title: "Languages",
                                        text:
                                            collection.contents
                                                ?.map(({ lang }) => lang)
                                                .join(", ") || "No content",
                                    },
                                ]}
                            />
                        }
                    >
                        <ContentsEditor<CollectionContent>
                            contents={collection.contents}
                            fields={["title", "subtitle", "blurb"]}
                            htmlFields={{ blurb: "limited" }}
                            onChange={onChangeContents}
                        />
                    </Section>

                    <ImagesManager
                        images={collection.all_images}
                        support_color={collection.support_color}
                    />

                    {collection.layout === "dossier_map" && (
                        <Section title="World map parameters">
                            <Typography variant="h6">
                                Item count cutoffs
                            </Typography>
                            <Typography variant="body1">
                                The <em>support color</em> (above) is used as
                                the base fill color. If no cutoffs are defined,
                                all countries that have at least one item have
                                that same color. Define one or more cutoffs to
                                give a proportianally lighter shade to countries
                                below the cutoff.
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    const cutoffs =
                                        (collection.meta
                                            ?.item_count_map_cutoffs as number[]) ||
                                        [];
                                    const lastCutoff = cutoffs.at(-1) || 2;
                                    dispatch({
                                        type: "patch_meta",
                                        meta_field: "item_count_map_cutoffs",
                                        value: [...cutoffs, lastCutoff + 1],
                                    });
                                }}
                            >
                                Add a cutoff
                            </Button>
                            <Box display="flex" gap={1}>
                                {(
                                    (collection.meta
                                        ?.item_count_map_cutoffs as number[]) ||
                                    []
                                ).map((cutoff, idx) => (
                                    <TextField
                                        key={idx}
                                        value={cutoff ? cutoff : ""}
                                        onChange={(evt) => {
                                            const val = parseInt(
                                                evt.target.value
                                            );
                                            const cutoffs = [
                                                ...collection.meta!
                                                    .item_count_map_cutoffs,
                                            ];
                                            cutoffs[idx] = val ? val : 0;
                                            dispatch({
                                                type: "patch_meta",
                                                meta_field:
                                                    "item_count_map_cutoffs",
                                                value: cutoffs,
                                            });
                                        }}
                                        fullWidth={false}
                                        sx={{ width: 90 }}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton
                                                    color="warning"
                                                    onClick={() => {
                                                        const cutoffs = [
                                                            ...collection.meta!
                                                                .item_count_map_cutoffs,
                                                        ];
                                                        cutoffs.splice(idx, 1);
                                                        dispatch({
                                                            type: "patch_meta",
                                                            meta_field:
                                                                "item_count_map_cutoffs",
                                                            value: cutoffs,
                                                        });
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                ))}
                            </Box>
                        </Section>
                    )}

                    <Section
                        title="Context"
                        summary={
                            <CollectionContextSummary collection={collection} />
                        }
                    >
                        <Typography variant="h6">Items</Typography>
                        <Typography variant="body1">
                            This collection contains{" "}
                            <strong>{collection.items_count || 0} items</strong>
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <ButtonConfirmDialog
                                    label="Create item"
                                    color="primary"
                                    needConfirmation={needSave}
                                    onConfirm={() => {
                                        inertiaGet("admin.items.create", {
                                            collection_id: collection.id,
                                        });
                                    }}
                                    variant="outlined"
                                />
                                <br />
                                <Typography variant="caption">
                                    in this collection
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <CollectionItemsImport /> <br />
                                <Typography variant="caption">
                                    from other collections
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                {collection.items_count ? (
                                    <ButtonConfirmDialog
                                        label="Show items"
                                        color="primary"
                                        needConfirmation={needSave}
                                        onConfirm={() => {
                                            inertiaGet("admin.items.index", {
                                                filter: {
                                                    ["collection.id"]:
                                                        collection.id,
                                                },
                                            });
                                        }}
                                        variant="outlined"
                                    />
                                ) : (
                                    <></>
                                )}
                            </Grid>
                            {(collection.ordering === "manual" ||
                                collection.ordering === "partial_date") &&
                            collection.items_count ? (
                                <CollectionItemsOrdering />
                            ) : (
                                <></>
                            )}
                        </Grid>

                        <Box marginY={2}>
                            <Divider variant="middle" />
                        </Box>

                        <Typography variant="h6">Parent collections</Typography>
                        <Typography variant="body1">
                            Choose a parent collection to place this collection
                            in a context tree.
                        </Typography>
                        <CollectionsManager
                            collections={collection.parent_collections ?? []}
                            groupings={CollectionGroups}
                            // noOrdering={false}
                            onChange={(collections) =>
                                // onChange("parent_collections", collections)
                                dispatch({
                                    type: "patch",
                                    field: "parent_collections",
                                    value: collections,
                                })
                            }
                        />

                        <Box marginY={2}>
                            <Divider variant="middle" />
                        </Box>

                        <Typography variant="h6">Sub collections</Typography>
                        <Typography variant="body1">
                            The sub collections of this collection.{" "}
                            {collection.ordering !== "manual" &&
                                `Ordered automatically by ${collection.ordering}.`}
                        </Typography>
                        {collection.ordering === "manual" &&
                        collection.sub_collections ? (
                            <Sorter
                                items={collection.sub_collections}
                                Renderer={CollectionLinkSorterRenderer}
                                onChange={onOrderSubcollections}
                                // className={classes.sorter}
                                variant="row"
                            />
                        ) : (
                            <Box
                                display="flex"
                                flexDirection="row"
                                flexWrap="wrap"
                            >
                                {collection.sub_collections?.map((coll, i) => (
                                    <CollectionLinkSorterRenderer
                                        key={i}
                                        item={coll}
                                        dragHandle={<></>}
                                        removeHandle={<></>}
                                    />
                                ))}
                            </Box>
                        )}
                        <ButtonConfirmDialog
                            label="Create sub collection"
                            color="primary"
                            needConfirmation={needSave}
                            onConfirm={() => {
                                inertiaGet("admin.collections.create", {
                                    parent_collection_id: collection.id,
                                });
                            }}
                            variant="outlined"
                        />
                    </Section>

                    <Section title="Actions">
                        <Box display="flex" gap={2}>
                            {inTrash ? (
                                <>
                                    {can?.collections?.restoreMany && (
                                        <Confirm onConfirm={onRestore}>
                                            <Button
                                                variant="contained"
                                                startIcon={
                                                    <RestoreFromTrashIcon />
                                                }
                                            >
                                                Restore from Trash
                                            </Button>
                                        </Confirm>
                                    )}
                                    {can?.collections?.forceDeleteMany && (
                                        <Confirm onConfirm={onDestroy}>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                startIcon={
                                                    <DeleteForeverIcon />
                                                }
                                            >
                                                Delete permanently
                                            </Button>
                                        </Confirm>
                                    )}
                                </>
                            ) : (
                                <>
                                    {can?.collections?.deleteMany && (
                                        <Confirm onConfirm={onTrash}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<DeleteIcon />}
                                            >
                                                Move to Trash
                                            </Button>
                                        </Confirm>
                                    )}
                                </>
                            )}
                        </Box>
                    </Section>

                    {import.meta.env.DEV && (
                        <div>
                            <div>
                                <pre>{JSON.stringify(diff, undefined, 4)}</pre>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: diff
                                        ? formatters.annotated.format(
                                              diff,
                                              _collection
                                          )
                                        : "<p>no diff</p>",
                                }}
                            ></div>
                            <div style={{ whiteSpace: "pre-wrap" }}>
                                {JSON.stringify(collection, undefined, 4)}
                            </div>
                        </div>
                    )}
                </form>
            </ContentScroll>
        </DispatchProvider>
    );
};

export default Edit;
