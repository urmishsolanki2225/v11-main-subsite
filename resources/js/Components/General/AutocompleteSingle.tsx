import React, {
    PropsWithChildren,
    Ref,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";

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
} from "./Autocomplete.types";

export interface AutocompleteControlRef {
    reset: () => void;
}

interface IProps<T> {
    value: T | null;
    label: string;
    dataSource: AutocompleteDataSourceProps<T>;
    autocompleteProps?: Partial<AutocompleteProps<T, false, false, false>>;
    onChange: (value: T | null) => void;
    getOptionLabel: FGetOptionLabel<T>;
    renderOption?: FRenderOption<T>;
    groupBy?: FGroupByOption<T>;
    controlRef?: Ref<AutocompleteControlRef>;
}
const AutocompleteSingle = <T extends Autocompletable>({
    value,
    label,
    dataSource,
    autocompleteProps,
    onChange,
    getOptionLabel,
    renderOption,
    groupBy,
    controlRef,
}: PropsWithChildren<IProps<T>>) => {
    const [inputValue, setInputValue] = useState<string>();
    const [options, setOptions] = useState<T[]>([]);

    const { paginatedData } = useDataSource<T>({
        pageSize: 42,
        ...dataSource,
        mode: "xhr",
        search: inputValue,
    });

    useImperativeHandle(controlRef, () => ({
        reset: () => {
            setInputValue("");
            setOptions([]);
        },
    }));

    useEffect(() => {
        if (!paginatedData?.data?.length) {
            setOptions([]);
            return;
        }
        const opts = [...paginatedData.data];
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

        setOptions(opts);
    }, [paginatedData, groupBy]);

    return (
        <BaseAutocomplete
            value={value}
            options={options}
            filterOptions={(x) => x}
            onChange={(_evt, value) => onChange(value)}
            getOptionLabel={getOptionLabel}
            // inputValue={inputValue || ""}
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
            noOptionsText={`Start typing to search...`}
            groupBy={groupBy}
            {...autocompleteProps}
        />
    );
};

export default AutocompleteSingle;
