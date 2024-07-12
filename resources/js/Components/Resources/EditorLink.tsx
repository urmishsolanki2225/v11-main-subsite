import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { ItemContent } from "../../Models/Item";
import { LinkResource } from "../../Models/Resource";
import { EditorProps } from "../ContentsEditor";

// interface IProps extends EditorProps<ItemContent> {
//     content: ItemContent;
//     resourceType?: ItemSubtype;
//     onChange?: (content: ItemContent) => void;
// }
const EditorLink: React.FC<EditorProps<ItemContent>> = ({
    content,
    onChange,
}) => {
    const [links, setLinks] = useState<LinkResource[]>(content?.links);
    // const [label, setLabel] = useState<string>("");
    // const [url, setUrl] = useState<string>("");

    useEffect(() => {
        setLinks(content.links);
        // if (content.links.length) {
        //     setLabel(content.links[0].label);
        //     setUrl(content.links[0].url);
        // }
    }, [content.links]);

    const setField = (idx: number, field: "url" | "label", value: string) => {
        setLinks((links) => [
            { ...links[0], [field]: value },
            ...links.slice(1),
        ]);
    };

    const onBlur = () => {
        if (links !== content.links) {
            onChange("links", links);
        }
    };

    if (!links?.length) {
        return (
            <Typography color="error">
                No link found, this is an error.
            </Typography>
        );
    }
    // for now we only edit the first link
    // console.log(content.links);
    return (
        <>
            <Typography variant="h6">Link resource</Typography>
            {links.map((link, idx) => (
                <Grid container spacing={2} key={idx}>
                    <Grid item xs={4}>
                        <TextField
                            value={link.label || ""}
                            label="Label"
                            variant="outlined"
                            fullWidth
                            onChange={(e) =>
                                setField(0, "label", e.target.value)
                            }
                            onBlur={onBlur}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            value={link.url || ""}
                            label="URL"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setField(0, "url", e.target.value)}
                            onBlur={onBlur}
                        />
                    </Grid>
                </Grid>
            ))}
        </>
    );
};

export default EditorLink;
