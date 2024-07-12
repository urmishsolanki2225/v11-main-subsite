import React from "react";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
// import { useFocused } from "slate-react";

export interface ToolbarButtonProps {
    active?: boolean;
    icon: any;
    tooltip?: string;
    onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
}
export const ToolbarButton: React.FC<ToolbarButtonProps> = (props) => {
    const { active, tooltip, icon, onMouseDown } = props;
    // const focused = useFocused();
    const focused = true;

    const button = (
        <Button
            size="small"
            variant={active && focused ? "contained" : "text"}
            onMouseDown={onMouseDown}
            disabled={!focused}
            endIcon={icon}
            sx={{ minWidth: 0, p: 0.25, "& .MuiButton-endIcon": { mx: 0 } }}
        ></Button>
    );
    return tooltip ? (
        <Tooltip title={tooltip}>
            <span>{button}</span>
        </Tooltip>
    ) : (
        button
    );
};
