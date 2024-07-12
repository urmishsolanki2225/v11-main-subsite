import React, { useEffect, useState } from "react";

import { usePage } from "@inertiajs/inertia-react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import {
    AlertType,
    ALERT_TYPES,
    Message,
    MessageBag,
    Page,
} from "../Models/Inertia";

interface IProps {
    errors?: MessageBag;
    flash?: MessageBag;
}
export const FlashMessages: React.FC = () => {
    const { errors: errors, flash: flash } = usePage<Page<IProps>>().props;
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const process = (msgs?: MessageBag): Message[] => {
            if (!msgs) {
                return [];
            }
            return Object.entries(msgs)
                .filter(([type]) => ALERT_TYPES.includes(type as AlertType))
                .map(([type, message]) => ({
                    type: type as AlertType,
                    message,
                }))
                .filter(({ message }) => !!message);
        };
        setMessages([...process(errors), ...process(flash)]);
    }, [errors, flash]);

    if (!messages.length) {
        return <></>;
    }
    return (
        <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => {
                setMessages((msgs) => msgs.slice(1));
            }}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            <Alert elevation={6} variant="filled" severity={messages[0].type}>
                {messages[0].message}
            </Alert>
        </Snackbar>
    );
};

export default FlashMessages;
