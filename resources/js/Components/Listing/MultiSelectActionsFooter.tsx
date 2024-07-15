import React, { PropsWithChildren, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
    GridFooterContainerProps,
    selectedGridRowsCountSelector,
    useGridSelector,
    useGridRootProps,
    useGridApiContext,
    GridRowId,
} from "@mui/x-data-grid";

import { Confirm } from "../General/Confirm";

import {
    ListingMultiSelectActionHandler,
    ListingMultiSelectActionProps,
} from "./Listing";
//Added by Cyblance for Subsite section start
import { CircularProgress, Stack } from "@mui/material";
const MultiSelectActionsFooter = <T extends { id: GridRowId }>({
    actions, mainsite
    //Added by Cyblance for Subsite section end
}: PropsWithChildren<
    GridFooterContainerProps & ListingMultiSelectActionProps<T>
>) => {
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

    const onClickAction = (onAction: ListingMultiSelectActionHandler<T>) => {
        const rows = apiRef?.current.getSelectedRows();
        if (rows?.size) {
            onAction([...rows.keys()]);
        }
    };

    useEffect(() => {
        setEnable(selectedRowCount > 0);
    }, [selectedRowCount]);

    return (
        <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={2} px={2}>
                {selectedRowCount === 1 ? "1 row" : `${selectedRowCount} rows`}{" "}
                selected
                {actions.map(({ identifier, label, onAction }) => (
                    <Confirm
                        key={identifier}
                        onConfirm={() => onClickAction(onAction)}
                    >
                        <Button variant="contained" disabled={!enable}>
                            {label}
                        </Button>
                    </Confirm>
                ))}
                {/*Added by Cyblance for Subsite section start*/}
                {
                    mainsite?.map(({ identifier, label, onAction, loader }) => (
                        <Stack key={identifier} spacing={2} direction="row">
                            <Confirm
                                confirmText="Do you want to copy items into mainsite?"
                                key={identifier}
                                onConfirm={() => onClickAction(onAction)}
                            >
                                <Button variant="contained" disabled={!enable}>
                                    {label}
                                </Button>
                            </Confirm>
                            {loader ?
                                <CircularProgress size={35} thickness={5} />
                                :
                                null
                            }
                        </Stack>
                    ))
                }
                {/*Added by Cyblance for Subsite section end*/}
            </Box>
            {paginationElement}
        </Box>
    );
};

export default MultiSelectActionsFooter;
