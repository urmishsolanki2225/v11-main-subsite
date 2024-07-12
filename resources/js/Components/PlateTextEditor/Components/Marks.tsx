import React from "react";

import { PlatePluginComponent } from "@udecode/plate";

export const BoldComponent: PlatePluginComponent = ({
    attributes,
    className,
    children,
}) => {
    return (
        <strong {...attributes} className={className}>
            {children}
        </strong>
    );
};

export const ItalicComponent: PlatePluginComponent = ({
    attributes,
    className,
    children,
}) => {
    return (
        <em {...attributes} className={className}>
            {children}
        </em>
    );
};
