import React, { useEffect, useState } from "react";

import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { VIDEO_PROVIDERS } from "../../Config";
import { ItemContent } from "../../Models/Item";
import { VideoResource } from "../../Models/Resource";
import { EditorProps } from "../ContentsEditor";

const EditorVideo: React.FC<EditorProps<ItemContent>> = ({
    content,
    onChange,
}) => {
    const [videos, setVideos] = useState<VideoResource[]>(content?.videos);

    useEffect(() => {
        setVideos(content.videos);
    }, [content.videos]);

    const setField = (
        idx: number,
        field: "provider" | "provider_id",
        value: string
    ) => {
        setVideos((videos) => [
            { ...videos[0], [field]: value },
            ...videos.slice(1),
        ]);
    };

    const onBlur = () => {
        if (videos !== content.videos) {
            onChange("videos", videos);
        }
    };

    if (!videos?.length) {
        return (
            <Typography color="error">
                No video details found, this is an error.
            </Typography>
        );
    }
    // for now we only edit the first video
    // console.log(content.videos);
    return (
        <>
            <Typography variant="h6">Video resource</Typography>
            {videos.map((video, idx) => (
                <Grid container spacing={2} key={idx}>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Provider</InputLabel>
                            <Select
                                value={video.provider}
                                onChange={(e) =>
                                    setField(
                                        0,
                                        "provider",
                                        e.target.value as string
                                    )
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
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={video.provider_id || ""}
                            label="ID"
                            variant="outlined"
                            fullWidth
                            onChange={(e) =>
                                setField(0, "provider_id", e.target.value)
                            }
                            onBlur={onBlur}
                        />
                    </Grid>
                </Grid>
            ))}
        </>
    );
};

export default EditorVideo;
