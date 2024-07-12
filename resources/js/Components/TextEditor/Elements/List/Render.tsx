import React from "react";

import clsx from "clsx";
import { RenderElementProps, useSelected } from "slate-react";

const ListRender: React.FC<RenderElementProps> = ({
    attributes,
    element,
    children,
}) => {
    const selected = useSelected();
    if (element.type !== "ordered-list" && element.type !== "unordered-list") {
        return <></>;
    }
    const { variant } = element;
    const attrs = {
        ...attributes,
        "data-slate-type": `${element.type} ${variant ? variant : " normal"}`,
    };

    if (element.type === "ordered-list") {
        return (
            <ol
                {...attrs}
                className={clsx(element.type, element.variant, {
                    selected: selected,
                })}
            >
                {children}
            </ol>
        );
    } else {
        return (
            <ul
                {...attrs}
                className={clsx(element.type, element.variant, {
                    selected: selected,
                })}
            >
                {children}
            </ul>
        );
    }
};

export default ListRender;
