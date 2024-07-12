import { DataAttributes, FloatAttribute } from "../types";

export const typeItem = "item";

export type ItemAttributes = FloatAttribute &
    DataAttributes & {
        title: string;
        imageUrl?: string;
        url: string;
    };

export type ItemElementType = ItemAttributes & {
    type: "item";
    children: [];
};
