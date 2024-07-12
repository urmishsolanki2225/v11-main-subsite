import React from "react";

import { RenderElementProps } from "slate-react";

const LinkRender: React.FC<RenderElementProps> = ({
    attributes,
    element,
    children,
}) => {
    if (element.type !== "link") {
        return <></>;
    }
    const { url, linkType } = element;

    return (
        <a
            href={url}
            onClick={() => {
                console.log("ToDo preview");
            }}
            className={linkType}
            {...attributes}
        >
            {children}
        </a>
    );
};

export default LinkRender;
