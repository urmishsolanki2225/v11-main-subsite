import React, { useEffect, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EmailIcon from "@mui/icons-material/Email";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import route from "ziggy-js";

import { Confirm } from "../../Components/General/Confirm";
import Section from "../../Components/Section";
import { AppBarHeader, ContentScroll, useAppContext } from "../../Layout";
import { AuthPageProps, ErrorPageProps, User } from "../../Models";

interface IProps extends AuthPageProps {
    userModel: User;
    roles: Record<string, string>;
}
const Edit: React.FC<IProps & ErrorPageProps> = ({
    userModel: user,
    errors,
    roles,
    can,
}) => {
    const { needSave, setNeedSave } = useAppContext();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
    }, [user]);

    useEffect(() => {
        setNeedSave(
            name !== user.name || email !== user.email || role !== user.role
        );
    }, [setNeedSave, user, name, email, role]);

    const onReset = () => {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
    };

    const onSave = () => {
        Inertia.patch(
            route("admin.users.update", { user }).toString(),
            { email, name, role },
            {
                preserveState: true,
            }
        );
        setNeedSave(false);
    };

    const inTrash = Boolean(user.deleted_at);

    const onTrash = () => {
        Inertia.post(route("admin.users.trash", { id: user.id }));
    };
    const onRestore = () => {
        Inertia.post(route("admin.users.restore", { id: user.id }));
    };
    const onDestroy = () => {
        Inertia.delete(route("admin.users.destroy", { id: user.id }));
    };

    const onResetPassword = () => {
        if (needSave) {
            return;
        }
        Inertia.post(route("admin.users.resetPassword", { user }), undefined, {
            preserveState: true,
        });
    };

    return (
        <>
            <AppBarHeader title="Edit User">
                <Button
                    variant="outlined"
                    onClick={onReset}
                    color="secondary"
                    disabled={!needSave}
                >
                    Reset
                </Button>
                <Button
                    variant={needSave ? "contained" : "outlined"}
                    onClick={onSave}
                    color="secondary"
                    disabled={!needSave}
                >
                    Save
                </Button>
            </AppBarHeader>
            <ContentScroll>
                <Section title="User details" open={true}>
                    <Grid container>
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
                        {can?.role?.update && (
                            <Grid item xs={12}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        value={role}
                                        onChange={(e) =>
                                            setRole(e.target.value as any)
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
                        )}
                    </Grid>
                </Section>
                <Section title="Actions">
                    <Grid container spacing={4} alignItems="baseline">
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="start"
                            >
                                <Typography variant="body1">
                                    The password can be changed with a reset
                                    link that will be sent to the email address.
                                </Typography>
                                <Button
                                    variant="contained"
                                    disabled={email !== user.email}
                                    onClick={onResetPassword}
                                    startIcon={<EmailIcon />}
                                >
                                    Send reset link
                                </Button>
                                <Typography variant="caption">
                                    {email !== user.email ? (
                                        "Email address has changed, save first."
                                    ) : (
                                        <br />
                                    )}
                                </Typography>
                            </Box>
                        </Grid>
                        {can?.user?.delete && (
                            <>
                                <Grid item xs={12}>
                                    <Box display="flex" gap={2}>
                                        {inTrash ? (
                                            <>
                                                <Confirm onConfirm={onRestore}>
                                                    <Button
                                                        variant="contained"
                                                        startIcon={
                                                            <RestoreFromTrashIcon />
                                                        }
                                                    >
                                                        Restore from Trash
                                                    </Button>
                                                </Confirm>
                                                <Confirm onConfirm={onDestroy}>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        startIcon={
                                                            <DeleteForeverIcon />
                                                        }
                                                    >
                                                        Delete permanently
                                                    </Button>
                                                </Confirm>
                                            </>
                                        ) : (
                                            <>
                                                <Confirm onConfirm={onTrash}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        startIcon={
                                                            <DeleteIcon />
                                                        }
                                                    >
                                                        Move to Trash
                                                    </Button>
                                                </Confirm>
                                            </>
                                        )}
                                    </Box>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Section>
            </ContentScroll>
        </>
    );
};

export default Edit;
