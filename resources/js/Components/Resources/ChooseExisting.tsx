import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import Item from "../../Models/Item";

interface IProps {
    item: Item;
    onCreateNew: (force: boolean) => void;
}

const ChooseExisting: React.FC<IProps> = ({ onCreateNew }) => {
    const [open, setOpen] = useState(true);

    return (
        <Dialog open={open} disableEscapeKeyDown>
            <DialogTitle>Item exists</DialogTitle>
            <DialogContent>
                <Typography>
                    There was already an item matching your input. Do you want
                    to use the existing item or create a new one?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setOpen(false);
                        onCreateNew(true);
                    }}
                    color="primary"
                >
                    Create new
                </Button>
                <Button
                    onClick={() => {
                        setOpen(false);
                        onCreateNew(false);
                    }}
                    color="primary"
                >
                    Use existing
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChooseExisting;
