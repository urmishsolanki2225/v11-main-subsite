import React from "react";

import clsx from "clsx";
import { RenderElementProps, useSelected } from "slate-react";

const MapRender: React.FC<RenderElementProps> = ({
    attributes,
    element,
    children,
}) => {
    const selected = useSelected();

    if (element.type !== "map") {
        // wont happen
        return <></>;
    }

    const { mapId } = element;

    return (
        <figure {...attributes} className={clsx("map", { selected })}>
            <div contentEditable={false}>{mapId}</div>
            {children}
        </figure>
    );
};

export default MapRender;
