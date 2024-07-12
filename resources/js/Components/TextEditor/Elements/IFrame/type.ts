import { ContentLayoutStyles } from "../../../../Config";
import { CustomText } from "../../custom-types";

export type IFrameAttributes = {
    url?: string;
    height?: number;
    layout?: ContentLayoutStyles;
};

export type IFrameElementType = IFrameAttributes & {
    type: "iframe";
    children: CustomText[];
};
