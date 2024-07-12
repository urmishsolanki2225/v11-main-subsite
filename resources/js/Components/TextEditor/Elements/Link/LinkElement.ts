import { IElement } from "../types";

import deserializeLink, { canDeserializeLink } from "./deserialize";
import LinkRender from "./Render";
import serializeLink from "./serialize";
import LinkToolbarButton from "./ToolbarButton";
import withLink from "./withEditor";

export const LinkElement: IElement = {
    type: "link",
    serialize: serializeLink,
    deserialize: deserializeLink,
    canDeserialize: canDeserializeLink,
    Render: LinkRender,
    ToolbarButton: LinkToolbarButton,
    withEditor: withLink,
};

export default LinkElement;
