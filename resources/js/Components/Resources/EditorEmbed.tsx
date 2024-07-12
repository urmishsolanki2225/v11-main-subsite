import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { ItemContent } from "../../Models/Item";
import { EmbedResource } from "../../Models/Resource";
import { EditorProps } from "../ContentsEditor";

const EditorEmbed: React.FC<EditorProps<ItemContent>> = ({
    content,
    onChange,
}) => {
    const [embeds, setEmbed] = useState<EmbedResource[]>(content?.embeds);
    useEffect(() => {
        setEmbed(content.embeds);
    }, [content.embeds]);

    const setField = (
        idx: number,
        field: keyof EmbedResource,
        value: string
    ) => {
        setEmbed((embeds) => [
            { ...embeds[0], [field]: value },
            ...embeds.slice(1),
        ]);
    };

    const onBlur = () => {
        if (embeds !== content.embeds) {
            onChange("embeds", embeds);
        }
    };

    if (!embeds?.length) {
        return (
            <Typography color="error">
                No post url found, this is an error.
            </Typography>
        );
    }

    return (
        <>
            <Typography variant="h6">Embed social</Typography>
            {embeds.map((embeds, idx) => (
                <Grid container spacing={2} key={idx}>
                    <Grid item xs={12}>
                        <TextField
                            value={embeds.post_url || ""}
                            label="Social Media Post URL"
                            variant="outlined"
                            fullWidth
                            onChange={(e) =>
                                setField(0, "post_url", e.target.value)
                            }
                            onBlur={onBlur}
                        />
                    </Grid>
                </Grid>
            ))}
        </>
    );
};

export default EditorEmbed;
