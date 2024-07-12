import { CaptionElementType } from "../../custom-types";
import { DataAttributes, FloatAttribute } from "../types";

export const typeImage = "image";

export type ImageAttributes = FloatAttribute &
    DataAttributes & {
        url?: string;
    };

export type ImageElementType = ImageAttributes & {
    type: "image";
    children: [CaptionElementType] | [];
};
