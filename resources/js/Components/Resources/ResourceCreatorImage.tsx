import React, { useEffect, useRef, useState } from "react";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import { IMAGE_SUBTYPES } from "../../Config";
import { IErrors } from "../../Models";
import Item from "../../Models/Item";
import InputFile from "../General/InputFile";

import AbstractResourceCreator from "./AbstractResourceCreator";

interface IProps {
    onCreated: (item: Item) => void;
}
const ResourceCreatorImage: React.FC<IProps> = ({ onCreated }) => {
    // const [postData, setPostData] = useState<{ [key: string]: string }>({});
    const postData = useRef(new FormData());
    const [subtype, setSubtype] = useState<string>("image");
    const [title, setTitle] = useState<string>("");
    const [subtitle, setSubtitle] = useState<string>("");
    const [blurb, setBlurb] = useState<string>("");
    const fileInput = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<IErrors>();
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [largeFileSize, setLargeFileSize] = useState<number>();

    useEffect(() => {
        postData.current.set("subtype", subtype);
        postData.current.set("title", title || "");
        postData.current.set("subtitle", subtitle);
        postData.current.set("blurb", blurb);
    }, [blurb, title, subtitle, subtype]);

    const onFileChange = () => {
        postData.current.delete("files");
        let filename = "";
        setDisableSubmit(true);
        if (fileInput.current?.files?.length) {
            filename = fileInput.current.files[0].name;
            setDisableSubmit(false);
            for (let i = 0; i < fileInput.current.files.length; ++i) {
                postData.current.set("files[]", fileInput.current.files[i]);
            }
            if (fileInput.current.files[0].size > 10 * 1024 * 1024) {
                setLargeFileSize(
                    Math.round(
                        (fileInput.current.files[0].size / (1024 * 1024)) * 10
                    ) / 10
                );
            } else {
                setLargeFileSize(undefined);
            }
        } else {
            setLargeFileSize(undefined);
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
            disableSubmit={disableSubmit}
            submitTitle="Upload file"
        >
            <TextField
                fullWidth
                variant="outlined"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={Boolean(errors?.title)}
                helperText={errors?.title || "optional"}
            />
            <TextField
                fullWidth
                variant="outlined"
                label="Caption"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                error={Boolean(errors?.subtitle)}
                helperText={
                    errors?.subtitle || "optional, subtitle used as caption"
                }
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
                error={Boolean(errors?.subtype)}
            >
                <InputLabel>Image type</InputLabel>
                <Select
                    value={subtype}
                    onChange={(e) => setSubtype(e.target.value as string)}
                    label="Image type"
                    fullWidth
                >
                    {Object.entries(IMAGE_SUBTYPES).map(
                        ([value, label], idx) => (
                            <MenuItem key={idx} value={value}>
                                {label}
                            </MenuItem>
                        )
                    )}
                </Select>
                {errors?.subtype && (
                    <FormHelperText>{errors?.subtype}</FormHelperText>
                )}
            </FormControl>

            <FormControl
                variant="outlined"
                fullWidth
                error={Boolean(errors?.files) || Boolean(largeFileSize)}
            >
                <InputLabel shrink>File</InputLabel>
                <InputFile
                    label="File"
                    ref={fileInput}
                    onChange={onFileChange}
                    accept="image/*"
                />
                <FormHelperText>
                    {errors?.files ||
                        (largeFileSize
                            ? `Large file: ${largeFileSize} MB`
                            : "upload full size, server resizes")}
                </FormHelperText>
            </FormControl>
        </AbstractResourceCreator>
    );
};

export default ResourceCreatorImage;
