import { IElement } from "../types";

import IFrameRender from "./Render";
import IFrameToolbarButton from "./ToolbarButton";
import withIFrame from "./withEditor";

export const IFrameElement: IElement = {
    type: "iframe",
    serialize: () => "",
    deserialize: () => undefined,
    canDeserialize: () => false,
    Render: IFrameRender,
    ToolbarButton: IFrameToolbarButton,
    withEditor: withIFrame,
};

export default IFrameElement;
