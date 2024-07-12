import React, { useEffect, useState } from "react";

import { Inertia, Page } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

import { SessionPageProps } from "../Models";
import useSessionExpireReload from "../Utils/useSessionExpireReload";

const SessionLifetime: React.FC = () => {
    const page = usePage();
    const { session_lifetime } = usePage<Page<SessionPageProps>>().props;
    const [showAlert, setShowAlert] = useState(false);
    useSessionExpireReload();

    useEffect(() => {
        if (!session_lifetime) {
            return;
        }
        setShowAlert(false);

        const timerAlert = setTimeout(() => {
            setShowAlert(true);
        }, Math.max(0.5, session_lifetime - 1) * 60 * 1000);

        return () => clearTimeout(timerAlert);
    }, [session_lifetime, page]);

    return (
        <Snackbar
            open={showAlert}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            <Alert
                variant="filled"
                severity="warning"
                action={
                    <Button
                        color="inherit"
                        onClick={() =>
                            Inertia.reload({
                                preserveState: true,
                                preserveScroll: true,
                            })
                        }
                    >
                        Extend session
                    </Button>
                }
            >
                You will be logged out soon.
            </Alert>
        </Snackbar>
    );
};

export default SessionLifetime;
