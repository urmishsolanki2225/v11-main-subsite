import { CaptionElementType } from "../../custom-types";
// import { DataAttributes } from "../types";

export const typeMap = "map";

export type MapAttributes = {
    mapId: number;
    showLegend: "top" | "bottom-left" | "bottom-right" | "none";
};

export type MapElementType = MapAttributes & {
    type: "map";
    children: [CaptionElementType] | [];
};
