import React, { PropsWithChildren, ReactNode, useState } from "react";

import AddIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import AppBarHeader, { FilterOption } from "../../Layout/AppBarHeader";
import { IFilterProps } from "../../Models";
import SimpleMenu, { IMenuOption } from "../General/SimpleMenu";

export interface IBrowserProps<T> {
    options: IMenuOption<T>[];
    label?: string;
    buttonIcon?: React.ReactNode;
    dialog?: { title?: string; tall?: boolean; wide?: boolean };
    dialogProps?: DialogProps;
    buttonProps?: ButtonProps;
    skipMenu?: boolean;
    open?: boolean;
    extraFilter?: ReactNode;
}
interface IProps<T> extends IBrowserProps<T> {
    onSearch?: (search: string) => void;
    filter?: IFilterProps;
    filterOptions?: FilterOption[];
    onChangeFilter?: (filter: IFilterProps) => void;
    onSelect: (values: T[], options?: IMenuOption<T>[]) => void;
    onClose: () => void;
}
const Browser = <T,>({
    options,
    label,
    buttonIcon,
    skipMenu,
    children,
    filter,
    filterOptions,
    onChangeFilter,
    onSearch,
    onSelect,
    dialog,
    dialogProps,
    buttonProps,
    open,
    onClose,
    extraFilter,
}: PropsWithChildren<IProps<T>>) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const doSkipMenu = skipMenu || options.length === 1;

    const onButtonClick = (anchor: HTMLElement | null) => {
        if (doSkipMenu) {
            onSelect(
                options.map(({ value }) => value),
                options
            );
        } else {
            setAnchorEl(anchor);
        }
    };
    const onMenuClick = (optionValue: T, option?: IMenuOption<T>) => {
        setAnchorEl(null);
        onSelect([optionValue], option ? [option] : undefined);
    };

    return (
        <>
            {label ? (
                <Button
                    color="secondary"
                    size="small"
                    onClick={(evt) => {
                        evt.stopPropagation();
                        onButtonClick(evt.currentTarget);
                    }}
                    startIcon={
                        buttonIcon ? (
                            buttonIcon
                        ) : doSkipMenu ? (
                            <SearchIcon />
                        ) : (
                            <AddIcon />
                        )
                    }
                    {...buttonProps}
                >
                    {label}
                </Button>
            ) : (
                <IconButton
                    color="secondary"
                    size="small"
                    onClick={(evt) => {
                        evt.stopPropagation();
                        onButtonClick(evt.currentTarget);
                    }}
                    {...(buttonProps as IconButtonProps)}
                >
                    {buttonIcon ? (
                        buttonIcon
                    ) : doSkipMenu ? (
                        <SearchIcon />
                    ) : (
                        <AddIcon />
                    )}
                </IconButton>
            )}

            <SimpleMenu<T>
                // header={label}
                options={options}
                anchorEl={anchorEl}
                onClick={onMenuClick}
                onClose={() => setAnchorEl(null)}
            />

            <Dialog
                {...dialogProps}
                open={Boolean(open)}
                onClose={onClose}
                maxWidth={false}
            >
                <AppBarHeader
                    title={dialog?.title || label}
                    onSearch={onSearch}
                    isDialog
                    filter={filter}
                    filterOptions={filterOptions}
                    onChangeFilter={onChangeFilter}
                    afterSearch={extraFilter}
                >
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={onClose}
                        aria-label="close"
                        sx={{ mr: -2 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </AppBarHeader>
                <Box
                    sx={{
                        paddingTop: 0,
                        height: "100%",
                        minHeight: dialog?.tall ? "80vh" : "25vh",
                        maxHeight: dialog?.tall ? "unset" : undefined,
                        minWidth: dialog?.wide ? "90vw" : "25vw",
                        maxWidth: dialog?.wide ? "unset" : "40vw",
                        boxSizing: "border-box",
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {open && children}
                </Box>
            </Dialog>
        </>
    );
};

export default Browser;
