import { IElement } from "../types";

import deserializeOEmbed, { canDeserializeOEmbed } from "./deserialize";
import OEmbedRender from "./Render";
import serializeOEmbed from "./serialize";
import OEmbedToolbarButton from "./ToolbarButton";
import withOEmbed from "./withEditor";

export const OEmbedElement: IElement = {
    type: "oembed",
    serialize: serializeOEmbed,
    deserialize: deserializeOEmbed,
    canDeserialize: canDeserializeOEmbed,
    Render: OEmbedRender,
    ToolbarButton: OEmbedToolbarButton,
    withEditor: withOEmbed,
};

export default OEmbedElement;
