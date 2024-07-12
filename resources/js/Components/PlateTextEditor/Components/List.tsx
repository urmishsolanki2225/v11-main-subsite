import React from "react";

import { PlatePluginComponent } from "@udecode/plate";

export const UnorderedListComponent: PlatePluginComponent = ({
    children,
    attributes,
    className,
}) => {
    return (
        <ul
            {...attributes}
            className={className}
            style={{ listStyleType: "disc", paddingInlineStart: "1.5em" }}
        >
            {children}
        </ul>
    );
};

export const OrderedListComponent: PlatePluginComponent = ({
    children,
    attributes,
    className,
}) => {
    return (
        <ol
            {...attributes}
            className={className}
            style={{ listStyleType: "decimal", paddingInlineStart: "1.5em" }}
        >
            {children}
        </ol>
    );
};

export const ListItemComponent: PlatePluginComponent = ({
    children,
    attributes,
    className,
}) => {
    return (
        <li {...attributes} className={className}>
            {children}
        </li>
    );
};
