import { IElement } from "../types";

import deserializeQuote, { canDeserializeQuote } from "./deserialize";
import QuoteRender from "./Render";
import serializeQuote from "./serialize";
import QuoteToolbarButton from "./ToolbarButton";
import { typeQuote } from "./type";
import withQuote from "./withEditor";

export const QuoteElement: IElement = {
    type: typeQuote,
    serialize: serializeQuote,
    deserialize: deserializeQuote,
    canDeserialize: canDeserializeQuote,
    Render: QuoteRender,
    ToolbarButton: QuoteToolbarButton,
    withEditor: withQuote,
};

export default QuoteElement;
