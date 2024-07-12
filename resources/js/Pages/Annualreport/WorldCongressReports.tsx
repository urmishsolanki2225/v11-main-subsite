import React, { useMemo } from "react";

import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import route from "ziggy-js";

import PublishStatusIcon from "@/Components/General/PublishStatusIcon";
import Listing from "@/Components/Listing";
import useDataSource from "@/Components/useDataSource";
import { AppBarHeader, ContentScroll } from "@/Layout";
import { IListingPageProps, Item, Paginated, findTitle } from "@/Models";

interface IProps extends IListingPageProps {
    items: Paginated<Item<"activityreport_congress">>;
}
const WorldCongressReports: React.FC<IProps> = ({ items }) => {
    const dataSource = useDataSource({
        mode: "inertia",
        paginatedData: items,
    });

    const columns = useMemo(
        () =>
            [
                {
                    field: "id",
                    renderCell: (cell) => (
                        <>
                            {cell.row.id}{" "}
                            <PublishStatusIcon item={cell.row as Item} />
                        </>
                    ),
                },
                {
                    field: "years",
                    headerName: "Years",
                    valueGetter: ({ row }) =>
                        `${row.activity_report_congress?.year_from || "?"} - ${
                            row.activity_report_congress?.year_to || "?"
                        }`,
                },
                {
                    field: "title",
                    headerName: "Title",
                    renderCell: (cell) => (
                        <InertiaLink
                            href={route("admin.items.edit", {
                                id: cell.row.id,
                            }).toString()}
                        >
                            {findTitle(cell.row as Item) || "- no title -"}
                        </InertiaLink>
                    ),
                    flex: 2,
                },
            ] satisfies GridColDef<Item<"activityreport_congress">>[],
        []
    );

    const onCreate = () => {
        // ToDo maybe ask for years here already?
        Inertia.post(route("admin.items.store"), {
            type: "activityreport_congress",
            languages: [],
        });
    };

    return (
        <>
            <AppBarHeader title="Reports to World Congress">
                <IconButton onClick={onCreate} disabled={false} size="large">
                    <AddIcon />
                </IconButton>
            </AppBarHeader>
            <ContentScroll>
                <Listing columns={columns} dataSource={dataSource} />
            </ContentScroll>
        </>
    );
};

export default WorldCongressReports;
