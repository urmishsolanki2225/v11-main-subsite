import React from "react";

import Box from "@mui/material/Box";
import clsx from "clsx";
import { RenderElementProps, useSelected, useSlate } from "slate-react";

import { typeFootnote, typeFootnoteAnchor } from "./type";

export const FootnoteRender: React.FC<RenderElementProps> = ({
    attributes,
    element,
    children,
}) => {
    const selected = useSelected();
    const editor = useSlate();

    if (element.type !== typeFootnote) {
        return <></>;
    }
    const { uuid } = element;
    const order = editor.footnoteOrder(uuid);

    return (
        <div
            {...attributes}
            className={clsx({ selected })}
            data-footnote-order={`[${order > 0 ? order : "_"}]`}
        >
            <Box contentEditable={false} sx={{ float: "left", pr: 1 }}>
                [{order > 0 ? order : "_"}]
            </Box>
            {children}
        </div>
    );
};

export default FootnoteRender;

export const FootnoteAnchorRender: React.FC<RenderElementProps> = ({
    attributes,
    element,
    children,
}) => {
    const selected = useSelected();
    const editor = useSlate();

    if (element.type !== typeFootnoteAnchor) {
        return <></>;
    }
    const { ref } = element;
    const order = editor.footnoteOrder(ref);

    return (
        <a
            {...attributes}
            href={`#footnote_${ref}`}
            className={clsx("footnote-anchor", { selected })}
        >
            [{order}]{children}
        </a>
    );
};
