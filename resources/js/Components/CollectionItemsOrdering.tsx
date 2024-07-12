import React, { useEffect, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import differenceBy from "lodash/differenceBy";
import isEqual from "lodash/isEqual";
import route from "ziggy-js";

import { ICollectionPageProps, Item, Page } from "../Models";
import usePostData from "../Utils/usePostData";

import { ItemBrowser } from "./Browser";
import Sorter from "./Sorter";
import ItemSorterRenderer from "./Sorter/ItemSorterRenderer";

const CollectionItemsOrdering: React.FC = () => {
    const { collection, items } = usePage<Page<ICollectionPageProps>>().props;

    const [sortedItems, setSortedItems] = useState<Item[]>();
    const { post, result, errorMessage } = usePostData<{ success: boolean }>();

    const onSaveItemsOrdering = () => {
        if (!sortedItems || !items) {
            return;
        }
        const data = new FormData();
        data.set("item_ids", sortedItems.map(({ id }) => id).join(","));
        data.set(
            "unordered_item_ids",
            differenceBy(items!, sortedItems!, "id")
                .map(({ id }) => id)
                .join(",")
        );
        post(
            route("admin.collection.items.ordering", { id: collection.id }),
            data
        );
    };

    const onPickItem = (item: Item) => {
        setSortedItems((items) => {
            if (items) {
                if (items.find(({ id }) => id === item.id)) {
                    return items;
                } else {
                    return [...items, item];
                }
            } else {
                return [item];
            }
        });
    };

    useEffect(() => {
        if (result?.success) {
            setSortedItems(undefined);
        }
    }, [result]);

    useEffect(() => {
        setSortedItems(items);
    }, [items]);

    useEffect(() => {
        if (!items || !sortedItems || items.length === sortedItems.length) {
            return;
        }
    }, [items, sortedItems]);

    return (
        <Grid item xs={12} container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h6">Ordering</Typography>
            </Grid>
            {collection.ordering !== "manual" &&
            collection.ordering !== "partial_date" ? (
                <Grid item xs={12}>
                    The collection ordering was changed to manual, first save
                    the collection to reorder the items
                </Grid>
            ) : !sortedItems ? (
                <Grid item xs={12}>
                    <Button
                        onClick={() =>
                            Inertia.reload({
                                only: ["items"],
                            })
                        }
                    >
                        Load items
                    </Button>
                </Grid>
            ) : (
                <>
                    {collection.ordering === "partial_date" && (
                        <Grid item xs={12}>
                            <ItemBrowser
                                browserProps={{
                                    label: "Add pinned item",
                                    buttonProps: { variant: "outlined" },
                                }}
                                onPick={onPickItem}
                                filter={{
                                    filter: {
                                        ["collection.id"]: collection.id,
                                    },
                                }}
                            />{" "}
                            <Typography variant="caption">
                                Only the &quot;pinned&quot; items can be
                                ordered. They will appear on top, the remainder
                                will be ordered by date.
                            </Typography>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Sorter
                            items={sortedItems}
                            Renderer={ItemSorterRenderer}
                            onChange={setSortedItems}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            disabled={isEqual(sortedItems, items)}
                            onClick={() => onSaveItemsOrdering()}
                        >
                            Save ordering
                        </Button>
                        <Typography variant="body1" color="error">
                            {errorMessage}
                        </Typography>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default CollectionItemsOrdering;
