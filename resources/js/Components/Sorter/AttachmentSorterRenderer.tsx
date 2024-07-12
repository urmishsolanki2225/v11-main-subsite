import React from "react";

import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { Attachment } from "../../Models/Attachment";
import { findTitle } from "../../Models/Content";
import { goEditItem } from "../../Utils/Links";
import ResourceDetail from "../Resources/ResourceDetail";
import { RendererProps } from "../Sorter";

export const AttachmentSorterRenderer: React.FC<RendererProps<Attachment>> = ({
    item: attachment,
    dragHandle,
    removeHandle,
}) => {
    const isResourceItem = attachment.item.type === "resource";

    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                borderBottomStyle: "solid",
                borderBottomWidth: 1,
                borderColor: "divider",
                paddingBottom: 0.5,
                paddingTop: 0.5,
                "&:first-child": {
                    borderTopWidth: 1,
                    borderTopStyle: "solid",
                },
            }}
        >
            {dragHandle}
            <Typography
                variant="body1"
                sx={{
                    flexBasis: "25%",
                    flexShrink: 0,
                    flexGrow: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "pre",
                }}
            >
                {findTitle(attachment.item) ??
                    attachment.item.contents[0].title ??
                    "-untitled-"}
            </Typography>
            <Box>
                {attachment.item.contents?.map(({ lang }) => lang).join(",")}
            </Box>
            <IconButton
                size="small"
                onClick={() => {
                    goEditItem(attachment.item.id);
                }}
                color="secondary"
            >
                <EditIcon sx={{ fontSize: "1rem" }} />
            </IconButton>
            {isResourceItem && (
                <Box
                    sx={{
                        flexBasis: "25%",
                        flexShrink: 0,
                        flexGrow: 2,
                        overflow: "hidden",
                        marginLeft: 1,
                        marginRight: 1,
                    }}
                >
                    <ResourceDetail item={attachment.item} />
                </Box>
            )}
            <Typography
                variant="caption"
                sx={{ flexBasis: "8%", flexShrink: 0 }}
            >
                {attachment.item.subtype
                    ? attachment.item.subtype
                    : attachment.item.type}
            </Typography>
            {removeHandle}
        </Box>
    );
};

export default AttachmentSorterRenderer;
