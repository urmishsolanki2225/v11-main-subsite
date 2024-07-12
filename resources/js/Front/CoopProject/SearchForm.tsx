import React, { useMemo, useState } from "react";

import { Box } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import qs from "qs";
import { createRoot } from "react-dom/client";
import route from "ziggy-js";

import { Themed } from "../Themed";

type Option = { id: number; label: string };
type Filter = {
    label: string;
    name: string;
    options: Option[];
    submit_as?: string;
    group_by?: string;
    advanced?: boolean;
};

const SearchFormAutocomplete: React.FC<{
    filter: Filter;
    values: Option[];
    onChangeFilter: (name: Filter["name"], value: Option[]) => void;
}> = ({
    filter: { name, options, label, group_by },
    values,
    onChangeFilter,
}) => {
    const filterOptions = useMemo(
        () =>
            createFilterOptions<Option>(
                group_by
                    ? {
                          stringify: (option) =>
                              `${option.label} ${(option as any)[group_by]}`,
                      }
                    : {}
            ),
        [group_by]
    );

    return (
        <Autocomplete
            key={name}
            multiple
            value={values}
            onChange={(evt, value) => onChangeFilter(name, value)}
            options={options}
            groupBy={
                group_by ? (option) => (option as any)[group_by] : undefined
            }
            renderInput={(params) => (
                <TextField {...params} fullWidth label={label} />
            )}
            ChipProps={{ size: "small" }}
            filterOptions={filterOptions}
            disableClearable={values.length <= 1}
        />
    );
};

const CoopProjectSearchForm: React.FC<{
    filters: Filter[];
    translations: Record<string, string>;
}> = ({ filters, translations }) => {
    const [showAdvanced, setShowAdvanced] = useState(() => {
        const query = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        });
        if (query?.filter && typeof query.filter === "object") {
            for (const name in query.filter) {
                if (
                    (query.filter as any)[name] &&
                    filters.find(
                        (filter) =>
                            filter.name === name || filter.submit_as === name
                    )?.advanced
                ) {
                    return true;
                }
            }
        }
        return false;
    });
    const [filterValues, setFilterValues] = useState<
        Record<Filter["name"], Option[]>
    >(() => {
        const query = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        });
        const input = {} as any;
        if (query?.filter && typeof query.filter === "object") {
            for (const name in query.filter) {
                if (!(query.filter as any)[name]) {
                    continue;
                }
                const values = (query.filter as any)[name].split(",");
                for (const value of values) {
                    const filter = filters.find(
                        (filter) =>
                            filter.name === name ||
                            (filter.submit_as === name &&
                                filter.options.find(
                                    (option) => `${option.id}` === `${value}`
                                ))
                    );
                    if (filter) {
                        if (!input[filter.name]) {
                            input[filter.name] = [];
                        }
                        input[filter.name].push(
                            filter.options.find(
                                (option) => `${option.id}` === `${value}`
                            )
                        );
                    }
                }
            }
            return input;
        }
        return {};
    });

    // const [filterActive, setFilterActive] = useState(false);
    // useEffect(() => {
    //     setFilterActive(
    //         Boolean(
    //             Object.values(filterValues).find(
    //                 (options) => options.length > 0
    //             )
    //         )
    //     );
    // }, [filterValues]);

    const onChangeFilter = (name: Filter["name"], value: Option[]) => {
        setFilterValues((vals) => ({ ...vals, [name]: value }));
    };

    const onApplyFilters = () => {
        const query = { filter: {} } as any;
        for (const name in filterValues) {
            const val = filterValues[name].map(({ id }) => id).join(",");
            const submitAs = filters.find(
                (filter) => filter.name === name
            )?.submit_as;
            if (submitAs && val) {
                query.filter[submitAs] = query.filter[submitAs]
                    ? query.filter[submitAs] + "," + val
                    : val;
            } else if (val) {
                query.filter[name] = val;
            }
        }
        window.location.href = route("coop_projects.index", query);
        // window.location.search = qs.stringify(query);
    };

    const onRemoveFilters = () => {
        window.location.href = route("coop_projects.index");
    };

    return (
        <Themed>
            <Box className="dev_coop_filter_form_basic">
                {filters
                    .filter(({ advanced }) => !advanced)
                    .map((filter) => (
                        <SearchFormAutocomplete
                            key={filter.name}
                            filter={filter}
                            values={filterValues[filter.name] || []}
                            onChangeFilter={onChangeFilter}
                        />
                    ))}
            </Box>
            <Box
                className={`dev_coop_filter_form_advanced ${
                    showAdvanced ? "show_advanced" : ""
                }`}
            >
                {filters
                    .filter(({ advanced }) => advanced)
                    .map((filter) => (
                        <SearchFormAutocomplete
                            key={filter.name}
                            filter={filter}
                            values={filterValues[filter.name] || []}
                            onChangeFilter={onChangeFilter}
                        />
                    ))}
            </Box>
            <Box className="dev_coop_filter_form_buttons">
                <Button variant="contained" onClick={() => onApplyFilters()}>
                    {translations["Search"]}
                </Button>
                <Button
                    variant="text"
                    onClick={() => setShowAdvanced((show) => !show)}
                >
                    {showAdvanced
                        ? translations["Hide advanced filters"]
                        : translations["Show advanced filters"]}
                </Button>
                <Button
                    variant="text"
                    onClick={() => onRemoveFilters()}
                    // disabled={!filterActive}
                >
                    {translations["Show all projects"]}
                </Button>
            </Box>
        </Themed>
    );
};

export const setupForm = (
    filters: Filter[],
    translations: Record<string, string>
) => {
    const container = document.getElementById("form_root");
    const root = createRoot(container!); // createRoot(container!) if you use TypeScript
    root.render(
        <CoopProjectSearchForm filters={filters} translations={translations} />
    );
};

(window as any).setupForm = setupForm;
