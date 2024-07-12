import { CaptionElementType } from "../../custom-types";
import { DataAttributes, FloatAttribute } from "../types";

export const typeVideo = "video";

export type VideoAttributes = FloatAttribute &
    DataAttributes & {
        url?: string;
    };

export type VideoElementType = VideoAttributes & {
    type: "video";
    children: [] | [CaptionElementType];
};
