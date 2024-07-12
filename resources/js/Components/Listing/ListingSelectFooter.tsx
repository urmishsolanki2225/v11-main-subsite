import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
    GridFooterContainerProps,
    selectedGridRowsCountSelector,
    useGridSelector,
    useGridRootProps,
    useGridApiContext,
} from "@mui/x-data-grid";

import { useListingContext } from "./ListingContext";

const ListingSelectFooter: React.FC<GridFooterContainerProps> = () => {
    const { onCancel, onSelect } = useListingContext();
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();
    const selectedRowCount = useGridSelector(
        apiRef,
        selectedGridRowsCountSelector
    );
    const [enable, setEnable] = useState(false);

    const paginationElement = rootProps.pagination &&
        !rootProps.hideFooterPagination &&
        rootProps.components.Pagination && (
            <rootProps.components.Pagination
                {...rootProps.componentsProps?.pagination}
            />
        );

    const onClick = () => {
        const rows = apiRef?.current.getSelectedRows();
        if (rows?.size) {
            onSelect([...rows.values()][0]);
        }
    };

    useEffect(() => {
        setEnable(selectedRowCount > 0);
    }, [selectedRowCount]);

    return (
        <Box display="flex" justifyContent="space-between">
            {paginationElement}
            <Box display="flex" alignItems="center" mr={1}>
                <Button
                    color="primary"
                    variant="text"
                    onClick={() => onCancel && onCancel()}
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    disabled={!enable}
                    onClick={onClick}
                    variant="contained"
                >
                    Select
                </Button>
            </Box>
        </Box>
    );
};

export default ListingSelectFooter;
