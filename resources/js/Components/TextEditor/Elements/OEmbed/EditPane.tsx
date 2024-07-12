import React, { useEffect, useState } from "react";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { IPaneProps } from "../../Toolbar/ButtonDialog";

import { OEmbedAttributes, OEmbedElementType } from "./type";

type IProps = IPaneProps<OEmbedElementType>;
const OEmbedEditPane: React.FC<IProps> = ({ elementIn, onChange }) => {
    const [attributes, setAttributes] = useState<OEmbedAttributes>({});

    useEffect(() => {
        if (elementIn) {
            setAttributes((attrs) => ({
                ...attrs,
                url: elementIn.url,
            }));
        }
    }, [elementIn]);

    useEffect(() => {
        onChange({
            ...attributes,
            type: "oembed",
            children: elementIn?.children || [{ text: "" }],
        });
    }, [attributes, onChange, elementIn]);

    return (
        <>
            <Box>
                <Box display="flex" flexDirection="column" width={400}>
                    <Typography variant="subtitle1">
                        Embed social links via OEmbed mechanism
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="URL"
                        value={attributes.url || ""}
                        helperText="Full URL, e.g. of a tweet"
                        onChange={(e) =>
                            setAttributes((attr) => ({
                                ...attr,
                                url: e.target.value,
                            }))
                        }
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button
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
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default OEmbedEditPane;
