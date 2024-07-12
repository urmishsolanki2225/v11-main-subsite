import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import EditIcon from "@mui/icons-material/Edit";
import WarningIcon from "@mui/icons-material/Warning";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { parse } from "csv-parse/sync";
import route from "ziggy-js";

import InputFile from "../../Components/General/InputFile";
import Section from "../../Components/Section";
import { AppBarHeader, ContentScroll } from "../../Layout";
import { Collection } from "../../Models";

const COLUMN_TYPES = ["country", "string", "number", "percentage"];
interface IColumn {
    index: number;
    type?: "country" | "string" | "number" | "percentage";
    ignore?: boolean;
    label_en: string;
    label_fr?: string;
    label_es?: string;
}

interface IValue {
    column_index: IColumn["index"];
    value: string | number;
}
interface CountryValues {
    country_id?: Collection["id"];
    country_label: string;
    values: IValue[];
}
interface IProps {
    countries: {
        id: number;
        name: string;
        country_code?: string;
    }[];
}
const Import: React.FC<IProps> = ({ countries: _countries }) => {
    // const { needSave, setNeedSave } = useAppContext();
    const [label, setLabel] = useState("");
    const [sourceLabel, setSourceLabel] = useState("");
    const [sourceLink, setSourceLink] = useState("");
    const [file, setFile] = useState<File>();
    const [rawData, setRawData] = useState<string[][]>([]);
    const [columns, setColumns] = useState<IColumn[]>([]);
    const [values, setValues] = useState<CountryValues[]>([]);
    const [showValues, setShowValues] = useState(false);

    useEffect(() => {
        const sample = `Country;Fossil Fuel Spending (% share GDP);Education spending (% share GDP);;
    Afghanistan;9,184069;2,59;;
    Aalbania;1,8504;3,3;;`;
        const data = parse(sample as string, {
            relax_column_count: true,
            delimiter: ";",
        }) as string[][];
        setRawData(data);
        setColumns(
            data.length
                ? data[0].map((str, index) => ({
                      index,
                      label_en: str,
                      label_es: str,
                      label_fr: str,
                      ignore: !str,
                      type:
                          str.toLowerCase() === "country"
                              ? "country"
                              : undefined,
                  }))
                : []
        );
    }, []);

    const readFile = useCallback(async (file: File, delimiter: string) => {
        console.log("readFile");
        const reader = new FileReader();
        setRawData([]);
        setColumns([]);
        setValues([]);
        reader.onloadend = () => {
            const data = parse(reader.result as string, {
                relax_column_count: true,
                delimiter,
            }) as string[][];
            setRawData(data);
            setColumns(
                data.length
                    ? data[0].map((str, index) => ({
                          index,
                          label_en: str,
                          label_es: str,
                          label_fr: str,
                          ignore: !str,
                          type:
                              str.toLowerCase() === "country"
                                  ? "country"
                                  : undefined,
                      }))
                    : []
            );
        };
        reader.readAsText(file);
        return () => {
            reader.onloadend = null;
        };
    }, []);

    useEffect(() => {
        if (file) {
            readFile(file, ";");
        }
    }, [file, readFile]);

    useEffect(() => {
        console.log("setValues");
        const cols = columns.filter(({ ignore, type }) => !ignore && type);
        if (!cols.find(({ type }) => type === "country")) {
            setValues([]);
            return;
        }
        const countries = _countries.map(({ id, name }) => ({
            id: Number(id),
            name: name.toLowerCase(),
        }));
        const countryColIdx = cols
            .filter(({ type }) => type === "country")
            .at(0)!.index;
        const values: CountryValues[] = rawData.slice(1).map((row) => {
            const country_id = cols
                .filter(({ type }) => type === "country")
                .map(({ index }) =>
                    countries.find(
                        ({ name }) =>
                            name === row.at(index)?.trim().toLowerCase()
                    )
                )
                .find((coll) => coll?.name)?.id;
            return {
                country_label: row[countryColIdx],
                country_id,
                values: cols
                    .filter(({ type }) => type !== "country")
                    .map(({ index, type }) => {
                        const value =
                            type === "number" || type === "percentage"
                                ? Number(row[index].replace(",", "."))
                                : row[index];
                        return {
                            column_index: index,
                            value: value,
                        };
                    }),
            };
        });
        // setValues(values);
        setValues((existing) => {
            return values.map((val, idx) => ({
                ...val,
                country_id: val.country_id
                    ? val.country_id
                    : existing.at(idx)?.country_id,
            }));
        });
    }, [_countries, columns, rawData]);

    const setColumn = (idx: number, column: IColumn) => {
        setColumns((columns) => {
            const nextColumns = [...columns];
            nextColumns[idx] = column;
            return nextColumns;
        });
    };

    const setCountryId = (idx: number, countryId: number) => {
        setValues((values) => {
            const nextValues = [...values];
            nextValues[idx] = { ...values[idx], country_id: countryId };
            return nextValues;
        });
    };

    const onSubmit = () => {
        const data = values
            .filter(({ country_id }) => !!country_id)
            .map(({ country_id, values }) => ({
                country_id: country_id!,
                values,
            }));
        const cols = columns
            .filter(({ ignore, type }) => !ignore && type && type !== "country")
            .map((column) => ({
                index: column.index,
                type: column.type,
                label_en: column.label_en,
                label_es: column.label_es!,
                label_fr: column.label_fr!,
            }));
        Inertia.post(route("admin.geodata.import.store"), {
            data: data as any,
            columns: cols as any,
            label,
            source_label: sourceLabel,
            source_link: sourceLink,
        });
    };

    return (
        <>
            <AppBarHeader title="Import Geo Data"></AppBarHeader>
            <ContentScroll>
                <Paper sx={{ m: 2, p: 2 }}>
                    Select the data file, it should be formatted as CSV with{" "}
                    <code>;</code> as column delimiter. The first row has to
                    contain the column names.
                    <InputFile
                        onChange={(evt) =>
                            setFile((evt.currentTarget.files || [])[0])
                        }
                    />
                </Paper>
                <Section title="Metadata" open>
                    <TextField
                        label="Data set label (internal)"
                        value={label}
                        onChange={(evt) => setLabel(evt.target.value)}
                    />
                    <TextField
                        label="Data set source label"
                        value={sourceLabel}
                        onChange={(evt) => setSourceLabel(evt.target.value)}
                    />
                    <TextField
                        label="Data set source link"
                        value={sourceLink}
                        onChange={(evt) => setSourceLink(evt.target.value)}
                    />
                </Section>
                {columns.length > 0 && (
                    <Section title="Columns" open>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>type</TableCell>
                                    <TableCell>include</TableCell>
                                    <TableCell>label EN</TableCell>
                                    <TableCell>label FR</TableCell>
                                    <TableCell>label ES</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {columns.map((column, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{idx}</TableCell>
                                        <TableCell>
                                            <Select
                                                value={column.type || ""}
                                                onChange={(evt) =>
                                                    setColumn(idx, {
                                                        ...column,
                                                        type: evt.target
                                                            .value as any,
                                                    })
                                                }
                                                fullWidth
                                                size="small"
                                                placeholder="Type"
                                                margin="none"
                                            >
                                                {COLUMN_TYPES.map((type) => (
                                                    <MenuItem
                                                        key={type}
                                                        value={type}
                                                    >
                                                        {type}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={!column.ignore}
                                                size="small"
                                                onChange={(evt, checked) =>
                                                    setColumn(idx, {
                                                        ...column,
                                                        ignore: !checked,
                                                    })
                                                }
                                            />
                                        </TableCell>
                                        {column.type === "country" ? (
                                            <TableCell colSpan={3}></TableCell>
                                        ) : (
                                            <>
                                                <TableCell>
                                                    <TextField
                                                        value={
                                                            column.label_en ||
                                                            ""
                                                        }
                                                        onChange={(evt) =>
                                                            setColumn(idx, {
                                                                ...column,
                                                                label_en:
                                                                    evt.target
                                                                        .value,
                                                            })
                                                        }
                                                        size="small"
                                                        margin="none"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        value={
                                                            column.label_fr ||
                                                            ""
                                                        }
                                                        onChange={(evt) =>
                                                            setColumn(idx, {
                                                                ...column,
                                                                label_fr:
                                                                    evt.target
                                                                        .value,
                                                            })
                                                        }
                                                        size="small"
                                                        margin="none"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        value={
                                                            column.label_es ||
                                                            ""
                                                        }
                                                        onChange={(evt) =>
                                                            setColumn(idx, {
                                                                ...column,
                                                                label_es:
                                                                    evt.target
                                                                        .value,
                                                            })
                                                        }
                                                        size="small"
                                                        margin="none"
                                                    />
                                                </TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Section>
                )}
                {values.length > 0 && (
                    <Section
                        title="Values"
                        open={showValues}
                        onOpen={setShowValues}
                    >
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Country</TableCell>
                                    {columns
                                        .filter(
                                            ({ ignore, type }) =>
                                                !ignore &&
                                                type &&
                                                type !== "country"
                                        )
                                        .map(({ index, label_en }) => (
                                            <TableCell key={index}>
                                                {label_en}
                                            </TableCell>
                                        ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {showValues &&
                                    values.map(
                                        (
                                            {
                                                country_label,
                                                country_id,
                                                values,
                                            },
                                            index
                                        ) => (
                                            <TableRow key={country_label}>
                                                <TableCell>
                                                    <PickCountry
                                                        country_id={country_id}
                                                        onChange={(id) =>
                                                            setCountryId(
                                                                index,
                                                                id
                                                            )
                                                        }
                                                        country_label={
                                                            country_label
                                                        }
                                                        countries={_countries}
                                                    />
                                                </TableCell>
                                                {values.map(
                                                    ({
                                                        column_index,
                                                        value,
                                                    }) => (
                                                        <TableCell
                                                            key={column_index}
                                                        >
                                                            {value}
                                                        </TableCell>
                                                    )
                                                )}
                                            </TableRow>
                                        )
                                    )}
                            </TableBody>
                        </Table>
                    </Section>
                )}
                {values.length > 0 && (
                    <Section title="Import" open>
                        <Typography>
                            {values.length} entries of which{" "}
                            <strong>
                                {
                                    values.filter(
                                        ({ country_id }) => !country_id
                                    ).length
                                }{" "}
                                without a valid country
                            </strong>
                        </Typography>
                        <Typography>
                            {values.at(0)?.values.length === 1
                                ? "1 column is"
                                : `${
                                      values.at(0)?.values.length
                                  } columns are`}{" "}
                            set to be imported
                        </Typography>
                        <Button
                            variant="contained"
                            disabled={!values.at(0)?.values.length}
                            onClick={onSubmit}
                        >
                            Import Geo Data
                        </Button>
                    </Section>
                )}
            </ContentScroll>
        </>
    );
};

const PickCountry: React.FC<{
    country_id?: Collection["id"];
    onChange: (id: number) => void;
    country_label: string;
    countries: IProps["countries"];
}> = ({ country_id, onChange, country_label, countries }) => {
    const [change, setChange] = useState(false);

    const countryName = useMemo(
        () =>
            countries.find(({ id }) => id === country_id)?.name ||
            country_label,
        [countries, country_id, country_label]
    );

    return change ? (
        <TextField
            value={country_id || 0}
            select
            SelectProps={{ defaultOpen: true }}
            size="small"
            margin="none"
            onBlur={() => setChange(false)}
            onChange={(evt) => {
                setChange(false);
                onChange(Number(evt.target.value));
            }}
        >
            <MenuItem value={0}>
                <Typography display="flex" alignItems="center">
                    <WarningIcon color="error" fontSize="small" />
                    {country_label}
                </Typography>
            </MenuItem>
            {countries.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                    {name}
                </MenuItem>
            ))}
        </TextField>
    ) : (
        <Typography display="flex" gap={0.25} alignItems="center">
            <IconButton onClick={() => setChange(true)} sx={{ p: 0.25 }}>
                {country_id ? (
                    <EditIcon fontSize="small" />
                ) : (
                    <WarningIcon color="error" fontSize="small" />
                )}
            </IconButton>
            {countryName}
        </Typography>
    );
};

export default Import;
