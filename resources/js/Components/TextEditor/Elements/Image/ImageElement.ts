import { IElement } from "../types";

import deserializeImage, { canDeserializeImage } from "./deserialize";
import ImageRender from "./Render";
import serializeImage from "./serialize";
import ImageToolbarButton from "./ToolbarButton";
import withImage from "./withEditor";

export const ImageElement: IElement = {
    type: "image",
    serialize: serializeImage,
    deserialize: deserializeImage,
    canDeserialize: canDeserializeImage,
    Render: ImageRender,
    ToolbarButton: ImageToolbarButton,
    withEditor: withImage,
};

export default ImageElement;
