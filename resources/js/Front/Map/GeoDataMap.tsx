import React, { useCallback, useMemo } from "react";

import Box from "@mui/material/Box";
import GlobalStyles from "@mui/material/GlobalStyles";
import { createRoot } from "react-dom/client";

import {
    GeoDataColumn,
    GeoDataColumnValue,
    GeoDataMap,
} from "../../Models/GeoData";
import { Themed } from "../Themed";

import { CountryData, Map, MapData } from "./Map";

interface IProps {
    lang?: string;
    map: GeoDataMap;
    countries: {
        id: number;
        name: string;
        country_code?: string;
    }[];
}

export const GeoDataMapDisplay: React.FC<IProps> = ({
    // lang,
    map,
    countries,
}) => {
    const getClassNameForValue = useCallback(
        (value?: GeoDataColumnValue["value"]) => {
            if (value === undefined) {
                return `map-${map.id}-legend-undefined`;
            }
            const legendClassIndex = map.config.legend.findIndex(
                ({ to, labels }) => {
                    if (labels) {
                        return labels.includes(String(value));
                    } else if (to !== undefined) {
                        return Number(value) < to;
                    } else {
                        return true;
                    }
                }
            );
            return `map-${map.id}-legend-class-${legendClassIndex}`;
        },
        [map.config.legend, map.id]
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

    const mapData = useMemo(() => {
        if (!map.dataset) {
            return {} as MapData;
        }
        const colorColumn = map.dataset.columns.find(
            ({ id }) => id === map.config.color_column_id
        );
        const displayColumns = map.dataset.columns.filter(({ id }) =>
            map.config.display_column_ids.includes(id)
        );
        return Object.fromEntries(
            countries.map((country) => {
                const countryData = { ...country } as CountryData;
                const val = colorColumn?.values?.find(
                    ({ country_id }) => country_id === country.id
                );
                countryData.className = getClassNameForValue(val?.value);
                countryData.annotationLabel = displayColumns
                    .map((column) =>
                        formatColumnValue(
                            column,
                            column?.values?.find(
                                ({ country_id }) => country_id === country.id
                            )?.value
                        )
                    )
                    .filter((val) => !!val)
                    .join("\n");
                return [country.country_code, countryData];
            })
        ) as MapData;
    }, [
        countries,
        formatColumnValue,
        getClassNameForValue,
        map.config.color_column_id,
        map.config.display_column_ids,
        map.dataset,
    ]);

    return (
        <Box>
            <GlobalStyles
                styles={Object.fromEntries(
                    map.config.legend.map(({ color }, idx) => [
                        `.map-${map.id}-legend-class-${idx}`,
                        { fill: color },
                    ])
                )}
            />
            <Map mapData={mapData} />
        </Box>
    );
};

export const renderGeoDataMap = (container: Element, props: IProps) => {
    const root = createRoot(container);
    root.render(
        <Themed>
            <GeoDataMapDisplay {...props} />
        </Themed>
    );
};

(window as any).renderGeoDataMap = renderGeoDataMap;
