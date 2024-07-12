import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Collection from "../../Models/Collection";
import LinkQuery from "../General/LinkQuery";
import PublishStatusIcon from "../General/PublishStatusIcon";
import { RendererProps } from "../Sorter";

import { getTitleWithParent } from "./CollectionSorterRenderer.functions";

export const CollectionSorterRenderer: React.FC<RendererProps<Collection>> = ({
    item: collection,
    dragHandle,
    removeHandle,
    children,
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                whiteSpace: "pre",
                alignItems: "baseline",
                borderRadius: 1,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "divider",
                paddingLeft: dragHandle ? 0 : 1,
                paddingRight: 1,
                margin: 0.5,
            }}
        >
            {dragHandle}
            <Typography variant="body1" component="span" sx={{ flexGrow: 2 }}>
                {(children ? children : getTitleWithParent(collection)) ||
                    "-untitled-"}
            </Typography>
            {<PublishStatusIcon item={collection} />}
            <Typography
                variant="caption"
                component="span"
                sx={{
                    flexBasis: "10%",
                    flexShrink: 0,
                    marginLeft: 0.5,
                }}
            >
                {collection.type}
            </Typography>
            {removeHandle}
        </Box>
    );
};

export const CollectionLinkSorterRenderer: React.FC<
    RendererProps<Collection>
> = (props) => {
    const collection = props.item;
    return (
        <CollectionSorterRenderer {...props}>
            <LinkQuery
                toRoute="admin.collections.edit"
                query={{ id: collection.id }}
            >
                {getTitleWithParent(collection) || "-untitled-"}
            </LinkQuery>
        </CollectionSorterRenderer>
    );
};

export default CollectionSorterRenderer;
