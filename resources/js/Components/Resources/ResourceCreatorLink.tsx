import React, { useEffect, useRef, useState } from "react";

import TextField from "@mui/material/TextField";

import { IErrors } from "../../Models";
import Item from "../../Models/Item";

import AbstractResourceCreator from "./AbstractResourceCreator";

interface IProps {
    onCreated: (item: Item) => void;
}
const ResourceCreatorLink: React.FC<IProps> = ({ onCreated }) => {
    // const [postData, setPostData] = useState<{ [key: string]: string }>({});
    const postData = useRef(new FormData());
    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [blurb, setBlurb] = useState<string>("");
    const [errors, setErrors] = useState<IErrors>();

    useEffect(() => {
        postData.current.set("subtype", "link");
        postData.current.set("title", title);
        postData.current.set("url", url);
        postData.current.set("blurb", blurb);
    }, [url, blurb, title]);

    return (
        <AbstractResourceCreator
            onCreated={onCreated}
            onError={setErrors}
            postData={postData.current}
            disableSubmit={!title || !url}
            submitTitle="Create link"
        >
            <TextField
                fullWidth
                variant="outlined"
                label="Title"
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
            <TextField
                fullWidth
                variant="outlined"
                label="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                error={Boolean(errors?.url)}
                helperText={errors?.url || " "}
            />
        </AbstractResourceCreator>
    );
};

export default ResourceCreatorLink;
