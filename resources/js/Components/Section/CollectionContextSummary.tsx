import React, { useState } from "react";

import { Inertia } from "@inertiajs/inertia";

import { COLLECTION_ORDERINGS } from "../../Config";
import { useAppContext } from "../../Layout";
import { Collection } from "../../Models";
import ButtonConfirmDialog from "../General/ButtonConfirmDialog";
import { get as inertiaGet } from "../General/LinkQuery";

import SectionSummary from "./SectionSummary";

import { SectionSummaryContent } from ".";

interface IProps {
    collection: Collection;
}
export const CollectionContextSummary: React.FC<IProps> = ({ collection }) => {
    const { needSave } = useAppContext();
    const [initialOrdering] = useState(collection.ordering);

    const contents: SectionSummaryContent[] = [
        {
            title: "Items",
            text: (
                <>
                    This collection contains{" "}
                    <strong>{collection.items_count || 0}</strong> items
                </>
            ),
            component: collection.items_count ? (
                <ButtonConfirmDialog
                    label="Show items"
                    needConfirmation={needSave}
                    onConfirm={() => {
                        inertiaGet("admin.items.index", {
                            filter: {
                                ["collection.id"]: collection.id,
                            },
                        });
                    }}
                    color="primary"
                    variant="text"
                />
            ) : undefined,
        },
        {
            title: "Ordering",
            text: (
                <>
                    Item ordering:{" "}
                    {(COLLECTION_ORDERINGS as any)[collection.ordering]}
                </>
            ),
            component:
                initialOrdering === "manual" && collection.items_count ? (
                    <ButtonConfirmDialog
                        label="Load items for ordering"
                        needConfirmation={needSave}
                        onConfirm={() => {
                            Inertia.reload({ only: ["items"] });
                        }}
                        color="primary"
                        variant="text"
                    />
                ) : undefined,
        },
        {
            title: "Context",
            text: (
                <>
                    <strong>
                        {collection.parent_collections?.length || "no"}{" "}
                    </strong>
                    {collection.parent_collections?.length === 1
                        ? "parent"
                        : "parents"}{" "}
                    and{" "}
                    <strong>
                        {collection.sub_collections?.length || "no"}{" "}
                    </strong>
                    {collection.sub_collections?.length === 1
                        ? "sub collection"
                        : "sub collections"}
                </>
            ),
        },
    ];

    return <SectionSummary contents={contents} />;
};

export default CollectionContextSummary;
