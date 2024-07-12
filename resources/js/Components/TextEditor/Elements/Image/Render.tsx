import React from "react";

import clsx from "clsx";
import { RenderElementProps, useSelected } from "slate-react";

const ImageRender: React.FC<RenderElementProps> = ({
    attributes,
    element,
    children,
}) => {
    const selected = useSelected();

    if (element.type !== "image") {
        // wont happen
        return <></>;
    }

    const { url, float } = element;
    const floatClass = float ? `float-${float}` : undefined;

    return (
        <figure
            {...attributes}
            className={clsx("image", floatClass, { selected })}
        >
            <img src={(url as string) ?? "https://picsum.photos/300/150"} />
            {children}
        </figure>
    );
};

export default ImageRender;
