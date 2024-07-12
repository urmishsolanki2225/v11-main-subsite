import React, { KeyboardEventHandler, useEffect, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import route from "ziggy-js";

import { FlashMessages } from "../../Layout";
import { ErrorPageProps } from "../../Models";

interface IProps {
    email: string;
    token: string;
}
const PasswordReset: React.FC<IProps & ErrorPageProps> = ({
    email,
    token,
    errors,
}) => {
    const [feedback, setFeedback] = useState<string>();
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [passwordConfirmFocused, setPasswordConfirmFocused] = useState(false);

    useEffect(() => {
        if (errors?.error) {
            setFeedback(errors.error);
        }
    }, [errors]);

    const doReset = () => {
        Inertia.post(route("password.update"), {
            email,
            password,
            password_confirmation: passwordConfirm,
            token,
        });
    };

    const onKeyPress: KeyboardEventHandler<HTMLElement> = (e) => {
        if (password !== passwordConfirm) {
            return;
        }
        if (e.key === "Enter") {
            doReset();
        }
    };

    return (
        <form>
            <input
                type="hidden"
                id="email"
                autoComplete="username"
                value={email}
            />
            <FlashMessages />
            <Box
                sx={{
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Paper
                    sx={{
                        display: "flex",
                        width: "30%",
                        minWidth: 300,
                        flexDirection: "column",
                        justifyContent: "center",
                        p: 2,

                        "& > *": {
                            mb: 2,
                            "&:last-child": {
                                mb: 0,
                            },
                        },
                    }}
                >
                    <Typography variant="h4">Update password</Typography>
                    <Typography variant="body1">
                        Provide a new password for account with email address:{" "}
                        {email}
                    </Typography>
                    <Typography variant="body1" color="error">
                        {feedback}
                    </Typography>
                    <TextField
                        label="New password"
                        value={password}
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        sx={{ my: 2 }}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={onKeyPress}
                        helperText={
                            password.length < 12 ? "Minimum 12 characters" : " "
                        }
                        autoComplete="new-password"
                        id="new-password-text-field"
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={() =>
                                        setShowPassword((show) => !show)
                                    }
                                    size="small"
                                >
                                    {showPassword ? (
                                        <VisibilityOffIcon />
                                    ) : (
                                        <VisibilityIcon />
                                    )}
                                </IconButton>
                            ),
                        }}
                        error={
                            !passwordFocused &&
                            password.length > 0 &&
                            password.length < 12
                        }
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                    />
                    <TextField
                        label="Confirm new password"
                        value={passwordConfirm}
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        sx={{ my: 2 }}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        onKeyPress={onKeyPress}
                        helperText={
                            password === passwordConfirm
                                ? " "
                                : "Does not match"
                        }
                        autoComplete="new-password"
                        id="confirm-password-text-field"
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={() =>
                                        setShowPassword((show) => !show)
                                    }
                                    size="small"
                                >
                                    {showPassword ? (
                                        <VisibilityOffIcon />
                                    ) : (
                                        <VisibilityIcon />
                                    )}
                                </IconButton>
                            ),
                        }}
                        error={
                            !passwordConfirmFocused &&
                            passwordConfirm.length > 0 &&
                            password !== passwordConfirm
                        }
                        onFocus={() => setPasswordConfirmFocused(true)}
                        onBlur={() => setPasswordConfirmFocused(false)}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ my: 2 }}
                        onClick={doReset}
                        disabled={!password || password !== passwordConfirm}
                    >
                        Update password
                    </Button>
                    <Button
                        variant="text"
                        onClick={() => Inertia.get(route("password.request"))}
                    >
                        Get new reset email
                    </Button>
                </Paper>
            </Box>
        </form>
    );
};

export default PasswordReset;
