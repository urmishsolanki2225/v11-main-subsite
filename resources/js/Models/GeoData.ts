import { Collection } from ".";

export type GeoDataSet = {
    id: number;
    label: string;
    source_label?: string;
    source_link?: string;
    created_at: string;
    updated_at: string;

    columns: GeoDataColumn[];
};

export type GeoDataMap = {
    id: number;
    label: string;
    created_at: string;
    updated_at: string;

    dataset?: GeoDataSet;
    config: {
        color_column_id: GeoDataColumn["id"];
        display_column_ids: GeoDataColumn["id"][];
        legend: GeoDataMapLegendClass[];
    };
};

export type GeoDataColumn = {
    id: number;
    label: string;
    labels: { label: string; lang: string };
    data_type: string;
    values?: GeoDataColumnValue[];
};

export type GeoDataColumnValue = {
    country_id: Collection["id"];
    value: string | number;
};

export type GeoDataMapLegendClass = {
    color: string;
    from?: number;
    to?: number;
    labels?: string[];
    display_label: { en: string; fr: string; es: string };
    hide?: boolean;
};
