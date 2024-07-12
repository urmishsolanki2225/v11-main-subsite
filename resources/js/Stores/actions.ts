// Added by Cyblance for Annual-Reports section start
import { Collection, Item, Annualreport } from "../Models";
export interface AnnualreportResetAction {
    type: "annualreport_reset";
    annualreport: Annualreport<any>;
}
// Added by Cyblance for Annual-Reports section start

export interface ItemResetAction {
    type: "item_reset";
    item: Item;
}
export interface CollectionResetAction {
    type: "collection_reset";
    collection: Collection;
}
export interface PatchAction {
    type: "patch";
    field: string;
    value: any;
}
export interface PatchMetaAction {
    type: "patch_meta";
    meta_field: string;
    value: any;
}
export interface AddAttachmentGroupAction {
    type: "attachmentgroup_add";
}
export interface RemoveAttachmentGroupAction {
    type: "attachmentgroup_remove";
    index: number;
}
export interface UpdateAttachmentGroupAction {
    type: "attachmentgroup_update";
    index: number;
    field: string;
    value: any;
}
export interface AddAttachmentAction {
    type: "attachment_add";
    groupIndex?: number;
    attachedItem: Item;
}

export type ItemAction =
    | PatchAction
    | AddAttachmentGroupAction
    | RemoveAttachmentGroupAction
    | UpdateAttachmentGroupAction
    | AddAttachmentAction
    | ItemResetAction;

export type CollectionAction =
    | CollectionResetAction
    | PatchAction
    | PatchMetaAction;

// export type Action = ItemAction | CollectionAction;

export type AnnualreportAction = AnnualreportResetAction | PatchAction;
