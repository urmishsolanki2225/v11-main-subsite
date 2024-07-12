import { CustomText } from "../../custom-types";

export const typeOEmbed = "oembed";

export type OEmbedAttributes = {
    url?: string;
};

export type OEmbedElementType = OEmbedAttributes & {
    type: "oembed";
    children: CustomText[];
};
