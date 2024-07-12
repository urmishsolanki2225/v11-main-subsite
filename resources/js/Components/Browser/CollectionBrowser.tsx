import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";
import route from "ziggy-js";

import { CollectionType } from "../../Config";
import { findTitle } from "../../Models";
import Collection from "../../Models/Collection";
import { IFilterProps } from "../../Models/Inertia";
import { makeDateColumn } from "../../Utils/DataGridUtils";
import PublishStatusIcon from "../General/PublishStatusIcon";
import Listing, { DataCellCollectionTree, ListingProvider } from "../Listing";
import useDataSource from "../useDataSource";

import Browser, { IBrowserProps } from "./Browser";

interface IProps extends IBrowserProps<CollectionType[]> {
    onPick: (collection: Collection) => void;
}
export const CollectionBrowser: React.FC<IProps> = ({
    options,
    label,
    onPick,
    skipMenu,
}) => {
    const [activeTypes, setActiveTypes] = useState<CollectionType[][]>();
    const [search, setSearch] = useState<string>();
    const [filter, setFilter] = useState<IFilterProps>();
    const [filterLabel, setFilterLabel] = useState(label);
    const [sort] = useState("title");
    const [open, setOpen] = useState(false);

    const dataSource = useDataSource<Collection>({
        mode: "xhr",
        search: search,
        filter: filter,
        sort: sort,
        xhrUrl: filter ? route("admin.collections.index") : undefined,
    });

    const onSelect = (collection: Collection) => {
        setOpen(false);
        onPick(collection);
    };

    const CollectionBrowserColumns: GridColDef[] = [
        {
            field: "id",
            renderCell: (cell) => (
                <Box display="flex" justifyContent="space-between">
                    {cell.id}{" "}
                    <DataCellCollectionTree
                        collection={cell.row as Collection}
                        onSelect={onSelect}
                    />
                </Box>
            ),
            align: "right",
        },
        {
            field: "title",
            renderCell: (cell) => (
                <span>
                    {dataSource.childTypes?.includes(
                        (cell.row as Collection).type
                    ) && <>&mdash;&nbsp;&nbsp;</>}
                    {<PublishStatusIcon item={cell.row as Collection} />}{" "}
                    {findTitle(cell.row as Collection) ?? "- no title -"}
                </span>
            ),
            flex: 4,
        },
        makeDateColumn("created_at"),
    ];

    useEffect(() => {
        // activeTypes?.length && load();
        if (activeTypes?.length) {
            setOpen(true);
            // merge all activeTypes
            const types = activeTypes.map((types) => types.join(",")).join(",");
            // let params = { filter: { type: activeTypes.join(",") } };
            setFilter({ filter: { type: types, status: "published" } });
        } else {
            setFilter(undefined);
            setOpen(false);
        }
    }, [activeTypes]);

    const filterOptions = [
        {
            label: "Hide unpublished",
            name: "status",
            value: "published",
        },
    ];

    return (
        <Browser<CollectionType[]>
            label={label}
            options={options}
            filter={filter}
            filterOptions={filterOptions}
            onChangeFilter={setFilter}
            onSearch={setSearch}
            onSelect={(values, options) => {
                setActiveTypes([...values]);
                setFilterLabel(options?.length ? options[0].label : label);
            }}
            onClose={() => setOpen(false)}
            skipMenu={skipMenu}
            dialog={{
                title: filterLabel ?? label,
                wide: true,
                tall: true,
            }}
            open={open}
        >
            <ListingProvider
                onSelect={(row) => onSelect(row as Collection)}
                onCancel={() => setOpen(false)}
            >
                <Listing
                    columns={CollectionBrowserColumns}
                    dataSource={dataSource}
                    selectMode="single"
                />
            </ListingProvider>
        </Browser>
    );
};

export default CollectionBrowser;
