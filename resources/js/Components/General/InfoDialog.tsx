import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IProps {
    open: boolean;
    title: string;
    text?: string;
    label?: string;
    onClose: () => void;
    children?: React.ReactNode;
}
const InfoDialog: React.FC<IProps> = ({
    open,
    title,
    text,
    label,
    children,
    onClose,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} autoFocus>
                    {label ?? "Ok"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default InfoDialog;
