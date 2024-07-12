import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";

import { findContent } from "../../Models";
import Item from "../../Models/Item";
import ImageCard from "../General/ImageCard";
import { IDataSource } from "../useDataSource";

interface IProps {
    dataSource: IDataSource<Item>;
    onSelect: (item: Item) => void;
    onCancel: () => void;
}
export const ImagePicker: React.FC<IProps> = ({
    dataSource,
    onCancel,
    onSelect,
}) => {
    const theme = useTheme();
    const { setPage, paginatedData } = dataSource;
    const [selectedItem, setSelectedItem] = useState<Item>();

    if (!paginatedData?.data?.length) {
        return <>- no images found -</>;
    }
    return (
        <>
            <Grid container spacing={1} pb={4.5}>
                {paginatedData.data.map((item, idx) => (
                    <Grid
                        key={idx}
                        item
                        xs={2}
                        onClick={() =>
                            setSelectedItem((selectedItem) =>
                                item === selectedItem ? undefined : item
                            )
                        }
                    >
                        <ImageCard image={item} imageOnly />
                    </Grid>
                ))}
            </Grid>
            {selectedItem && (
                <Paper
                    sx={{
                        position: "absolute",
                        padding: 2,
                        top: "10%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "50%",
                        maxWidth: 400,
                        zIndex: theme.zIndex.appBar + 10,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                    }}
                    elevation={5}
                    onClick={() => setSelectedItem(undefined)}
                >
                    <Typography variant="body1" fontWeight="bold">
                        {selectedItem.contents.at(0)?.title || "?"}
                    </Typography>
                    <ImageCard image={selectedItem} imageOnly />
                    <Box>
                        <Typography>type: {selectedItem.subtype}</Typography>
                        <Typography>
                            caption:{" "}
                            {findContent(selectedItem)?.subtitle ?? "-none-"}
                        </Typography>
                        <Typography>
                            languages:{" "}
                            {selectedItem.contents
                                .map(({ lang }) => lang)
                                .join(", ")}
                        </Typography>
                    </Box>
                    <Button
                        color="primary"
                        onClick={() => onSelect(selectedItem!)}
                        variant="contained"
                    >
                        Select
                    </Button>
                </Paper>
            )}
            <Box
                sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "background.default",
                }}
                display="flex"
                justifyContent="space-between"
            >
                <TablePagination
                    component="div"
                    count={paginatedData.total}
                    rowsPerPage={paginatedData.per_page}
                    page={paginatedData.current_page - 1}
                    onPageChange={(evt, newPage) => setPage(newPage + 1)}
                    rowsPerPageOptions={[]}
                />
                <Box display="flex" alignItems="center">
                    <Button
                        color="primary"
                        variant="text"
                        onClick={() => onCancel && onCancel()}
                        sx={{ mr: 2 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        disabled={!selectedItem}
                        onClick={() => onSelect(selectedItem!)}
                        variant="contained"
                        sx={{ mr: 2 }}
                    >
                        Select
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default ImagePicker;
