import React from "react";

import { RenderElementProps } from "slate-react";

const IFrameRender: React.FC<RenderElementProps> = ({
    attributes,
    element,
    children,
}) => {
    if (element.type !== "iframe") {
        return <></>;
    }
    const { url, layout } = element;

    return (
        <section {...attributes} className="selected">
            <p>
                url: {url}
                <br />
                layout: {layout}
            </p>
            {children}
        </section>
    );
};

export default IFrameRender;
