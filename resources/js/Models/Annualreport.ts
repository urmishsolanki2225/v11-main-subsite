import Content from "./Content";
import Item from "./Item";

import { AnnualreportType } from "@/Config";

// import { ImageResource } from "./Resource";

export interface AnnualreportContent extends Content {
    content?: string;
    content_json?: string;
    created_at: string;
    item_id: number;
    // images: ImageResource[];
    subtype: string;
}
export type StatusType = "published" | "unpublished" | "draft" | "archived";

export interface Annualreport<A extends AnnualreportType> {
    month: number;
    year: number;
    items: Item[];
    // highlight: any;
    // images: any;
    all_images: Item<"resource", "image">[];
    type: A;
    id: number;
    status: StatusType;
    created_at: string;
    updated_at: string;
    publish_at: string;
    deleted_at?: string;
    content?: AnnualreportContent;
    contents: AnnualreportContent[];
    support_color?: string;
    video_item?: Item<"resource", "video">;
}
export default Annualreport;

export const isAnnualreportHighlight = (
    a: Annualreport<"highlight" | "summary">
): a is Annualreport<"highlight"> => a.type === "highlight";
