import React, { ReactNode } from "react";

import { AutocompleteRenderGetTagProps } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Collection, findTitle, isItem, Item } from "../../Models";
import Sorter from "../Sorter";
import ItemSorterRenderer from "../Sorter/ItemSorterRenderer";

import {
    FGetOptionLabel,
    FGroupByOption,
    FRenderOption,
    NamedOption,
    TitledOption,
} from "./Autocomplete.types";

export const getContentTitleOptionLabel = (val: Item | Collection) => {
    if (isItem(val)) {
        return `${findTitle(val) || "-untitled-"}${
            val.affiliate?.acronym ? ` – ${val.affiliate.acronym}` : ""
        }${
            val.affiliate?.country_code
                ? ` (${val.affiliate.country_code})`
                : ""
        }`;
    } else {
        return `${findTitle(val) || "-untitled-"}`;
    }
};

export const getNamedOptionLabel: FGetOptionLabel<NamedOption> = ({ name }) =>
    name;
export const getTitledOptionLabel: FGetOptionLabel<TitledOption> = ({
    title,
}) => title;

export const renderContentOption: FRenderOption<Item | Collection> = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option
) => {
    return (
        <li {...props} key={option.id}>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    whiteSpace: "pre",
                    alignItems: "baseline",
                    borderRadius: 1,
                    borderStyle: "solid",
                    borderWidth: 0,
                    borderColor: "divider",
                    paddingLeft: 0,
                }}
            >
                <Typography
                    variant="body1"
                    component="span"
                    sx={{ flexGrow: 0 }}
                >
                    {findTitle(option) || "-untitled-"}
                </Typography>
                <Typography
                    variant="caption"
                    component="span"
                    sx={{ flexShrink: 0, marginLeft: 0.5 }}
                >
                    {option.type}
                </Typography>
                {!isItem(option) ? (
                    <Typography
                        variant="body1"
                        component="span"
                        sx={{
                            flexGrow: 1,
                            textAlign: "end",
                            flexShrink: 0,
                            alignSelf: "flex-end",
                        }}
                    >
                        #{option.items_count}
                    </Typography>
                ) : undefined}
            </Box>
        </li>
    );
};

export const renderTagsSortable = (
    values: Item[],
    getTagProps: AutocompleteRenderGetTagProps,
    onReorder: (values: Item[]) => void
): ReactNode => {
    return (
        <div>
            <Sorter
                items={values}
                Renderer={ItemSorterRenderer}
                onChange={onReorder}
                variant="row"
            />
        </div>
    );
};

export const groupByParentCollection: FGroupByOption<Collection> = (
    collection
) => {
    if (collection.sub_collections?.length) {
        // I have subcollections, use own title as group
        return findTitle(collection) || "?";
    }
    if (collection.parent_collections?.length) {
        return findTitle(collection.parent_collections[0]) || "??";
    }
    return "???";
};
