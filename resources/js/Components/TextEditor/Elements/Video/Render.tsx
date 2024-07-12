import React from "react";

import clsx from "clsx";
import { RenderElementProps, useSelected } from "slate-react";

const VideoRender: React.FC<RenderElementProps> = ({
    attributes,
    element,
    children,
}) => {
    const selected = useSelected();
    if (element.type !== "video") {
        return <></>;
    }
    const { url } = element;

    return (
        <figure
            {...attributes}
            className={clsx("video", { selected: selected })}
            // contentEditable={false}
        >
            <iframe src={url as string} />
            {children}
        </figure>
    );
};

export default VideoRender;
