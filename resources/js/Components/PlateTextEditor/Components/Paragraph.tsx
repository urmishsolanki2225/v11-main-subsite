import React from "react";

import { PlatePluginComponent } from "@udecode/plate";

export const ParagraphComponent: PlatePluginComponent = ({
    children,
    attributes,
    className,
}) => {
    return (
        <p {...attributes} className={className}>
            {children}
        </p>
    );
};
