import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

import { Item } from "../../Models";
import { findTitle } from "../../Models/Content";
import PublishStatusIcon from "../General/PublishStatusIcon";
import { RendererProps } from "../Sorter";

export const ItemSorterRenderer: React.FC<RendererProps<Item>> = ({
    item,
    dragHandle,
    removeHandle,
    children,
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                maxWidth: "100%",
                whiteSpace: "pre",
                alignItems: "baseline",
                borderRadius: 1,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "divider",
                paddingLeft: 0,
                paddingRight: 1,
                marginRight: 1,
                marginBottom: 1,
                "&:hover": {
                    backgroundColor: "#eee",
                },
            }}
        >
            {dragHandle}
            <Typography
                variant="body1"
                component="span"
                sx={{
                    flexGrow: 2,
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                }}
            >
                {(children ? children : findTitle(item)) || "-untitled-"}
            </Typography>
            {<PublishStatusIcon item={item} />}
            <Typography
                variant="caption"
                component="span"
                sx={{
                    flexBasis: "5%",
                    flexShrink: 0,
                    ml: 0.5,
                }}
            >
                {item.id}
            </Typography>
            <Typography
                variant="caption"
                component="span"
                sx={{
                    flexBasis: "5%",
                    flexShrink: 0,
                    ml: 0.5,
                }}
            >
                {dayjs(item.publish_at).format("YYYY-MM-DD")}
            </Typography>
            <Typography
                variant="caption"
                component="span"
                sx={{
                    flexBasis: "10%",
                    flexShrink: 0,
                    ml: 0.5,
                }}
            >
                {item.subtype || item.type}
            </Typography>
            {removeHandle}
        </Box>
    );
};

export default ItemSorterRenderer;

// export const CollectionLinkSorterRenderer: React.FC<
//     RendererProps<Collection>
// > = (props) => {
//     const collection = props.item;
//     return (
//         <CollectionSorterRenderer {...props}>
//             <LinkQuery
//                 toRoute="admin.collections.edit"
//                 query={{ id: collection.id }}
//             >
//                 {findTitle(collection) || "-untitled-"}
//             </LinkQuery>
//         </CollectionSorterRenderer>
//     );
// };
