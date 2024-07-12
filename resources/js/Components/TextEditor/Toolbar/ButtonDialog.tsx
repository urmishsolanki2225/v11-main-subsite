import React, {
    PropsWithChildren,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";

import FindReplaceIcon from "@mui/icons-material/FindReplace";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { Element as SlateElement, Transforms, Editor, Range } from "slate";
import { ReactEditor, useSlate } from "slate-react";

import { Item } from "../../../Models";
import useResourceItem from "../../../Utils/useResourceItem";
import { MenuType, ResourcePicker } from "../../Browser";
import { IMenuOption } from "../../General/SimpleMenu";
import { EditPaneElement } from "../custom-types";
import { IElement } from "../Elements";

import { activeBlock, isBlockActive } from "./ButtonDialog.functions";

export type IPaneProps<T> = {
    item?: Item;
    elementIn?: T;
    onChange: (element: T) => void;
};

export type ItemToElementFunc<T> = (item: Item) => T | undefined;

interface IProps<T> {
    icon: ReactNode;
    elementType: IElement;
    pickerMenu?: IMenuOption<MenuType>[];
    EditPane: React.FC<IPaneProps<T>>;
    itemToElementMappers?: Partial<Record<MenuType, ItemToElementFunc<T>>>;
}
const ButtonDialog = <T extends EditPaneElement>({
    icon,
    elementType,
    pickerMenu,
    EditPane,
    itemToElementMappers,
}: PropsWithChildren<IProps<T>>) => {
    const editor = useSlate();
    const [open, setOpen] = useState(false);
    const [blockIsActive, setBlockIsActive] = useState(false);
    const [item, setItem] = useState<Item>();
    const [dataId, setDataId] = useState<number>();
    const [remoteItem] = useResourceItem(dataId);
    const [element, setElement] = useState<T>();
    const [elementIn, setElementIn] = useState<T>();
    const [selection, setSelection] = useState(editor.selection);

    useEffect(() => {
        if (ReactEditor.isFocused(editor)) {
            setSelection(editor.selection);
            setBlockIsActive(isBlockActive(editor, elementType.type));
        }
    }, [editor, editor.selection, elementType.type]);

    const onOpenDialog = () => {
        if (!isBlockActive(editor, elementType.type)) {
            setElementIn(undefined);
            setOpen(true);
            return;
        }
        const [activeItem] = activeBlock(editor, elementType.type);

        const activeElement =
            activeItem && SlateElement.isElement(activeItem)
                ? activeItem
                : undefined;
        if (activeElement?.type === "image") {
            if (
                activeElement.dataId &&
                (!item || item.id !== Number(activeElement.dataId))
            ) {
                // active node item has a dataId, but no matching Item found, load it
                setDataId(Number(activeElement.dataId));
                // and clear the current item
                setItem(undefined);
            }
        }
        if (
            activeElement?.type === "link" ||
            activeElement?.type === "oembed" ||
            activeElement?.type === "iframe"
        ) {
            setElementIn(activeElement as T);
        }
        setOpen(true);
    };

    useEffect(() => {
        setItem(remoteItem);
    }, [remoteItem]);

    const onCloseDialog = () => {
        // always reset dataId for next open
        setDataId(undefined);
        setOpen(false);
    };

    const onConfirmDialog = () => {
        // always reset dataId for next open
        setDataId(undefined);
        if (element) {
            applyElement(element);
        }
        setOpen(false);
    };

    const applyElement = (element: T) => {
        console.log("setting item", blockIsActive, selection, element);
        if (blockIsActive && selection) {
            const [match] = Editor.nodes(editor, {
                match: (n) =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    n.type === element.type,
                at: selection,
            });
            // match element of same type, at selection
            const [, p] = match;
            // p is path of the matched element
            Transforms.setNodes<T>(editor, element, {
                at: p,
            });
        } else {
            const isCollapsed = selection && Range.isCollapsed(selection);
            if (!selection || isCollapsed) {
                Transforms.insertNodes(editor, [element], {
                    at: selection || undefined,
                });
            } else {
                Transforms.wrapNodes(editor, element, {
                    at: selection!,
                    split: true,
                });
            }
        }
    };

    const onPick = (item: Item, menuOption?: MenuType) => {
        if (
            menuOption &&
            itemToElementMappers &&
            itemToElementMappers[menuOption]
        ) {
            const ele = itemToElementMappers![menuOption]!(item);
            if (ele) {
                applyElement(ele);
                return;
            }
        }
        setItem(item);
        setOpen(true);
    };

    const onChangeElement = useCallback((element: T) => {
        setElement(element);
    }, []);

    return (
        <>
            {blockIsActive || !pickerMenu?.length ? (
                <IconButton
                    color={blockIsActive ? "primary" : undefined}
                    size="small"
                    sx={{
                        borderRadius: "0.1em",
                        backgroundColor: blockIsActive
                            ? "action.selected"
                            : undefined,
                    }}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        onOpenDialog();
                    }}
                >
                    {icon}
                </IconButton>
            ) : (
                <ResourcePicker
                    menu={pickerMenu}
                    buttonIcon={icon}
                    onPick={onPick}
                    buttonProps={{
                        color: undefined,
                        sx: { borderRadius: "0.1em" },
                    }}
                />
            )}

            {open && (
                <Dialog
                    open={Boolean(open)}
                    onClose={onCloseDialog}
                    maxWidth={false}
                >
                    <DialogTitle>
                        {blockIsActive ? "Modify" : "Insert"} {elementType.type}
                    </DialogTitle>
                    <DialogContent>
                        {pickerMenu?.length ? (
                            <Box display="flex">
                                <ResourcePicker
                                    menu={pickerMenu}
                                    onPick={onPick}
                                    label={`Replace with another ${elementType.type}`}
                                    buttonIcon={<FindReplaceIcon />}
                                    buttonProps={{ size: "medium" }}
                                />
                            </Box>
                        ) : (
                            <></>
                        )}
                        {item?.id && EditPane ? (
                            <EditPane
                                item={item}
                                elementIn={undefined}
                                onChange={onChangeElement}
                            />
                        ) : !item?.id && elementIn && EditPane ? (
                            <EditPane
                                elementIn={elementIn}
                                item={undefined}
                                onChange={onChangeElement}
                            />
                        ) : !pickerMenu?.length ? (
                            <EditPane
                                elementIn={undefined}
                                item={undefined}
                                onChange={onChangeElement}
                            />
                        ) : (
                            <></>
                        )}
                    </DialogContent>
                    <DialogActions>
                        {blockIsActive && false && (
                            <Button onClick={onCloseDialog}>Remove</Button>
                        )}
                        <Button onClick={onCloseDialog}>Cancel</Button>
                        <Button onClick={onConfirmDialog} color="primary">
                            {blockIsActive ? "Update" : "Insert"}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default ButtonDialog;
