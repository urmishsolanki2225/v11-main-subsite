import { ReactNode } from "react";

import {
    AutocompleteRenderGetTagProps,
    AutocompleteRenderOptionState,
} from "@mui/material/Autocomplete";

import { IDataSourceProps } from "../useDataSource";

export type Autocompletable = { id: number; type: string };

export type NamedOption = Autocompletable & {
    name: string;
};
export type TitledOption = Autocompletable & {
    title: string;
};

export type FGetOptionLabel<T> = (val: T) => string;

export type FRenderTagsSortable<T> = (
    values: T[],
    getTagProps: AutocompleteRenderGetTagProps,
    onReorder: (values: T[]) => void
) => ReactNode;

export type FRenderOption<T> = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T,
    state: AutocompleteRenderOptionState
) => ReactNode;

export type FGroupByOption<T> = (option: T) => string;

export type AutocompleteDataSourceProps<T> = Omit<IDataSourceProps<T>, "mode">;
