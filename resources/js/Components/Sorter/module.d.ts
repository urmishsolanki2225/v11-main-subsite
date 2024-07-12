import React from "react";

import { ReactSortableProps as BaseReactSortableProps } from "react-sortablejs";

declare module "react-sortablejs" {
    interface ReactSortableProps<T> extends BaseReactSortableProps<T> {
        children?: React.ReactNode;
    }
}
