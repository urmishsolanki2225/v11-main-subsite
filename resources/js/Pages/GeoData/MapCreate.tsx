import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import GlobalStyles from "@mui/material/GlobalStyles";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { maxBy, minBy, uniqBy } from "lodash";
import { MuiColorInput } from "mui-color-input";
import route from "ziggy-js";

import { NumericFormatInput } from "../../Components/NumericFormatInput";
import Section from "../../Components/Section";
import { Legend } from "../../Front/Map/Legend";
import { CountryData, Map, MapData } from "../../Front/Map/Map";
import { AppBarHeader, ContentScroll } from "../../Layout";
import {
    GeoDataColumn,
    GeoDataColumnValue,
    GeoDataMapLegendClass,
    GeoDataSet,
} from "../../Models/GeoData";

interface IProps {
    dataset: GeoDataSet;
    countries: {
        id: number;
        name: string;
        country_code?: string;
    }[];
}
const MapCreate: React.FC<IProps> = ({ dataset, countries }) => {
    // const { needSave } = useAppContext();
    const [label, setLabel] = useState("");
    const [colorColumn, setColorColumn] = useState<GeoDataColumn>();
    const [displayColumns, setDisplayColumns] = useState<GeoDataColumn["id"][]>(
        () => dataset.columns.map(({ id }) => id)
    );
    const [classCount, setClassCount] = useState(2);
    const [legend, setLegend] = useState<GeoDataMapLegendClass[]>([]);

    const onSave = () => {
        if (!colorColumn) {
            return;
        }
        Inertia.post(route("admin.geodata.map.store"), {
            label,
            dataset_id: dataset.id,
            config: JSON.stringify({
                legend,
                color_column_id: colorColumn.id,
                display_column_ids: displayColumns,
            }),
        } as any);
    };

    useEffect(() => {
        if (!colorColumn) {
            return;
        }
        if (colorColumn.data_type === "string") {
            setLegend(
                [...new Array(classCount)].map((a, idx) => ({
                    color: "#f00",
                    display_label: { en: `${idx}`, fr: `${idx}`, es: `${idx}` },
                }))
            );
        } else {
            const min = Math.floor(
                Number(minBy(colorColumn.values, "value")?.value || 0)
            );
            const max = Math.ceil(
                Number(maxBy(colorColumn.values, "value")?.value || 100)
            );
            const range = max - min;
            const step = Math.ceil(range / classCount);
            const legend = [];
            let i = 0;
            for (let from = 0; from < range; from += step) {
                const to = from + step;
                const lbl = `${from}-${to}${
                    colorColumn.data_type === "percentage" ? "%" : ""
                }`;
                legend.push({
                    color: `#${(
                        15 - Math.round((i * 15) / classCount)
                    ).toString(16)}00`,
                    from,
                    to,
                    display_label: { en: lbl, es: lbl, fr: lbl },
                });
                ++i;
            }
            setLegend(legend);
        }
    }, [classCount, colorColumn]);

    const setClass = (idx: number, cls: GeoDataMapLegendClass) => {
        setLegend((legend) => {
            const nextLegend = [...legend];
            nextLegend[idx] = cls;
            return nextLegend;
        });
    };

    const setClassFrom = (idx: number, from: number) => {
        setLegend((legend) => {
            const nextLegend = [...legend];
            nextLegend[idx] = { ...legend[idx], from };
            if (idx > 0) {
                nextLegend[idx - 1] = { ...legend[idx - 1], to: from };
            }
            return nextLegend;
        });
    };

    const setClassTo = (idx: number, to: number) => {
        setLegend((legend) => {
            const nextLegend = [...legend];
            nextLegend[idx] = { ...legend[idx], to };
            if (idx < legend.length - 1) {
                nextLegend[idx + 1] = { ...legend[idx + 1], from: to };
            }
            return nextLegend;
        });
    };

    const setClassLabel = (
        idx: number,
        lang: "en" | "es" | "fr",
        label: string
    ) => {
        setLegend((legend) => {
            const nextLegend = [...legend];
            const cls = { ...legend[idx] };
            cls.display_label = { ...cls.display_label, [lang]: label };
            nextLegend[idx] = cls;
            return nextLegend;
        });
    };

    const getClassNameForValue = useCallback(
        (value?: GeoDataColumnValue["value"]) => {
            if (value === undefined) {
                return `map-preview-legend-undefined`;
            }
            const legendClassIndex = legend.findIndex(({ to, labels }) => {
                if (labels) {
                    return labels.includes(String(value));
                } else if (to !== undefined) {
                    return Number(value) < to;
                } else {
                    return true;
                }
            });
            return `map-preview-legend-class-${legendClassIndex}`;
        },
        [legend]
    );

    const formatColumnValue = useCallback(
        (column?: GeoDataColumn, value?: GeoDataColumnValue["value"]) => {
            if (!column || value === undefined) {
                return;
            }
            switch (column.data_type) {
                case "string":
                case "country":
                    return value;
                case "percentage":
                    return `${column.label}: ${Number(value).toFixed(1)}%`;
                default:
                    return `${column.label}: ${Number(value).toFixed(0)}`;
            }
        },
        []
    );

    const mapData = useMemo(
        () =>
            Object.fromEntries(
                countries.map((country) => {
                    const countryData = { ...country } as CountryData;
                    const val = colorColumn?.values?.find(
                        ({ country_id }) => country_id === country.id
                    );
                    countryData.className = getClassNameForValue(val?.value);
                    countryData.annotationLabel =
                        "\n" +
                        displayColumns
                            .map((columnId) => {
                                const col = dataset.columns.find(
                                    (column) => columnId === column.id
                                );
                                return formatColumnValue(
                                    col,
                                    col?.values?.find(
                                        ({ country_id }) =>
                                            country_id === country.id
                                    )?.value
                                );
                            })
                            .filter((val) => !!val)
                            .join("\n");
                    return [country.country_code, countryData];
                })
            ) satisfies MapData,
        [
            colorColumn?.values,
            countries,
            dataset.columns,
            displayColumns,
            formatColumnValue,
            getClassNameForValue,
        ]
    );

    return (
        <>
            <AppBarHeader title="Create Geo Data Map">
                <Button
                    // variant={needSave ? "contained" : "outlined"}
                    variant="contained"
                    onClick={onSave}
                    color="secondary"
                    disabled={!colorColumn || !label}
                >
                    Save
                </Button>
            </AppBarHeader>
            <ContentScroll>
                <Paper sx={{ m: 2, p: 2 }}>
                    <Typography variant="h5">
                        Dataset: {dataset.label}
                    </Typography>
                    <TextField
                        label="Map label (internal)"
                        value={label}
                        onChange={(evt) => setLabel(evt.currentTarget.value)}
                    />
                    <Typography>
                        Which column to use for coloring the map and which
                        (multiple) to display in the tooltip.
                    </Typography>
                    <RadioGroup
                        value={colorColumn?.id || null}
                        onChange={(evt, val) =>
                            setColorColumn(
                                dataset.columns.find(
                                    ({ id }) => id === Number(val)
                                )
                            )
                        }
                    >
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>use as color</TableCell>
                                    <TableCell>show in tooltip</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataset.columns.map((column) => (
                                    <TableRow key={column.id}>
                                        <TableCell>
                                            <FormControlLabel
                                                control={
                                                    <Radio value={column.id} />
                                                }
                                                label={`${column.data_type} ${column.label}`}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={displayColumns.includes(
                                                    column.id
                                                )}
                                                onChange={(evt, checked) =>
                                                    setDisplayColumns(
                                                        (display) =>
                                                            checked
                                                                ? [
                                                                      ...display,
                                                                      column.id,
                                                                  ]
                                                                : display.filter(
                                                                      (id) =>
                                                                          id !==
                                                                          column.id
                                                                  )
                                                    )
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </RadioGroup>
                </Paper>
                {colorColumn && (
                    <>
                        <Paper sx={{ m: 2, p: 2 }}>
                            <Typography variant="h5">Map legend</Typography>
                            {colorColumn.data_type === "string" ? (
                                <Typography>
                                    Values in the dataset:{" "}
                                    {uniqBy(
                                        colorColumn.values || [],
                                        "value"
                                    ).join(", ")}{" "}
                                </Typography>
                            ) : (
                                <Typography>
                                    Minimum value:{" "}
                                    {minBy(colorColumn.values, "value")?.value}
                                    <br />
                                    Maximum value:{" "}
                                    {maxBy(colorColumn.values, "value")?.value}
                                </Typography>
                            )}
                            <Box display="flex" gap={1} alignItems="center">
                                <Typography>Amount of classes:</Typography>
                                <Slider
                                    min={1}
                                    max={10}
                                    value={classCount}
                                    marks
                                    onChange={(evt, val) =>
                                        setClassCount(val as number)
                                    }
                                    valueLabelDisplay="auto"
                                    sx={{ flex: 1 }}
                                />
                            </Box>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>from</TableCell>
                                        <TableCell>to</TableCell>
                                        <TableCell>color</TableCell>
                                        <TableCell>label EN</TableCell>
                                        <TableCell>label FR</TableCell>
                                        <TableCell>label ES</TableCell>
                                        <TableCell>show</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {legend.map((cls, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>
                                                <TextField
                                                    value={cls.from || 0}
                                                    onChange={(evt) =>
                                                        setClassFrom(
                                                            idx,
                                                            Number(
                                                                evt.target.value
                                                            )
                                                        )
                                                    }
                                                    InputProps={{
                                                        inputComponent:
                                                            NumericFormatInput as any,
                                                    }}
                                                    size="small"
                                                    hiddenLabel
                                                    margin="none"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={cls.to || 0}
                                                    onChange={(evt) =>
                                                        setClassTo(
                                                            idx,
                                                            Number(
                                                                evt.target.value
                                                            )
                                                        )
                                                    }
                                                    InputProps={{
                                                        inputComponent:
                                                            NumericFormatInput as any,
                                                    }}
                                                    size="small"
                                                    hiddenLabel
                                                    margin="none"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <MuiColorInput
                                                    value={cls.color}
                                                    onChange={(
                                                        color,
                                                        { hex }
                                                    ) =>
                                                        setClass(idx, {
                                                            ...cls,
                                                            color: hex,
                                                        })
                                                    }
                                                    isAlphaHidden
                                                    format="hex"
                                                    size="small"
                                                    margin="none"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={
                                                        cls.display_label.en ||
                                                        ""
                                                    }
                                                    size="small"
                                                    hiddenLabel
                                                    margin="none"
                                                    onChange={(evt) =>
                                                        setClassLabel(
                                                            idx,
                                                            "en",
                                                            evt.target.value
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={
                                                        cls.display_label.fr ||
                                                        ""
                                                    }
                                                    size="small"
                                                    hiddenLabel
                                                    margin="none"
                                                    onChange={(evt) =>
                                                        setClassLabel(
                                                            idx,
                                                            "fr",
                                                            evt.target.value
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={
                                                        cls.display_label.es ||
                                                        ""
                                                    }
                                                    size="small"
                                                    hiddenLabel
                                                    margin="none"
                                                    onChange={(evt) =>
                                                        setClassLabel(
                                                            idx,
                                                            "es",
                                                            evt.target.value
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={!cls.hide}
                                                    onChange={(evt, checked) =>
                                                        setClass(idx, {
                                                            ...cls,
                                                            hide: !checked,
                                                        })
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                        <Section title="Preview" open>
                            <GlobalStyles
                                styles={Object.fromEntries(
                                    legend.map(({ color }, idx) => [
                                        `.map-preview-legend-class-${idx}`,
                                        { fill: color },
                                    ])
                                )}
                            />
                            <Box
                                position="relative"
                                maxWidth={800}
                                sx={{ margin: "0 auto" }}
                            >
                                <Map mapData={mapData} />
                                <Box
                                    position="absolute"
                                    right={0}
                                    bottom={0}
                                    sx={{ backgroundColor: "#ffffff80" }}
                                >
                                    <Legend legend={legend} />
                                </Box>
                            </Box>
                        </Section>
                    </>
                )}
            </ContentScroll>
        </>
    );
};

export default MapCreate;
