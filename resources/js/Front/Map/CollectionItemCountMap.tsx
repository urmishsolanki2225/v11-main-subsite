import React, {
    Fragment,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import GlobalStyles from "@mui/material/GlobalStyles";
import axios from "axios";
import colorConvert from "color-convert";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { createRoot } from "react-dom/client";

import { Collection } from "../../Models";
import { Themed } from "../Themed";

import { CountryData, Map, MapData } from "./Map";
import { SidebarItems } from "./SidebarItems";

dayjs.extend(utc);

export interface CountryDataItemCount extends CountryData {
    items_count?: number;
}

interface IProps {
    collection_id: Collection["id"];
    lang?: string;
    translations: Record<string, string>;
    title?: string;
    blurb?: string;
    baseColor?: string;
    cutoffs?: number[];
}
export const CollectionItemCountMap: React.FC<IProps> = ({
    collection_id = 0,
    lang,
    translations,
    title,
    blurb,
    baseColor,
    cutoffs,
}) => {
    const [mapData, setMapData] = useState<MapData>({});
    const [selectedCountry, setSelectedCountry] = useState<CountryData>();
    const [showSidebar, setShowSidebar] = useState(false);
    const baseHue = colorConvert.hex.hsl(baseColor || "#cf2029")[0];
    const gradientColors = {
        "--theme-color-gradient-1": `hsl(${baseHue} 87.5% 62.35%)`,
        "--theme-color-gradient-2": `hsl(${baseHue} 67.71% 56.27%)`,
        "--theme-color-gradient-3": `hsl(${baseHue} 53.36% 50.39%)`,
        "--theme-color-gradient-4": `hsl(${baseHue} 52.42% 44.51%)`,
        "--theme-color-gradient-5": `hsl(${baseHue} 52.53% 38.82%)`,
    };

    const filter = useMemo(
        () => ({
            parent_collection: collection_id,
        }),
        [collection_id]
    );

    useEffect(() => {
        if (!filter.parent_collection) {
            return;
        }
        const controller = new AbortController();
        axios
            .get<MapData<CountryDataItemCount>>("/api/map/items_count", {
                params: { filter, lang },
                signal: controller.signal,
            })
            .then((response) => {
                if (response.data) {
                    const mapData: MapData = {};
                    Object.entries(response.data).forEach(([cc, data]) => {
                        let opacity = 1;
                        if (cutoffs?.length && data.items_count) {
                            const sortedCutoffs = [
                                ...cutoffs,
                                Number.MAX_SAFE_INTEGER,
                            ];
                            sortedCutoffs.sort();
                            const idx =
                                sortedCutoffs.findIndex(
                                    (cutoff) => data.items_count! <= cutoff
                                ) || 0;
                            opacity = (idx + 1) / sortedCutoffs.length;
                        }
                        mapData[cc] = {
                            ...data,
                            className: !data.items_count
                                ? "activity_none"
                                : "activity_base",
                            opacity,
                            annotationLabel: data.items_count
                                ? `${data.items_count} ${
                                      data.items_count === 1
                                          ? translations["article"]
                                          : translations["articles"]
                                  }`
                                : "",
                        };
                    });
                    setMapData(mapData);
                }
            })
            .catch((err) => {
                console.warn("load mapdata", err);
            });
        return () => controller.abort();
    }, [filter, lang, translations, cutoffs]);

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
            <GlobalStyles
                styles={{
                    [`.map_${collection_id}`]: {
                        "--theme-color-base": baseColor,
                        "--theme-color-light":
                            gradientColors["--theme-color-gradient-1"],
                        "--theme-color-dark":
                            gradientColors["--theme-color-gradient-5"],
                        ...gradientColors,
                    },
                    [`.map_${collection_id} .activity_base`]: {
                        fill: baseColor,
                    },
                }}
            />
            <div className={`map_container map_${collection_id}`}>
                <Map mapData={mapData} onSelectCountry={onMapSelectedCountry} />
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
                                {title && <h3>{title}</h3>}
                                {blurb && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: blurb,
                                        }}
                                    />
                                )}
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

export const renderCollectionItemCountMap = (
    container: Element,
    props: IProps
) => {
    const root = createRoot(container);
    root.render(
        <Themed>
            <CollectionItemCountMap {...props} />
        </Themed>
    );
};

(window as any).renderCollectionItemCountMap = renderCollectionItemCountMap;
