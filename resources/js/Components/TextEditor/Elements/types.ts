import { Htmlparser2TreeAdapterMap } from "parse5-htmlparser2-tree-adapter";
import { Editor, Element as SlateElement } from "slate";
import { RenderElementProps } from "slate-react";

type Element = Htmlparser2TreeAdapterMap["element"];

export type IElement = Pick<SlateElement, "type"> & {
    serialize: SerializeFunction;
    deserialize: DeserializeFunction;
    canDeserialize: CanDeserializeFunction;
    Render: React.FC<RenderElementProps>;
    withEditor: WithEditorFunction;
    ToolbarButton: React.FC;
};

export type SerializeFunction = (el: SlateElement, children: string) => string;
export type DeserializeFunction = (el: Element) => any;
export type CanDeserializeFunction = (el: Element) => boolean;
export type WithEditorFunction = (editor: Editor) => Editor;

export type FloatAttributeType = "left" | "right" | "full";
export type DataIdAttributeType = string;
export type DataTypeAttributeType =
    | "image"
    | "quote"
    | "video"
    | "link"
    | "link-internal"
    | "map";

export type FloatAttribute = {
    float?: FloatAttributeType;
};

export type DataAttributes = {
    dataId?: DataIdAttributeType;
    dataType?: DataTypeAttributeType;
};

export interface Attributes {
    [key: string]: string | undefined;
}
