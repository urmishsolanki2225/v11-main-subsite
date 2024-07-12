import React, { useEffect, useRef, useState } from "react";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

import { IErrors } from "../../Models";
import Item from "../../Models/Item";
import InputFile from "../General/InputFile";

import AbstractResourceCreator from "./AbstractResourceCreator";

interface IProps {
    onCreated: (item: Item) => void;
}
const ResourceCreatorFile: React.FC<IProps> = ({ onCreated }) => {
    // const [postData, setPostData] = useState<{ [key: string]: string }>({});
    const postData = useRef(new FormData());
    const [title, setTitle] = useState<string>("");
    const [blurb, setBlurb] = useState<string>("");
    const fileInput = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<IErrors>();

    useEffect(() => {
        postData.current.set("subtype", "file");
        postData.current.set("title", title);
        postData.current.set("blurb", blurb);
    }, [blurb, title]);

    const onFileChange = () => {
        postData.current.delete("files");
        let filename = "";
        if (fileInput.current?.files?.length) {
            filename = fileInput.current.files[0].name;
            for (let i = 0; i < fileInput.current.files.length; ++i) {
                postData.current.append("files[]", fileInput.current.files[i]);
            }
        }
        if (!title) {
            setTitle(filename);
        }
    };

    return (
        <AbstractResourceCreator
            onCreated={onCreated}
            onError={setErrors}
            postData={postData.current}
            disableSubmit={!title}
            submitTitle="Upload file"
        >
            <TextField
                fullWidth
                variant="outlined"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={Boolean(errors?.title)}
                helperText={errors?.title || "required"}
            />
            <TextField
                fullWidth
                variant="outlined"
                label="Description"
                value={blurb}
                onChange={(e) => setBlurb(e.target.value)}
                error={Boolean(errors?.blurb)}
                helperText={errors?.blurb || "optional"}
            />
            <FormControl
                variant="outlined"
                fullWidth
                error={Boolean(errors?.files)}
            >
                <InputLabel shrink>File</InputLabel>
                <InputFile
                    label="File"
                    ref={fileInput}
                    onChange={onFileChange}
                    multiple
                />
                <FormHelperText>
                    {errors?.files || "possible to upload multiple files"}
                </FormHelperText>
            </FormControl>
        </AbstractResourceCreator>
    );
};

export default ResourceCreatorFile;
