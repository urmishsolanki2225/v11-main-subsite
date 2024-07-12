import React, { useEffect, useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import {
    useCurrentRefinements,
    useRefinementList,
    UseRefinementListProps,
} from "react-instantsearch-hooks-web";

interface IProps {
    attribute: string;
    label: string;
    placeholder?: string;
    refinementListProps?: Omit<UseRefinementListProps, "attribute">;
}
export const MultiFilter: React.FC<IProps> = ({
    attribute,
    label,
    placeholder,
    refinementListProps,
}) => {
    const { items, refine, searchForItems } = useRefinementList({
        attribute,
        sortBy: ["count:desc", "name:asc"],
        limit: 25,
        ...refinementListProps,
    });
    const { items: currentItems } = useCurrentRefinements({
        includedAttributes: [attribute],
    });
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        searchForItems(inputValue);
    }, [inputValue, searchForItems]);

    const onSelect = (option: null | (typeof items)[number]) => {
        if (option) {
            setInputValue("");
            refine(option.value);
        }
    };

    return (
        <>
            <Autocomplete
                options={items}
                value={null}
                onChange={(evt, option) => onSelect(option)}
                inputValue={inputValue}
                onInputChange={(evt, value) => setInputValue(value)}
                renderInput={(params) => (
                    <TextField
                        variant="filled"
                        {...params}
                        label={label}
                        placeholder={placeholder}
                        InputLabelProps={{ shrink: true }}
                    />
                )}
                getOptionDisabled={({ isRefined }) => isRefined}
                renderOption={(props, option) => (
                    <li {...props}>
                        {option.label} ({option.count})
                    </li>
                )}
                filterOptions={(x) => x}
            />
            <div>
                {currentItems.map(({ refinements, refine }) => (
                    <>
                        {refinements.map((refinement) => (
                            <Chip
                                key={refinement.value}
                                label={refinement.label}
                                onDelete={() => refine(refinement)}
                            />
                        ))}
                    </>
                ))}
            </div>
        </>
    );
};
