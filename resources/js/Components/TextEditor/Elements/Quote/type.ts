import { CaptionElementType, ParagraphElementType } from "../../custom-types";
import { FloatAttribute } from "../types";

export const typeQuote = "quote";

export type QuoteAttributes = FloatAttribute;

export type BlockQuoteElementType = {
    type: "blockquote";
    children: ParagraphElementType[];
};

export type QuoteElementType = QuoteAttributes & {
    type: "quote";
    showSocialShare?: boolean;
    children:
        | [BlockQuoteElementType]
        | [BlockQuoteElementType, CaptionElementType];
};
