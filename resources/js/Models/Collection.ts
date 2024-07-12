import { StatusType } from "../Config";

import Content from "./Content";
import Item from "./Item";

export type CollectionContent = Content;
export type CollectionMeta = Record<string, any>;

export interface Collection {
    id: number;
    status: StatusType;
    type: string;
    layout: string;
    ordering: string;
    created_at: string;
    updated_at: string;
    publish_at: string;

    content?: CollectionContent;
    deleted_at: string;

    contents: CollectionContent[];
    all_images: Item[];
    slots_template_id: number;

    items_count?: number;
    parent_collections?: Collection[];
    sub_collections?: Collection[];

    slot_items?: {
        item_id?: number;
        slot_id: number;
    }[];

    old_id: string;
    old_type: string;

    support_color?: string;
    meta?: CollectionMeta;
}

export default Collection;

export function isCollection(obj: any): obj is Collection {
    return typeof obj === "object" && obj.ordering !== undefined;
}
