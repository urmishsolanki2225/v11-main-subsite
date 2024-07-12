import React, { PropsWithChildren, useEffect, useState } from "react";

import BaseAutocomplete, {
    AutocompleteProps,
} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import useDataSource from "../useDataSource";

import {
    Autocompletable,
    AutocompleteDataSourceProps,
    FGetOptionLabel,
    FGroupByOption,
    FRenderOption,
    FRenderTagsSortable,
} from "./Autocomplete.types";

interface IProps<T> {
    values?: T[];
    multiple?: boolean;
    label: string;
    dataSource: AutocompleteDataSourceProps<T>;
    enableOrdering?: boolean;
    autocompleteProps?: Partial<AutocompleteProps<T, true, false, false>>;
    onChange: (values: T[]) => void;
    getOptionLabel: FGetOptionLabel<T>;
    renderOption?: FRenderOption<T>;
    renderTagsSortable?: FRenderTagsSortable<T>;
    groupBy?: FGroupByOption<T>;
    onlyChildTypes?: boolean;
}
const Autocomplete = <T extends Autocompletable>({
    values,
    label,
    dataSource,
    enableOrdering = false,
    autocompleteProps,
    onChange,
    getOptionLabel,
    renderOption,
    renderTagsSortable,
    groupBy,
    onlyChildTypes,
}: PropsWithChildren<IProps<T>>) => {
    const [inputValue, setInputValue] = useState<string>();
    const [options, setOptions] = useState<T[]>([]);

    const { paginatedData, childTypes } = useDataSource<T>({
        pageSize: 42,
        ...dataSource,
        mode: "xhr",
        search: inputValue,
    });

    useEffect(() => {
        if (!paginatedData || !paginatedData.data.length) {
            setOptions([]);
            return;
        }
        let opts = [...paginatedData.data];
        if (groupBy) {
            // opts.sort((a, b) => {
            //     const groupA = groupBy(a);
            //     const groupB = groupBy(b);
            //     if (groupA === groupB) {
            //         return opts.indexOf(a) - opts.indexOf(b);
            //     }
            //     return groupA.localeCompare(groupB);
            // });
        }
        if (onlyChildTypes) {
            opts = opts.filter(({ type }) => childTypes?.includes(type));
        }
        setOptions(opts);
    }, [paginatedData, groupBy, onlyChildTypes, childTypes]);

    return (
        <BaseAutocomplete<T, true, false, false>
            multiple
            // freeSolo
            value={(values || []) as any}
            options={options}
            filterOptions={(x) => x}
            onChange={(_evt, vals) =>
                onChange(vals.filter((val) => typeof val !== "string") as T[])
            }
            getOptionLabel={(option: string | T) =>
                typeof option === "string" ? option : getOptionLabel(option)
            }
            onInputChange={(_event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
            )}
            renderOption={(props, opt, state) =>
                renderOption ? (
                    renderOption(props, opt, state)
                ) : (
                    <li {...props} key={opt.id}>
                        {getOptionLabel(opt)}
                    </li>
                )
            }
            isOptionEqualToValue={({ id: optId }, { id: valId }) =>
                optId === valId
            }
            renderTags={
                enableOrdering
                    ? (values, getTagProps) =>
                          renderTagsSortable
                              ? renderTagsSortable(
                                    values,
                                    getTagProps,
                                    (ordered) =>
                                        console.warn("ToDo reordered", ordered)
                                )
                              : undefined
                    : undefined
            }
            groupBy={groupBy}
            {...autocompleteProps}
        />
    );
};

export default Autocomplete;
