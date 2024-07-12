import React from "react";

import { PlateRenderElementProps } from "@udecode/plate";

export const DefaultComponent: React.FC<PlateRenderElementProps> = ({
    children,
    attributes,
    className,
}) => {
    return (
        <div {...attributes} className={className}>
            {children}
        </div>
    );
};
