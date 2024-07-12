import React from "react";

import { someNode, toggleNodeType, useEditorState } from "@udecode/plate";

import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

export interface BlockToolbarButtonProps extends ToolbarButtonProps {
    type: string;
    inactiveType?: string;
}
export const BlockToolbarButton = ({
    type,
    inactiveType,
    active,
    ...props
}: BlockToolbarButtonProps) => {
    const editor = useEditorState();

    if (!editor) {
        return null;
    }

    return (
        <ToolbarButton
            active={
                active ??
                (!!editor?.selection && someNode(editor, { match: { type } }))
            }
            onMouseDown={
                editor
                    ? () =>
                          toggleNodeType(editor, {
                              activeType: type,
                              inactiveType,
                          })
                    : undefined
            }
            {...props}
        />
    );
};
