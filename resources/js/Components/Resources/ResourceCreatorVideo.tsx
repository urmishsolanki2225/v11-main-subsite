import React, { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import { VIDEO_PROVIDERS } from "../../Config";
import { IErrors } from "../../Models";
import Item from "../../Models/Item";

import AbstractResourceCreator from "./AbstractResourceCreator";

interface IProps {
    onCreated: (item: Item) => void;
}
const ResourceCreatorVideo: React.FC<IProps> = ({ onCreated }) => {
    const postData = useRef(new FormData());
    const [title, setTitle] = useState<string>("");
    const [provider, setProvider] = useState<string>("youtube");
    const [providerId, setProviderId] = useState<string>("");
    const [blurb, setBlurb] = useState<string>("");
    const [errors, setErrors] = useState<IErrors>();

    useEffect(() => {
        postData.current.set("subtype", "video");
        postData.current.set("title", title);
        postData.current.set("blurb", blurb);
        postData.current.set("provider", provider);
        postData.current.set("provider_id", providerId);
    }, [blurb, title, provider, providerId]);

    return (
        <Box minWidth={500}>
            <AbstractResourceCreator
                onCreated={onCreated}
                onError={setErrors}
                postData={postData.current}
                disableSubmit={!title || !providerId}
                submitTitle="Create video"
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    // Added by Cyblance for Annual-Reports section start
                    label="Title*"
                    // Added by Cyblance for Annual-Reports section end
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
                    <Box flexGrow={1}>
                        <FormControl
                            variant="outlined"
                            fullWidth
                            error={Boolean(errors?.provider)}
                        >
                            <InputLabel>Provider</InputLabel>
                            <Select
                                value={provider}
                                onChange={(e) =>
                                    setProvider(e.target.value as string)
                                }
                                label="Provider"
                                fullWidth
                            >
                                {VIDEO_PROVIDERS.map((provider, idx) => (
                                    <MenuItem key={idx} value={provider}>
                                        {provider}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors?.provider && (
                                <FormHelperText>
                                    {errors?.provider ?? " "}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                    <Box marginLeft={2} flexGrow={1}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="ID"
                            value={providerId}
                            onChange={(e) => setProviderId(e.target.value)}
                            error={Boolean(errors?.providerId)}
                            helperText={errors?.providerId || " "}
                        />
                    </Box>
                </Box>
            </AbstractResourceCreator>
        </Box>
    );
};

export default ResourceCreatorVideo;
