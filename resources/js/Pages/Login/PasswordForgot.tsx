import React, { KeyboardEventHandler, useEffect, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import route from "ziggy-js";

import { FlashMessages } from "../../Layout";
import { ErrorPageProps } from "../../Models";

const PasswordForgot: React.FC<ErrorPageProps> = ({ errors }) => {
    const [feedback, setFeedback] = useState<string>();
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (errors?.error) {
            setFeedback(errors.error);
        }
    }, [errors]);

    const doReset = () => {
        Inertia.post(route("password.email"), {
            email,
        });
    };

    const onKeyPress: KeyboardEventHandler<HTMLElement> = (e) => {
        if (!email) {
            return;
        }
        if (e.key === "Enter") {
            doReset();
        }
    };

    return (
        <form>
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
                    <Typography variant="h4">Forgot password</Typography>
                    <Typography variant="body1">
                        Reset your password by providing your email address, a
                        reset link will be sent there.
                    </Typography>
                    <Typography variant="body1" color="error">
                        {feedback}
                    </Typography>
                    <TextField
                        label="Email address"
                        value={email}
                        variant="outlined"
                        type="email"
                        sx={{ my: 2 }}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={onKeyPress}
                        helperText={errors?.email || " "}
                        autoComplete="username"
                        error={Boolean(errors?.email)}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ my: 2 }}
                        onClick={doReset}
                        disabled={email.length === 0}
                    >
                        Reset password
                    </Button>
                </Paper>
            </Box>
        </form>
    );
};

export default PasswordForgot;
