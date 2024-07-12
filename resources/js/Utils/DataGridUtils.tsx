import React from "react";

import {
    GridColDef,
    GridValueFormatterParams,
    GridCellParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";

import { Collection, Content, Item, Annualreport } from "../Models";

export const makeDateColumn = (field: string, header?: string): GridColDef => ({
    field,
    headerName: header,
    // Added by Cyblance for Annual-Reports section end
    flex: 1,
    valueFormatter: (params: GridValueFormatterParams) =>
        dayjs(params.value as string).format("YYYY-MM-DD HH:mm"),
});

export const LangColumn: GridColDef = {
    field: "lang",
    sortable: false,
    renderCell: (params: GridCellParams) => (
        <>
            {/* Added by Cyblance for Annual-Reports section start */}
            {(params.row as Item | Collection | Annualreport).contents
                .map((content: Content) => content.lang)
                .join(",")}
            {/* Added by Cyblance for Annual-Reports section end */}
        </>
    ),
};
