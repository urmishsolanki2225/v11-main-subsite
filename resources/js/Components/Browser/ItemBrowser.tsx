import React, { ReactNode, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";
import route from "ziggy-js";

import { ItemType, ITEM_TYPES } from "../../Config";
import { Item, findTitle } from "../../Models";
import { IFilterProps } from "../../Models/Inertia";
import { makeDateColumn } from "../../Utils/DataGridUtils";
import PublishStatusIcon from "../General/PublishStatusIcon";
import Listing, { ListingProvider } from "../Listing";
import useDataSource from "../useDataSource";

import Browser, { IBrowserProps } from "./Browser";

interface IProps {
    onPick: (item: Item) => void;
    filter?: IFilterProps;
    sort?: string;
    browserProps: Partial<IBrowserProps<ItemType[]>>;
    extraFilter?: ReactNode;
}
export const ItemBrowser: React.FC<IProps> = ({
    onPick,
    filter: _filter,
    sort,
    browserProps,
    extraFilter,
}) => {
    const { label } = browserProps;
    const [activeTypes, setActiveTypes] = useState<ItemType[][]>();
    const [search, setSearch] = useState<string>();
    const [filter, setFilter] = useState<IFilterProps | undefined>(() => ({
        filter: {
            status: "published",
            ...(_filter?.filter || {}),
        },
    }));
    const [filterLabel, setFilterLabel] = useState(label);
    const [open, setOpen] = useState(false);

    const dataSource = useDataSource<Item>({
        mode: "xhr",
        search,
        filter,
        sort,
        xhrUrl: open ? route("admin.items.index") : undefined,
    });

    const onSelect = (item: Item) => {
        setOpen(false);
        onPick(item);
    };

    const ItemBrowserColumns: GridColDef<Item>[] = [
        {
            field: "id",
            renderCell: (cell) => (
                <Box display="flex" justifyContent="space-between">
                    {cell.id}
                </Box>
            ),
            align: "right",
            headerAlign: "right",
            width: 60,
        },
        {
            field: "title",
            renderCell: (cell) => (
                <span>
                    {<PublishStatusIcon item={cell.row as Item} />}{" "}
                    {findTitle(cell.row as Item) ?? "- no title -"}
                </span>
            ),
            flex: 4,
        },
        {
            field: "type",
            valueGetter: (params) => params.row.subtype || params.row.type,
        },
        makeDateColumn(sort === "publish_at" ? "publish_at" : "created_at"),
    ];

    useEffect(() => {
        if (activeTypes?.length) {
            setOpen(true);
            // merge all activeTypes
            const types = activeTypes.map((types) => types.join(",")).join(",");
            // let params = { filter: { type: activeTypes.join(",") } };
            setFilter((_filter) => ({
                filter: {
                    ..._filter?.filter,
                    type: types,
                },
            }));
        } else {
            // setFilter({ filter: { status: "published" } });
            setOpen(false);
        }
    }, [activeTypes]);

    useEffect(() => {
        setFilter((filter) => ({
            filter: {
                ...filter?.filter,
                ..._filter?.filter,
            },
        }));
    }, [_filter]);

    const filterOptions = [
        {
            label: "Hide unpublished",
            name: "status",
            value: "published",
        },
    ];

    return (
        <Browser<ItemType[]>
            {...browserProps}
            options={
                browserProps.options || [
                    {
                        value: ITEM_TYPES as any,
                        label: "Items",
                    },
                ]
            }
            filter={filter}
            filterOptions={filterOptions}
            onChangeFilter={setFilter}
            onSearch={setSearch}
            onSelect={(values, options) => {
                setActiveTypes([...values]);
                setFilterLabel(options?.length ? options[0].label : label);
            }}
            onClose={() => setOpen(false)}
            dialog={{
                title: filterLabel ?? label,
                wide: true,
                tall: true,
            }}
            open={open}
            extraFilter={extraFilter}
        >
            <ListingProvider
                onSelect={(row) => onSelect(row as Item)}
                onCancel={() => setOpen(false)}
            >
                <Listing
                    columns={ItemBrowserColumns}
                    dataSource={dataSource}
                    selectMode="single"
                />
            </ListingProvider>
        </Browser>
    );
};

export default ItemBrowser;
