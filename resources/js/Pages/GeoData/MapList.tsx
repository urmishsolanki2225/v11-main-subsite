import React, { useEffect, useState } from "react";

import { GridColDef } from "@mui/x-data-grid";

import Listing from "../../Components/Listing";
import useDataSource from "../../Components/useDataSource";
import { AppBarHeader, ContentScroll } from "../../Layout";
import { AuthPageProps, IListingPageProps, Paginated } from "../../Models";
import { GeoDataMap } from "../../Models/GeoData";
import { makeDateColumn } from "../../Utils/DataGridUtils";

interface IProps extends IListingPageProps, AuthPageProps {
    maps: Paginated<GeoDataMap>;
}
const MapList: React.FC<IProps> = ({ maps, filter: _filter, sort }) => {
    const [search, setSearch] = useState<string>();
    const [filter, setFilter] = useState(_filter);
    const dataSource = useDataSource({
        mode: "inertia",
        paginatedData: maps,
        search,
        filter,
        sort,
    });

    useEffect(() => {
        setFilter(_filter);
    }, [_filter]);

    const columns: GridColDef<GeoDataMap>[] = [
        { field: "id" },
        {
            field: "label",
            flex: 2,
        },
        makeDateColumn("created_at"),
    ];

    return (
        <>
            <AppBarHeader
                title="Geo Data Maps"
                filter={filter}
                onSearch={setSearch}
                onChangeFilter={setFilter}
            ></AppBarHeader>
            <ContentScroll>
                <Listing columns={columns} dataSource={dataSource}></Listing>
            </ContentScroll>
        </>
    );
};

export default MapList;
