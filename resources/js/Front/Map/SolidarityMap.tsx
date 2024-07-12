import React, { useCallback, useEffect, useMemo, useState } from "react";

import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { createRoot } from "react-dom/client";

import { Collection } from "../../Models";
import { Themed } from "../Themed";

import { CountryData, Map, MapData } from "./Map";
import { SidebarItems } from "./SidebarItems";
import { YearRangeSlider } from "./YearRangeSlider";

dayjs.extend(utc);

export interface CountryDataItemCount extends CountryData {
    items_count?: number;
}

interface IProps {
    collection_id: Collection["id"];
    lang?: string;
    translations: Record<string, string>;
}
export const SolidarityMap: React.FC<IProps> = ({
    collection_id,
    lang,
    translations,
}) => {
    const [mapData, setMapData] = useState<MapData>({});
    const [selectedCountry, setSelectedCountry] = useState<CountryData>();
    const [yearFrom, setYearFrom] = useState<number | undefined>(2019);
    const [yearTo, setYearTo] = useState<number>(new Date().getFullYear());
    const [showSidebar, setShowSidebar] = useState(false);

    const filter = useMemo(
        () => ({
            collection: collection_id,
            published_after: yearFrom
                ? dayjs().set("year", yearFrom).startOf("year").utc().format()
                : undefined,
            published_before: yearTo
                ? dayjs().set("year", yearTo).endOf("year").utc().format()
                : undefined,
        }),
        [collection_id, yearFrom, yearTo]
    );

    useEffect(() => {
        const controller = new AbortController();
        if (!filter.collection) {
            return;
        }
        axios
            .get<MapData<CountryDataItemCount>>("/api/map/items_count", {
                params: { filter, lang },
                signal: controller.signal,
            })
            .then((response) => {
                if (response.data) {
                    const mapData: MapData = {};

                    Object.entries(response.data).forEach(
                        ([cc, data]) =>
                            (mapData[cc] = {
                                ...data,
                                className: `activity_${
                                    !data.items_count
                                        ? "none"
                                        : data.items_count <= 1
                                        ? "low"
                                        : data.items_count <= 3
                                        ? "medium"
                                        : "high"
                                }`,
                                annotationLabel: data.items_count
                                    ? `${data.items_count} ${
                                          data.items_count === 1
                                              ? translations["article"]
                                              : translations["articles"]
                                      }`
                                    : "",
                            })
                    );
                    setMapData(mapData);
                }
            })
            .catch((err) => {
                console.warn("load mapdata", err);
            });
        return () => controller.abort();
    }, [filter, lang, translations]);

    const onChangeSidebarItemCount = useCallback((count: number) => {
        if (!count) {
            setSelectedCountry(undefined);
        }
        setShowSidebar(!!count);
    }, []);

    const onMapSelectedCountry = useCallback(
        (country?: CountryDataItemCount) => {
            if (country?.items_count) {
                setSelectedCountry(country);
            } else {
                setSelectedCountry(undefined);
            }
        },
        []
    );

    return (
        <>
            <div className="map_container">
                <Map mapData={mapData} onSelectCountry={onMapSelectedCountry} />
                <div className="map_year_range">
                    <h3>
                        {translations["solidarity_across_borders_time_range"]}
                    </h3>
                    <YearRangeSlider
                        min={2019}
                        onChange={(from, to) => {
                            setYearFrom(from);
                            setYearTo(to || new Date().getFullYear());
                        }}
                    />
                    <span>
                        {yearFrom} - {yearTo}
                    </span>
                </div>
                <button
                    className="map_sidebar_opener"
                    onClick={() => {
                        setShowSidebar(true);
                        setSelectedCountry(undefined);
                    }}
                >
                    ?
                </button>
                <div className={`map_sidebar ${showSidebar ? "active" : ""}`}>
                    <button
                        className={`map_sidebar_closer ${
                            selectedCountry ? "close_country" : "close_intro"
                        }`}
                        onClick={() => {
                            setShowSidebar(false);
                            setSelectedCountry(undefined);
                        }}
                    >
                        ⨯
                    </button>
                    <SidebarItems
                        initialContent={
                            <>
                                <h3>
                                    {
                                        translations[
                                            "solidarity_across_borders_title"
                                        ]
                                    }
                                </h3>
                                <p>
                                    {
                                        translations[
                                            "solidarity_across_borders_intro_text"
                                        ]
                                    }
                                </p>
                                <h4>
                                    {
                                        translations[
                                            "solidarity_across_borders_activity_title"
                                        ]
                                    }
                                </h4>
                                <dl className="map_legend">
                                    <dt>
                                        <span className="activity_high"></span>
                                    </dt>
                                    <dd>
                                        {
                                            translations[
                                                "solidarity_across_borders_activity_high"
                                            ]
                                        }
                                    </dd>
                                    <dt>
                                        <span className="activity_medium"></span>
                                    </dt>
                                    <dd>
                                        {
                                            translations[
                                                "solidarity_across_borders_activity_medium"
                                            ]
                                        }
                                    </dd>
                                    <dt>
                                        <span className="activity_low"></span>
                                    </dt>
                                    <dd>
                                        {
                                            translations[
                                                "solidarity_across_borders_activity_low"
                                            ]
                                        }
                                    </dd>
                                    <dt>
                                        <span className="activity_none"></span>
                                    </dt>
                                    <dd>
                                        {
                                            translations[
                                                "solidarity_across_borders_activity_none"
                                            ]
                                        }
                                    </dd>
                                </dl>
                            </>
                        }
                        selectedCountry={selectedCountry}
                        filter={filter}
                        onChangeItemCount={onChangeSidebarItemCount}
                        lang={lang}
                    />
                </div>
            </div>
        </>
    );
};

export const renderSolidarityMap = (container: Element, props: IProps) => {
    const root = createRoot(container);
    root.render(
        <Themed>
            <SolidarityMap {...props} />
        </Themed>
    );
};

(window as any).renderSolidarityMap = renderSolidarityMap;
