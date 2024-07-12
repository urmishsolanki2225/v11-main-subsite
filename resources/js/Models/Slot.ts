import Item from "./Item";

export interface SlotTitle {
    lang: string;
    title: string;
}

export interface Slot {
    id: number;
    order: number;
    template_id: number;
    title: SlotTitle;
    item?: Item;
    item_id?: number;
}

export default Slot;
