import React, { useEffect, useState } from "react";

import { InertiaLink } from "@inertiajs/inertia-react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { GridColDef, GridCellParams } from "@mui/x-data-grid";
import route from "ziggy-js";

import Listing from "../../Components/Listing";
import useDataSource from "../../Components/useDataSource";
import { AppBarHeader, ContentScroll } from "../../Layout";
import { AuthPageProps, IListingPageProps, Paginated } from "../../Models";
import { GeoDataSet } from "../../Models/GeoData";
import { makeDateColumn } from "../../Utils/DataGridUtils";

interface IProps extends IListingPageProps, AuthPageProps {
    datasets: Paginated<GeoDataSet>;
}
const SetList: React.FC<IProps> = ({
    datasets,
    filter: _filter,
    sort,
    can,
}) => {
    const [search, setSearch] = useState<string>();
    const [filter, setFilter] = useState(_filter);
    const dataSource = useDataSource({
        mode: "inertia",
        paginatedData: datasets,
        search,
        filter,
        sort,
    });

    useEffect(() => {
        setFilter(_filter);
    }, [_filter]);

    const columns: GridColDef<GeoDataSet>[] = [
        { field: "id" },
        {
            field: "label",
            renderCell: ({ row }: GridCellParams) => (
                <>
                    {row.label}
                    <Button
                        sx={{ ml: 1 }}
                        LinkComponent={InertiaLink}
                        href={route("admin.geodata.map.create", {
                            set_id: row.id,
                        })}
                    >
                        Create Map
                    </Button>
                </>
            ),
            flex: 2,
        },
        makeDateColumn("created_at"),
    ];

    return (
        <>
            <AppBarHeader
                title="Geo Data Sets"
                filter={filter}
                onSearch={setSearch}
                onChangeFilter={setFilter}
            >
                <IconButton
                    href={route("admin.geodata.import.create")}
                    disabled={!can?.users?.create}
                    size="large"
                    color="inherit"
                >
                    <DriveFolderUploadIcon />
                </IconButton>
            </AppBarHeader>
            <ContentScroll>
                <Listing columns={columns} dataSource={dataSource}></Listing>
            </ContentScroll>
        </>
    );
};

export default SetList;
