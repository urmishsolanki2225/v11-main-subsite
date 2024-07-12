import { IElement } from "../types";

import deserializeItem, { canDeserializeItem } from "./deserialize";
import ItemRender from "./Render";
import serializeItem from "./serialize";
import ItemToolbarButton from "./ToolbarButton";
import withItem from "./withEditor";

export const ItemElement: IElement = {
    type: "item",
    serialize: serializeItem,
    deserialize: deserializeItem,
    canDeserialize: canDeserializeItem,
    Render: ItemRender,
    ToolbarButton: ItemToolbarButton,
    withEditor: withItem,
};

export default ItemElement;
