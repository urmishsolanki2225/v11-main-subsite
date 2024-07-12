import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { pascalCase } from "pascal-case";

import { Contact, ItemContent } from "../../Models";
import { EditorProps } from "../ContentsEditor";

import { CONTACT_FIELDS } from "./EditorContact.constants";

const EditorContact: React.FC<EditorProps<ItemContent>> = ({
    content,
    onChange,
}) => {
    const [contact, setContact] = useState<Contact | undefined>(
        content?.contacts && content?.contacts[0]
            ? content?.contacts[0]
            : undefined
    );

    useEffect(() => {
        setContact(content?.contacts[0]);
    }, [content.contacts]);

    const setField = (name: string, value: string) => {
        setContact((contact) => ({ ...contact, [name]: value } as Contact));
    };
    const onBlur = () => {
        if (contact !== content?.contacts[0]) {
            onChange("contacts", [contact]);
        }
    };

    if (!contact) {
        return <Typography>No contact details found.</Typography>;
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h6">Contact card</Typography>
            </Grid>
            {CONTACT_FIELDS.map((field, idx) => (
                <Grid item xs={4} key={idx}>
                    <TextField
                        value={((contact as any)[field] as string) ?? ""}
                        label={pascalCase(field)}
                        variant="outlined"
                        fullWidth
                        onChange={(e) =>
                            setField(field, e.target.value as string)
                        }
                        onBlur={onBlur}
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default EditorContact;
