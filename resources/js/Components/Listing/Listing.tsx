import React, { PropsWithChildren } from "react";

import {
    DataGrid,
    GridColDef,
    GridRowId,
    GridSortModel,
} from "@mui/x-data-grid";

import { IDataSource } from "../useDataSource";

import ListingSelectFooter from "./ListingSelectFooter";
import MultiSelectActionsFooter from "./MultiSelectActionsFooter";

interface IDable {
    id: GridRowId;
}

export type ListingMultiSelectActionHandler<T extends IDable> = (
    selectedIds: T["id"][]
) => void;
export interface ListingMultiSelectActionProps<T extends IDable> {
    actions: {
        identifier: string;
        label: string;
        onAction: ListingMultiSelectActionHandler<T>;
    }[];
}

interface IProps<T extends IDable> {
    columns: GridColDef[];
    dataSource: IDataSource<T>;
    // Added by Cyblance for Annual-Reports section start
    selectMode?: "single" | "multiple" | "none";
    // Added by Cyblance for Annual-Reports section end
    multiSelectActions?: ListingMultiSelectActionProps<T>;
    //Added By Cyblance for delete functionality start
    getRowId?: (arg: { id: T["id"][] }) => void;
    //Added By Cyblance for delete functionality end
}
const Listing = <T extends IDable>({
    columns,
    dataSource,
    selectMode = "multiple",
    multiSelectActions,
    getRowId,
}: PropsWithChildren<IProps<T>>) => {
    const { paginatedData, page, setSort, setPage, loading } = dataSource;

    const _onPageChange = (page: number) => {
        setPage(page + 1);
    };

    const _onSortModelChange = (model: GridSortModel) => {
        if (model.length) {
            setSort(`${model[0].sort === "desc" ? "-" : ""}${model[0].field}`);
        } else {
            setSort();
        }
    };

    return (
        <DataGrid
            columns={columns}
            rows={paginatedData?.data || []}
            page={page ? page - 1 : 0}
            pageSize={paginatedData?.per_page}
            pagination
            paginationMode="server"
            sortingMode="server"
            rowsPerPageOptions={[paginatedData?.per_page || 16]}
            rowCount={paginatedData?.total}
            checkboxSelection={selectMode === "multiple"}
            disableColumnSelector={true}
            disableColumnMenu={true}
            onPageChange={_onPageChange}
            onSortModelChange={_onSortModelChange}
            hideFooterSelectedRowCount={selectMode === "single"}
            onSelectionModelChange={(newSelection) => {
                getRowId && getRowId({ ["id"]: newSelection });
            }}
            components={
                selectMode === "multiple"
                    ? multiSelectActions
                        ? {
                              Footer: MultiSelectActionsFooter,
                          }
                        : {}
                    : selectMode === "single"
                    ? {
                          Footer: ListingSelectFooter,
                      }
                    : {}
            }
            componentsProps={
                selectMode === "multiple" && multiSelectActions
                    ? { footer: multiSelectActions }
                    : {}
            }
            loading={loading}
        />
    );
};

export default Listing;
