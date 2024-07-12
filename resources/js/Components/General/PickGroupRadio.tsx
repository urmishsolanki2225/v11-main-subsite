import React, { PropsWithChildren, useState } from "react";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { Collection, findTitle } from "../../Models";
import useDataSource from "../useDataSource";

import { AutocompleteDataSourceProps } from "./Autocomplete.types";

interface IProps<T> {
    label: string;
    dataSource: AutocompleteDataSourceProps<T>;
    onChange: (values: T[]) => void;
    showReset?: boolean;
}
const PickGroupRadio = <T extends Collection>({
    label,
    dataSource,
    onChange,
    showReset,
}: PropsWithChildren<IProps<T>>) => {
    const [id, setId] = useState("");
    const { paginatedData } = useDataSource<T>({
        pageSize: 42,
        ...dataSource,
        mode: "xhr",
    });

    const handleChange = (newId: string) => {
        setId(newId);
        const collection = paginatedData!.data.find(
            (collection) => `${collection.id}` === newId
        );
        onChange(collection ? [collection] : []);
    };

    return (
        <FormControl variant="outlined" fullWidth>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
                row
                value={id}
                onChange={(e) => handleChange(e.target.value)}
            >
                {paginatedData?.data.map((collection) => (
                    <FormControlLabel
                        key={collection.id}
                        value={`${collection?.id || ""}`}
                        label={findTitle(collection) || "-untitled-"}
                        control={<Radio />}
                    ></FormControlLabel>
                ))}
                {showReset && (
                    <Button onClick={() => handleChange("")} disabled={!id}>
                        clear
                    </Button>
                )}
            </RadioGroup>
        </FormControl>
    );
};

export default PickGroupRadio;
