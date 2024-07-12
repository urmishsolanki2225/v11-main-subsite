import React from "react";

import { isImageResource } from "../../Models";
import { findTitle } from "../../Models/Content";
import Item from "../../Models/Item";

import SectionSummary, { SectionSummaryContent } from "./SectionSummary";

interface IProps {
    // collections: Collection[];
    item: Item;
}
export const ItemContextSummary: React.FC<IProps> = ({ item }) => {
    const collections = item.collections || [];
    // const slotted = false //item.type === "slot"
    //     ? { title: "Slotted", text: "This item is part of a slot group" }
    //     : undefined;
    const contents: SectionSummaryContent[] = []; //slotted ? [slotted] : [];

    if (item.type === "resource" && isImageResource(item)) {
        contents.push({
            title: "Image resource",
            text: (
                <>
                    Image for <strong>{item.image_for_items_count ?? 0}</strong>{" "}
                    items
                    <br />
                    and for{" "}
                    <strong>
                        {item.image_for_collections_count ?? 0}
                    </strong>{" "}
                    collections
                </>
            ),
        });
    }
    contents.push({
        title: "Level of contextualization",
        text: (
            <>
                This item is part of <strong>{collections.length}</strong>{" "}
                {collections.length === 1 ? "collection" : "collections"}.
            </>
        ),
    });
    contents.push({
        title: "Collection ordering",
        text: (
            <>
                {collections.length ? (
                    collections
                        .slice(0, 3)
                        .map((collection) => findTitle(collection))
                        .join(", ") + ", ..."
                ) : (
                    <>- no collections -</>
                )}
            </>
        ),
    });

    return <SectionSummary contents={contents} />;
};

export default ItemContextSummary;
