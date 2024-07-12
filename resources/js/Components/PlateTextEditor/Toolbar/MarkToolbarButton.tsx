import React from "react";

import {
    isMarkActive,
    toggleMark,
    ToggleMarkPlugin,
    useEditorState,
    WithPlatePlugin,
} from "@udecode/plate";

import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

export interface MarkToolbarButtonProps
    extends ToolbarButtonProps,
        Pick<WithPlatePlugin, "type">,
        Pick<ToggleMarkPlugin, "clear"> {}
export const MarkToolbarButton = ({
    type,
    clear,
    ...props
}: MarkToolbarButtonProps) => {
    // const editor = useEditorState()!;
    const editor = useEditorState()!;

    return (
        <ToolbarButton
            active={!!editor?.selection && isMarkActive(editor, type!)}
            onMouseDown={
                editor
                    ? () =>
                          toggleMark(editor, {
                              key: type,
                              clear,
                          })
                    : undefined
            }
            {...props}
        />
    );
};
