import { ItemSubtype, ItemType, StatusType } from "../Config";

import { Affiliate } from "./Affiliate";
import Annualreport from "./Annualreport";
import { AttachmentGroup } from "./Attachment";
import Collection from "./Collection";
import { Contact } from "./Contact";
import Content from "./Content";
// import { DCProject } from "./DCProject";
import { DevCoopProject } from "./DevCoopProject";
import {
    FileResource,
    ImageResource,
    LinkResource,
    VideoResource,
    EmbedResource,
} from "./Resource";

export interface ItemContent extends Content {
    content?: string;
    content_json?: string;

    images: ImageResource[];
    videos: VideoResource[];
    embeds: EmbedResource[];
    links: LinkResource[];
    files: FileResource[];
    contacts: Contact[];
    dev_coop_project?: DevCoopProject;
}

export interface Item<T extends ItemType = any, S extends ItemSubtype = any> {
    id: number;
    type: T;
    subtype: S;

    status: StatusType;

    created_at: string;
    updated_at: string;
    publish_at: string;
    deleted_at?: string;

    content?: ItemContent;
    contents: ItemContent[];

    all_images: Item<"resource">[];
    collections?: Collection[];
    attachment_groups: AttachmentGroup[];
    image_for_items_count?: number;
    image_for_collections_count?: number;
    affiliate?: Affiliate;

    old_id: string;
    old_type: string;

    support_color?: string;
    activity_report_congress?: {
        year_from: number;
        year_to: number;
    };
}

export default Item;

export function isItemContent(content: Content): content is ItemContent {
    return (content as ItemContent).images !== undefined;
}
export function isItem(
    item: Item<any> | Collection | Annualreport<any>
): item is Item<any> {
    return (item as Item<any>).subtype !== undefined;
}

export type ItemAffiliate = Item<"affiliate">;

export type ItemResource = {
    id: Item["id"];
    permalink: string;
    publish_at: string;
    publish_at_str: string;
    title: string;
    blurb: string;
    fulltext: string;
    images: { lead: string }[];
    collections?: string[];
};
