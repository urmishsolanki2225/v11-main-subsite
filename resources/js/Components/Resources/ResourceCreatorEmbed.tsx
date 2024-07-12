import React, { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { IErrors } from "../../Models";
import Item from "../../Models/Item";

import AbstractResourceCreator from "./AbstractResourceCreator";

interface IProps {
    onCreated: (item: Item<"resource", "embed">) => void;
}
const ResourceCreatorEmbed: React.FC<IProps> = ({ onCreated }) => {
    const postData = useRef(new FormData());
    const [title, setTitle] = useState<string>("");
    const [postUrl, setPostUrl] = useState<string>("");
    const [blurb, setBlurb] = useState<string>("");
    const [errors, setErrors] = useState<IErrors>();

    useEffect(() => {
        postData.current.set("subtype", "embed");
        postData.current.set("title", title);
        postData.current.set("blurb", blurb);
        postData.current.set("post_url", postUrl);
    }, [blurb, title, postUrl]);

    return (
        <Box minWidth={500}>
            <AbstractResourceCreator
                onCreated={onCreated}
                onError={setErrors}
                postData={postData.current}
                disableSubmit={!title || !postUrl}
                submitTitle="Create Embed"
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Title*"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={Boolean(errors?.title)}
                    helperText={errors?.title || " "}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Description (optional)"
                    value={blurb}
                    onChange={(e) => setBlurb(e.target.value)}
                    error={Boolean(errors?.blurb)}
                    helperText={errors?.blurb || " "}
                />
                <Box
                    display="flex"
                    flexWrap="nowrap"
                    justifyContent="space-evenly"
                >
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Social Media Post URL"
                        value={postUrl}
                        onChange={(evt) => setPostUrl(evt.target.value)}
                        error={Boolean(errors?.post_url)}
                        helperText={errors?.post_url || " "}
                    />
                </Box>
            </AbstractResourceCreator>
        </Box>
    );
};

export default ResourceCreatorEmbed;
