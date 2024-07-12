import React, { useEffect, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import route from "ziggy-js";

import AppBarHeader from "../../Layout/AppBarHeader";
import ContentScroll from "../../Layout/ContentScroll";
import { ErrorPageProps } from "../../Models";

interface IProps {
    roles: { [key: string]: string };
}
const Create: React.FC<IProps & ErrorPageProps> = ({ roles, errors }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [isValid, setIsValid] = useState(false);

    const onCreate = () => {
        // Added by Cyblance for disable multi-item create start
        setIsValid(false);
        // Added by Cyblance for disable multi-item create end
        const params: any = { name, email, role };
        Inertia.post(route("admin.users.store").toString(), params);
    };

    useEffect(() => {
        if (Object.entries(roles).length === 1) {
            setRole(Object.entries(roles)[0][0]);
        }
    }, [roles]);

    useEffect(() => {
        setIsValid(Boolean(role) && Boolean(name) && Boolean(email));
    }, [role, name, email]);

    return (
        <>
            <AppBarHeader title="Create User" />
            <ContentScroll>
                <Box p={2}>
                    <Paper sx={{ p: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="body1">
                                    Provide the required information. The
                                    password will be set by the user via a link
                                    sent to their email address.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    helperText={errors?.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Email address"
                                    variant="outlined"
                                    fullWidth
                                    helperText={errors?.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        value={role}
                                        onChange={(e) =>
                                            setRole(e.target.value as string)
                                        }
                                        label="Type"
                                        fullWidth
                                    >
                                        {Object.entries(roles).map(
                                            ([role, label], i) => (
                                                <MenuItem value={role} key={i}>
                                                    {label}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                    <FormHelperText>
                                        {errors?.role}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    onClick={onCreate}
                                    disabled={!isValid}
                                >
                                    Create
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </ContentScroll>
        </>
    );
};

export default Create;
