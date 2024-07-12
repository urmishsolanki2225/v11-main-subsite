import React from "react";

import { RenderElementProps } from "slate-react";

const OEmbedRender: React.FC<RenderElementProps> = ({
    attributes,
    element,
    children,
}) => {
    if (element.type !== "oembed") {
        return <></>;
    }
    const { url } = element;

    return (
        <section {...attributes} className="selected">
            <p>url: {url}</p>
            {children}
        </section>
    );
};

export default OEmbedRender;
