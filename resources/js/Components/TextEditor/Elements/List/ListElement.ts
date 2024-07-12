import { IElement } from "../types";

import deserializeList, { canDeserializeList } from "./deserialize";
import ListRender from "./Render";
import serializeList from "./serialize";
import {
    OrderedListToolbarButton,
    UnorderedListToolbarButton,
} from "./ToolbarButton";
import withList from "./withEditor";

export const OrderedListElement: IElement = {
    type: "ordered-list",
    serialize: serializeList,
    deserialize: deserializeList,
    canDeserialize: canDeserializeList,
    Render: ListRender,
    ToolbarButton: OrderedListToolbarButton,
    withEditor: withList,
};

export const UnorderedListElement: IElement = {
    type: "unordered-list",
    serialize: serializeList,
    deserialize: deserializeList,
    canDeserialize: canDeserializeList,
    Render: ListRender,
    ToolbarButton: UnorderedListToolbarButton,
    withEditor: withList,
};
