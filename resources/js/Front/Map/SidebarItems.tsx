import React, { ReactNode, useEffect, useState } from "react";

import axios from "axios";

import { ItemResource } from "../../Models";

import { CountryData } from "./Map";

interface IProps {
    initialContent?: ReactNode;
    filter?: Record<string, string | number | undefined>;
    selectedCountry?: CountryData;
    onChangeItemCount?: (itemCount: number) => void;
    lang?: string;
}
export const SidebarItems: React.FC<IProps> = ({
    initialContent,
    filter,
    selectedCountry,
    onChangeItemCount,
    lang,
}) => {
    const [items, setItems] = useState<ItemResource[]>();

    useEffect(() => {
        if (!selectedCountry?.id) {
            setItems([]);
            return;
        }
        const f = { ...filter };
        if (f.collection) {
            f.collection =
                (Array.isArray(f.collection)
                    ? f.collection.join(",")
                    : f.collection) +
                "," +
                selectedCountry.id;
        } else {
            f.collection = selectedCountry.id;
        }
        const controller = new AbortController();
        axios
            .get("/api/content/search", {
                params: { filter: f, page: { size: 25 }, lang },
                signal: controller.signal,
            })
            .then((response) => {
                if (response.data) {
                    setItems(response.data.data);
                }
            })
            .catch((err) => {
                // ignore
                console.warn("load items", err);
            });
        return () => {
            controller.abort();
        };
    }, [filter, lang, selectedCountry?.id]);

    useEffect(() => {
        onChangeItemCount && onChangeItemCount(items?.length || 0);
    }, [items, onChangeItemCount]);

    return (
        <>
            {selectedCountry && items?.length ? (
                <>
                    <h3>{selectedCountry.name}</h3>
                    <ul>
                        {items?.map((item) => (
                            <li key={item.id}>
                                <img src={item.images.at(0)?.lead} />
                                <h4>{item.title || ""}</h4>
                                <span className="map_sidebar_item_date">
                                    {item.publish_at_str}
                                </span>
                                <a href={item.permalink}>{item.title}</a>
                                {Boolean(item.collections?.length) && (
                                    <span className="map_sidebar_item_collections">
                                        {item.collections!.join(", ")}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                initialContent
            )}
        </>
    );
};
