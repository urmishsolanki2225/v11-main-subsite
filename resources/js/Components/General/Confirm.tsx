import React, {
    cloneElement,
    isValidElement,
    useCallback,
    useState,
} from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface IProps {
    //   confirmTitle?: string;
    confirmText?: string;
    onConfirm: () => void;
    children: React.ReactNode;
}
export const Confirm: React.FC<IProps> = ({
    //   confirmTitle = "Confirm",
    confirmText,
    children,
    onConfirm,
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const onClick = useCallback((evt: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(evt.currentTarget);
    }, []);

    if (!isValidElement(children)) {
        return null;
    }

    return (
        <>
            {cloneElement(children as any, {
                onClick,
                disabled: children.props.disabled || Boolean(anchorEl),
            })}
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                transformOrigin={{ vertical: "bottom", horizontal: "center" }}
                sx={{ maxWidth: 350 }}
            >
                <Stack>
                    <Typography p={2} variant="body1">
                        {confirmText ? confirmText : "Are you sure?"}
                    </Typography>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        gap={2}
                        p={1}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => setAnchorEl(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                                setAnchorEl(null);
                                onConfirm();
                            }}
                        >
                            Confirm
                        </Button>
                    </Box>
                </Stack>
            </Popover>
        </>
    );
};
