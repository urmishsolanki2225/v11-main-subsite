import React from "react";

import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import route from "ziggy-js";

export type Basic = string | number;
export interface QueryParams {
    [key: string]: Basic | undefined | QueryParams;
}
export interface FlatQueryParams {
    [key: string | number | symbol]: Basic;
}
function isBasic(params: Basic | QueryParams): params is Basic {
    return typeof params !== "object";
}
export const flatten = (query?: QueryParams) => {
    if (!query) {
        return {};
    }
    const result: FlatQueryParams = {};
    for (const key in query) {
        if (query[key] === undefined) {
            result[key] = "";
        } else if (isBasic(query[key]!)) {
            result[key] = query[key] as Basic;
        } else {
            const flatParams = query[key] as FlatQueryParams;
            for (const subKey in flatParams) {
                result[`${key}[${subKey}]`] = flatParams[subKey];
            }
        }
    }
    return result;
};

export const get = (toRoute: string, query?: QueryParams, options = {}) => {
    Inertia.get(route(toRoute, flatten(query)).toString(), options);
};

interface IProps {
    toRoute: string;
    query?: QueryParams;
    color?: "primary" | "secondary" | "inherit";
    children?: React.ReactNode;
}
export const LinkQuery: React.FC<IProps> = ({
    children,
    toRoute,
    query,
    color = "primary",
}) => {
    return (
        <Link
            component={InertiaLink}
            href={route(toRoute, flatten(query)).toString()}
            sx={{
                color: "inherit",
                textDecoration: "none",
                "& :hover": {
                    textDecoration: "underline",
                },
            }}
        >
            <Typography component="span" color={color}>
                {children}
            </Typography>
        </Link>
    );
};

export default LinkQuery;
