import { CustomText } from "../../custom-types";
import { DataAttributes } from "../types";

export const typeLink = "link";

export type LinkAttributes = DataAttributes & {
    url?: string;
    linkType?:
        | "internal-item"
        | "internal-collection"
        | "resource"
        | "external";
};

export type LinkElementType = LinkAttributes & {
    type: "link";
    children: CustomText[];
};
