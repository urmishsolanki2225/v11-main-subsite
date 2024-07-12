import Content from "./Content";
import Item from "./Item";

export type AttachmentGroupContent = Content
export interface Attachment {
    id: number;
    item: Item;
    order: number;
}

export interface AttachmentGroup {
    id: number;
    order: number;

    contents: AttachmentGroupContent[];
    attachments: Attachment[];
}
