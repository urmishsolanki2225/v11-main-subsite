import React, {
    PropsWithChildren,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton/IconButton";
import { styled } from "@mui/material/styles";
import { isEqual } from "lodash";
import { ItemInterface, ReactSortable } from "react-sortablejs";

import { Confirm } from "../General/Confirm";

const StyledReactSortable = styled(ReactSortable)(({ theme }) => ({
    display: "flex",
    "& .sortable-ghost": { opacity: 0.5 },
    "& .sortable-chosen": {
        backgroundColor: theme.palette.action.selected,
        cursor: "dragging",
    },
    "& .sortable-drag": { backgroundColor: theme.palette.background.paper },
}));

export interface RendererProps<T> {
    item: T;
    dragHandle?: ReactNode;
    removeHandle: ReactNode;
    onChange?: (item: T) => void;
    children?: React.ReactNode;
}
type ID = string | number;

interface IProps<T> {
    items: T[];
    className?: string;
    Renderer: React.ComponentType<RendererProps<T>>;
    onChange: (items: T[]) => void;
    variant?: "column" | "row";
    getId?: (item: T) => ID;
    disableRemove?: boolean;
}
const Sorter = <T extends { id: ID }>({
    items,
    className,
    Renderer,
    onChange,
    variant = "column",
    getId: _getId,
    disableRemove,
}: PropsWithChildren<IProps<T>>) => {
    const [list, setList] = useState<ItemInterface[]>(() =>
        items.map((item) => ({ id: _getId ? _getId(item) : item.id, item }))
    );

    const getId = useCallback(
        (item: T) => (_getId ? _getId(item) : item.id),
        [_getId]
    );

    useEffect(() => {
        setList((currentList) => {
            const nextList = items.map((item) => ({ id: getId(item), item }));
            if (isEqual(currentList, nextList)) {
                return currentList;
            }
            return nextList;
        });
    }, [items, getId]);

    // useEffect(() => {
    //     if (!list) {
    //         return;
    //     }
    //     const sortedItems = list.map(({ item }) => item);
    //     if (
    //         sortedItems.length === items.length &&
    //         !isEqual(sortedItems, items)
    //     ) {
    //         onChange(sortedItems);
    //     }
    // }, [items, list, onChange]);

    const onDelete = (item: T) => {
        onChange(items.filter((_item) => getId(_item) !== getId(item)));
    };

    const onChangeItem = (changedItem: T) => {
        onChange(
            items.map((item) =>
                getId(item) === getId(changedItem) ? changedItem : item
            )
        );
    };

    const onChangeSort = useCallback(
        (newSort: ItemInterface[]) => {
            setList(newSort);
            onChange(newSort.map(({ item }) => item));
        },
        [onChange]
    );

    return (
        <StyledReactSortable
            list={list || []}
            setList={onChangeSort}
            handle=".eiie-sortable-handle"
            style={
                variant === "row"
                    ? { flexDirection: "row", flexWrap: "wrap" }
                    : { flexDirection: "column" }
            }
            className={className}
            // disabled={items.length <= 1}
        >
            {list?.map(({ item }) => (
                <Renderer
                    item={item}
                    key={getId(item)}
                    onChange={onChangeItem}
                    dragHandle={
                        <DragIndicatorIcon
                            className="eiie-sortable-handle"
                            sx={{
                                alignSelf: "center",
                                cursor: "grab",
                                color:
                                    list.length <= 1
                                        ? "action.disabled"
                                        : undefined,
                            }}
                        />
                    }
                    removeHandle={
                        disableRemove ? undefined : (
                            <Confirm
                                onConfirm={() => {
                                    onDelete(item);
                                }}
                            >
                                <IconButton size="small" color="error">
                                    <RemoveIcon sx={{ fontSize: "1rem" }} />
                                </IconButton>
                            </Confirm>
                        )
                    }
                />
            ))}
        </StyledReactSortable>
    );
};

export default Sorter;
