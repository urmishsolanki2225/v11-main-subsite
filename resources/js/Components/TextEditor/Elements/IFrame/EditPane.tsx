import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { IPaneProps } from "../../Toolbar/ButtonDialog";
import LayoutSelect from "../../Toolbar/LayoutSelect";

import { IFrameAttributes, IFrameElementType } from "./type";

type IProps = IPaneProps<IFrameElementType>;
const IFrameEditPane: React.FC<IProps> = ({ elementIn, onChange }) => {
    const [attributes, setAttributes] = useState<IFrameAttributes>({});

    useEffect(() => {
        if (elementIn) {
            setAttributes((attrs) => ({
                ...attrs,
                url: elementIn.url,
                height: elementIn.height,
                layout: elementIn.layout,
            }));
        }
    }, [elementIn]);

    useEffect(() => {
        onChange({
            ...attributes,
            type: "iframe",
            children: elementIn?.children || [{ text: "" }],
        });
    }, [attributes, onChange, elementIn]);

    return (
        <>
            <Box>
                <Box display="flex" flexDirection="column" width={400}>
                    <Typography variant="subtitle1">
                        Embed IFrames by URL
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="URL"
                        value={attributes.url || ""}
                        helperText="Full URL including https://"
                        onChange={(e) =>
                            setAttributes((attr) => ({
                                ...attr,
                                url: e.target.value,
                            }))
                        }
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Height"
                        value={attributes.height || 300}
                        type="number"
                        helperText=""
                        onChange={(e) =>
                            setAttributes((attr) => ({
                                ...attr,
                                height: parseInt(e.target.value),
                            }))
                        }
                        InputLabelProps={{ shrink: true }}
                    />
                    <LayoutSelect
                        value={attributes.layout || "full"}
                        onChange={(layout) =>
                            setAttributes((attr) => ({
                                ...attr,
                                layout,
                            }))
                        }
                    />
                    {/* <Button
                        variant="text"
                        endIcon={<OpenInNewIcon />}
                        disabled={!attributes.url}
                        fullWidth={false}
                        component={Link}
                        target="_blank"
                        href={attributes.url}
                        rel="noopener noreferrer"
                    >
                        Preview
                    </Button> */}
                </Box>
            </Box>
        </>
    );
};

export default IFrameEditPane;
