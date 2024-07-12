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
import useSessionExpireReload from "../../Utils/useSessionExpireReload";

const Login: React.FC<ErrorPageProps> = ({ errors }) => {
    const [feedback, setFeedback] = useState<string>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword] = useState(false);

    useSessionExpireReload();

    useEffect(() => {
        setFeedback(errors?.email);
    }, [errors]);

    const doLogin = () => {
        setFeedback("");
        Inertia.post(route("login.submit"), { email, password });
    };

    const onKeyPress: KeyboardEventHandler<HTMLElement> = (e) => {
        if (e.key === "Enter") {
            doLogin();
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
                                marginBottom: `0 !important`,
                            },
                        },
                    }}
                >
                    <Typography variant="h4">Login</Typography>
                    <Typography variant="body1">{feedback}</Typography>
                    <TextField
                        label="Email"
                        value={email}
                        variant="outlined"
                        sx={{ my: 2 }}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={onKeyPress}
                        autoComplete="username"
                        id="user-text-field"
                    />
                    <TextField
                        label="Password"
                        value={password}
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        sx={{ my: 2 }}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={onKeyPress}
                        autoComplete="current-password"
                        id="password-text-field"
                    />
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ my: 2 }}
                        onClick={doLogin}
                        disabled={!email.length || !password.length}
                    >
                        Login
                    </Button>
                    <Button
                        variant="text"
                        onClick={() => Inertia.get(route("password.request"))}
                    >
                        Forgot password?
                    </Button>
                    <Button
                        component="a"
                        href={route("azure")}
                        color="primary"
                        variant="text"
                    >
                        Login via Azure
                    </Button>
                </Paper>
            </Box>
        </form>
    );
};

export default Login;
