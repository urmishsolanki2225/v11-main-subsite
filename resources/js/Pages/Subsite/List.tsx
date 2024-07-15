import React, { useEffect, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import route from "ziggy-js";
import Listing from "../../Components/Listing";
import useDataSource from "../../Components/useDataSource";
import AppBarHeader from "../../Layout/AppBarHeader";
import ContentScroll from "../../Layout/ContentScroll";
import { Subsite } from "../../Models";
import { AuthPageProps, IListingPageProps } from "../../Models/Inertia";
import Paginated from "../../Models/Paginated";
import { Button } from "@mui/material";
import Switch from '@mui/material/Switch';
import SubsiteItemList from "../../Components/SubsiteItemList";

interface IProps extends IListingPageProps, AuthPageProps {
    subsites: Paginated<Subsite>;
}
const List: React.FC<IProps> = ({ subsites, filter: _filter, sort,can }) => {
    const [search, setSearch] = useState<string>();
    const [filter, setFilter] = useState(_filter);
    const [regionId, setReginoId] = useState<any>();
    const dataSource = useDataSource({
        mode: "inertia",
        paginatedData: subsites,
        search,
        filter,
        sort,
    });
    const [message, setMessage] = useState("");

    const handleCallback = (childData : any) => {
        setMessage(childData);
    };
    function handleDelete(id: any) {
        Inertia.delete(route("admin.subsites.destroy", { id }), {
            preserveState: true,
        });
    }
    useEffect(() => {
        if (message == "success") {
            setReginoId('');
        }
      }, [message]);

    const handleModelClickOpen = (id: any) => {
        setReginoId(id);
    };

    const columns: GridColDef[] = [
        { field: "id", headerName: 'Id', align: "center", headerAlign:"center" },
        {
            headerName: 'Subsite Name',
            field: "name",
            renderCell: (cell) => (
                <InertiaLink
                    href={route("admin.subsites.edit", {
                        id: cell.row.id,
                    }).toString()}
                >
                    {(cell.row as Subsite).name ?? "- no name -"}
                </InertiaLink>
            ),
            flex: 2,
        },
        {
            headerName: 'Status',
            field: "is_active",
            flex: 1,
        },
        {
            headerName: 'Aliase Name',
            field: "aliase_name",
            flex: 1,
        },
        {
            field: "Subsite Items",
            sortable: false,
            renderCell: (cell) => (
                    <Button
                        size="small"
                        key = {cell.row.region_id}
                        variant="contained"
                        color="primary"
                        onClick={(evt) => {setMessage(""),handleModelClickOpen(cell.row.region_id)}}>
                        View Items
                    </Button>
            ),
            flex: 1,
        },
        {
            field: "Change Status",
            sortable: false,
            renderCell: (cell) => (
                <div>
                    <Switch
                        checked={cell.row.is_active == "active"}
                        onChange=
                        {
                            (evt) => {
                                evt.preventDefault();
                                handleDelete(cell.row.id)
                            }
                        }
                    />
                </div>
            ),
            flex: 1,
        },
    ];
    const onCreate = () => {
        Inertia.get(route("admin.subsites.create"));
    };
    useEffect(() => {
        setFilter(_filter);
    }, [_filter]);
    const title = "Subsites";
    return (
        <>
            <AppBarHeader
                title={title}
                filterOptions={[
                    {
                        label: "Hide in-active",
                        name: "is_active",
                        value: 'active',
                    },
                ]}
                filter={filter}
                onSearch={setSearch}
                onChangeFilter={setFilter}
            >
                <IconButton onClick={onCreate}>
                    <AddIcon />
                </IconButton>
            </AppBarHeader>

            {/* Added selectMode for removing the checkbox from listing */}
            <ContentScroll>
                <Listing columns={columns} dataSource={dataSource} selectMode="none" ></Listing>
            </ContentScroll>
            {regionId ? (
                <SubsiteItemList
                    region_id = {regionId}
                    can = {can}
                    parentCallback = {handleCallback}
                />
            ):(
                <></>
            )}
        </>
    );
};
export default List;
