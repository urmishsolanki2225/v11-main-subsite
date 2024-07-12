import React, { useState } from "react";

import Button, { ButtonProps } from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

interface IProps {
    label?: string;
    icon?: React.ReactNode;
    buttonProps?: IconButtonProps;
    variant?: "outlined" | "contained" | "text";
    color?: "primary" | "secondary";
    needConfirmation?: boolean;
    onConfirm: () => void;
    children?: React.ReactNode;
}
const ButtonConfirmDialog: React.FC<IProps> = ({
    label,
    buttonProps,
    color = "secondary",
    variant = "text",
    icon,
    needConfirmation = true,
    onConfirm,
    children,
}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = (evt: React.MouseEvent<HTMLElement>) => {
        evt.preventDefault();
        evt.stopPropagation();
        if (evt.metaKey) {
            onConfirm();
        } else if (needConfirmation) {
            setOpen(true);
        } else {
            onConfirm();
        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleConfirm = () => {
        handleClose();
        onConfirm();
    };

    return (
        <>
            {label ? (
                <Button
                    variant={variant}
                    color={color}
                    onMouseDown={handleOpen}
                    startIcon={icon}
                    {...(buttonProps as ButtonProps)}
                >
                    {label}
                </Button>
            ) : (
                <IconButton
                    onMouseDown={handleOpen}
                    color={color}
                    {...buttonProps}
                    size="large"
                >
                    {icon}
                </IconButton>
            )}
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle>Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {children || (
                            <>
                                When you leave this screen unsaved changes will
                                be lost.
                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color={color}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color={color} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ButtonConfirmDialog;
