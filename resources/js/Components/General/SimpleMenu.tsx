import React, { PropsWithChildren, ReactNode } from "react";

import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

export interface IMenuOption<T> {
    value: T;
    label: string;
    disabled?: boolean;
    icon?: ReactNode;
}
export const MenuOptionDivider: IMenuOption<any> = {
    icon: undefined,
    value: undefined,
    label: "",
};

interface IProps<T> {
    anchorEl: HTMLElement | null;
    header?: string;
    options: (IMenuOption<T> | typeof MenuOptionDivider)[];
    onClick: (value: T, option?: IMenuOption<T>) => void;
    onClose: () => void;
}

const SimpleMenu = <T,>({
    anchorEl,
    header,
    options,
    onClick,
    onClose,
}: PropsWithChildren<IProps<T>>) => {
    // const [anchor, setAnchor] = useState(anchorEl);

    // useEffect(() => {
    //     setAnchor(anchorEl);
    // }, [anchorEl]);

    // const onClick = (value: T) => {
    //     setAnchor(null);
    //     _onClick(value);
    // };
    return (
        <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => onClose()}
        >
            {header && (
                <MenuItem>
                    <Typography color="secondary">{header}</Typography>
                </MenuItem>
            )}
            {options.map((option, idx) =>
                option === MenuOptionDivider ? (
                    <Divider key={idx} />
                ) : (
                    <MenuItem
                        disabled={option.disabled}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick(option.value, option as IMenuOption<T>);
                        }}
                        key={idx}
                    >
                        {option.icon && (
                            <ListItemIcon>{option.icon}</ListItemIcon>
                        )}
                        <Typography variant="inherit">
                            {option.label}
                        </Typography>
                    </MenuItem>
                )
            )}
        </Menu>
    );
};

export default SimpleMenu;
