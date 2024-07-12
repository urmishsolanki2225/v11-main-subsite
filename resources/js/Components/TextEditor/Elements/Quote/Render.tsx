import React from "react";

import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import clsx from "clsx";
import { Transforms } from "slate";
import { RenderElementProps, useSelected, useSlate } from "slate-react";

const QuoteRender: React.FC<RenderElementProps> = ({
    attributes,
    element,
    children,
}) => {
    const selected = useSelected();
    const editor = useSlate();
    if (element.type !== "quote") {
        return <></>;
    }
    const { float } = element;
    const floatClass = float ? `float-${float}` : undefined;

    const setSocialShare = (checked: boolean) => {
        Transforms.setNodes(
            editor,
            { showSocialShare: checked },
            {
                at: [],
                match: (node) => {
                    return node === element;
                },
            }
        );
    };

    return (
        <figure
            {...attributes}
            className={clsx("quote", floatClass, { selected: selected })}
        >
            {children}
            {selected && (
                <Box contentEditable={false} sx={{ position: "absolute" }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={Boolean(element.showSocialShare)}
                                onChange={(evt, checked) =>
                                    setSocialShare(checked)
                                }
                                size="small"
                            />
                        }
                        componentsProps={{ typography: { variant: "caption" } }}
                        label="Show social share panel"
                    />
                </Box>
            )}
        </figure>
    );
};

export default QuoteRender;
