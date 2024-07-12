import React from "react";

import {
    useEditorState,
    ELEMENT_UL,
    getListItemEntry,
    toggleList,
} from "@udecode/plate";

import { BlockToolbarButton } from "./BlockToolbarButton";
import { ToolbarButtonProps } from "./ToolbarButton";

export const ListToolbarButton = ({
    type = ELEMENT_UL,
    ...props
}: ToolbarButtonProps & { type?: string }) => {
    const editor = useEditorState()!;

    const res = !!editor?.selection && getListItemEntry(editor);

    return (
        <BlockToolbarButton
            active={!!res && res.list[0].type === type}
            type={type}
            onMouseDown={
                editor
                    ? () =>
                          toggleList(editor, {
                              type,
                          })
                    : undefined
            }
            {...props}
        />
    );
};
