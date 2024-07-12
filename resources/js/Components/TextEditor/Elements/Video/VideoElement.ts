import { IElement } from "../types";

import deserializeVideo, { canDeserializeVideo } from "./deserialize";
import VideoRender from "./Render";
import serializeVideo from "./serialize";
import VideoToolbarButton from "./ToolbarButton";
import withVideo from "./withEditor";

export const VideoElement: IElement = {
    type: "video",
    serialize: serializeVideo,
    deserialize: deserializeVideo,
    canDeserialize: canDeserializeVideo,
    Render: VideoRender,
    ToolbarButton: VideoToolbarButton,
    withEditor: withVideo,
};

export default VideoElement;
