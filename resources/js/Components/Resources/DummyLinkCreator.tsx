import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import isUrl from "is-url";

import { IErrors, ItemContent, LinkResource } from "../../Models";
import Item from "../../Models/Item";

interface IProps {
    onCreated: (item: Item) => void;
}
export const DummyLinkCreator: React.FC<IProps> = ({ onCreated }) => {
    // const [postData, setPostData] = useState<{ [key: string]: string }>({});
    const [text, setText] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [errors, setErrors] = useState<IErrors>();

    useEffect(() => {
        setText(url);
        if (isUrl(url)) {
            setErrors((errors) => {
                const errs = { ...errors };
                delete errs["url"];
                return errs;
            });
        } else {
            setErrors((errors) => ({
                ...errors,
                url: "Invalid url, http included?",
            }));
        }
    }, [url]);

    const onCreate = () => {
        if (!text || !url) {
            return;
        }
        const dummyResource = { url: url } as LinkResource;
        const dummyContent = {
            lang: "*",
            title: text,
            links: [dummyResource],
        } as ItemContent;
        const dummyItem = {
            id: 0,
            type: "resource",
            subtype: "link",
            contents: [dummyContent],
        } as Item;
        onCreated(dummyItem);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            padding={2}
        >
            <TextField
                fullWidth
                variant="outlined"
                label="URL"
                value={url}
                placeholder="http:// or https:// required"
                onChange={(e) => setUrl(e.target.value)}
                error={Boolean(url && errors?.url)}
                helperText={url ? errors?.url || " " : "required"}
                InputLabelProps={{ shrink: true }}
            />
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="baseline"
            >
                <Button
                    color="primary"
                    variant="contained"
                    disabled={!text || !url}
                    onClick={onCreate}
                >
                    Insert link
                </Button>
            </Box>
        </Box>
    );
};

export default DummyLinkCreator;
