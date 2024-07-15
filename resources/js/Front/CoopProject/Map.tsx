import React, { useMemo, useState } from "react";

import { Box } from "@mui/material";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
} from "react-simple-maps";
import UAParser from "ua-parser-js";
import route from "ziggy-js";

import { DevCoopProjectPartner } from "../../Models";

// https://code.highcharts.com/mapdata/ ToDo check Palestine
const mapUrl = `${window.location.protocol}//${window.location.hostname}`+"/v11-main-subsite/public/world-map.json";
// const colorScale = ["#bbb", "#888", "#333"];
const colorScale = ["url(#Gradient3)", "url(#Gradient2)", "url(#Gradient1)"];

interface CountryData {
    id: number;
    name: string;
    currentProjects: number;
    totalProjects: number;
    members: DevCoopProjectPartner[];
    partnerCountries: {
        name: string;
        id: number;
        country_code: CountryCodeISO3166alpha3;
    }[];
}

// https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
type CountryCodeISO3166alpha3 = string; // just to remember the country code format

interface IProps {
    mapData: Record<CountryCodeISO3166alpha3, CountryData>;
    translations: Record<string, string>;
    countryDetailsDom: Element;
}
export const Map: React.FC<IProps> = ({
    mapData,
    translations,
    countryDetailsDom,
}) => {
    const [selectedCountry, setSelectedCountry] = useState<CountryData>();
    const [zoom, setZoom] = useState(1);
    const [center, setCenter] = useState<[number, number]>([0, 0]);

    const colorScaleCount1 = 2;
    const colorScaleCount2 = 5;

    const getFillColor = (country?: CountryData) => {
        if (!country) {
            // country not in our db
            return "#fcfcfc";
        }
        if (country.id === selectedCountry?.id) {
            // selected country
            return "#29649e";
        }
        if (
            selectedCountry?.partnerCountries.find(
                ({ id }) => country.id === id
            )
        ) {
            // partner country of selected country
            return "#8cb6cf";
        }
        if (!country.currentProjects) {
            // no current projects
            return "#fcfcfc";
        } else if (country.currentProjects <= colorScaleCount1) {
            // less than colorScaleCount1 current projects
            return colorScale[0];
        } else if (country.currentProjects <= colorScaleCount2) {
            // less than colorScaleCount2 current projects
            return colorScale[1];
        } else {
            // more than colorScaleCount2 current projects
            return colorScale[2];
        }
    };

    const isSafari = useMemo(() => UAParser().browser.name === "Safari", []);

    return (
        <>
            <Box className="dev_coop_map">
                <div className="dev_coop_map_legend">
                    <legend>{translations["Current Projects"]}</legend>

                    <span className="dev_coop_map_legend_step1">
                        <span style={{ backgroundColor: colorScale[0] }}></span>
                        1 - {colorScaleCount1}
                    </span>
                    <span className="dev_coop_map_legend_step2">
                        <span style={{ backgroundColor: colorScale[1] }}></span>
                        {colorScaleCount1} - {colorScaleCount2}
                    </span>
                    <span className="dev_coop_map_legend_step3">
                        <span style={{ backgroundColor: colorScale[2] }}></span>
                        {colorScaleCount2}+
                    </span>
                    {Boolean(selectedCountry) && (
                        <>
                            <span className="dev_coop_map_legend_selected">
                                <span
                                    style={{ backgroundColor: "#29649e" }}
                                ></span>
                                {translations["Selected country"]}
                            </span>
                            <span className="dev_coop_map_legend_partners">
                                <span
                                    style={{ backgroundColor: "#8cb6cf" }}
                                ></span>
                                {translations["Partner countries"]}
                            </span>
                        </>
                    )}
                </div>
                <ComposableMap
                    width={800}
                    height={480}
                    projectionConfig={{ rotate: [-15, 0, 0] }}
                >
                    <defs>
                        <linearGradient
                            id="Gradient1"
                            x1="2"
                            x2="0"
                            y1="0"
                            y2="1"
                        >
                            <stop
                                className="stop1"
                                offset="20%"
                                stopColor="#dd4b31"
                            />
                            <stop
                                className="stop2"
                                offset="40%"
                                stopColor="#e25f36"
                            />
                            <stop
                                className="stop3"
                                offset="60%"
                                stopColor="#e6713c"
                            />
                            <stop
                                className="stop4"
                                offset="80%"
                                stopColor="#ea8245"
                            />
                            <stop
                                className="stop5"
                                offset="100%"
                                stopColor="#ee924f"
                            />
                        </linearGradient>
                        <linearGradient
                            id="Gradient2"
                            x1="2"
                            x2="0"
                            y1="0"
                            y2="1"
                        >
                            <stop
                                className="stop1"
                                offset="20%"
                                stopColor="#ee924f"
                            />
                            <stop
                                className="stop2"
                                offset="40%"
                                stopColor="#f1a154"
                            />
                            <stop
                                className="stop3"
                                offset="60%"
                                stopColor="#f3b05b"
                            />
                            <stop
                                className="stop4"
                                offset="80%"
                                stopColor="#f5bf64"
                            />
                            <stop
                                className="stop5"
                                offset="100%"
                                stopColor="#f6cd6f"
                            />
                        </linearGradient>
                        <linearGradient
                            id="Gradient3"
                            x1="2"
                            x2="0"
                            y1="0"
                            y2="1"
                        >
                            <stop
                                className="stop1"
                                offset="20%"
                                stopColor="#f6cd6f"
                            />
                            <stop
                                className="stop2"
                                offset="40%"
                                stopColor="#f7d675"
                            />
                            <stop
                                className="stop3"
                                offset="60%"
                                stopColor="#f8df7b"
                            />
                            <stop
                                className="stop4"
                                offset="80%"
                                stopColor="#f9e782"
                            />
                            <stop
                                className="stop5"
                                offset="100%"
                                stopColor="#f9f08a"
                            />
                        </linearGradient>
                    </defs>
                    <ZoomableGroup
                        center={center}
                        zoom={zoom}
                        onMoveEnd={({ coordinates, zoom }) => {
                            setCenter(coordinates);
                            setZoom(zoom);
                        }}
                        translateExtent={[
                            [0, 0],
                            [800, 480],
                        ]}
                        filterZoomEvent={(evt) => {
                            if (isSafari && (evt as any).type === "wheel") {
                                return false;
                            }
                            return true;
                        }}
                    >
                        <Geographies geography={mapUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={getFillColor(
                                            mapData[
                                                geo.properties["iso-a3"] ||
                                                    geo.id
                                            ]
                                        )}
                                        stroke="#bbb"
                                        vectorEffect="non-scaling-stroke"
                                        style={{
                                            default: {
                                                outline: "none",
                                            },
                                            pressed: { outline: "none" },
                                            hover: { outline: "none" },
                                        }}
                                        onClick={() => {
                                            setSelectedCountry(
                                                mapData[
                                                    geo.properties["iso-a3"] ||
                                                        geo.id
                                                ]
                                            );
                                        }}
                                    />
                                ))
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
                <div className="dev_coop_map_zoomcontrols">
                    <button
                        disabled={zoom >= 8}
                        onClick={() => setZoom((zoom) => Math.min(8, zoom + 1))}
                    >
                        +
                    </button>
                    <button
                        disabled={zoom <= 1}
                        onClick={() => setZoom((zoom) => Math.max(1, zoom - 1))}
                    >
                        -
                    </button>
                </div>
            </Box>
            {createPortal(
                selectedCountry ? (
                    <>
                        <h3>{selectedCountry.name}</h3>
                        <section className="country_projects">
                            <div className="country_projects_current">
                                <label>
                                    {translations["Current Projects"]}:
                                </label>{" "}
                                <span>{selectedCountry.currentProjects}</span>{" "}
                            </div>
                            <div className="country_projects_total">
                                <label>{translations["Total Projects"]}:</label>{" "}
                                <span>{selectedCountry.totalProjects}</span>{" "}
                            </div>
                        </section>
                        {selectedCountry.members.length > 0 && (
                            <div className="country_members">
                                <label>
                                    {
                                        translations[
                                            "EI Members from this country involved in Cooperation Projects"
                                        ]
                                    }
                                    :
                                </label>{" "}
                                {selectedCountry.members.map(
                                    ({ affiliate_item_id, name }) => (
                                        <a
                                            key={affiliate_item_id}
                                            href={`${route(
                                                "coop_projects.index"
                                            )}?filter[partner]=${encodeURIComponent(
                                                name
                                            )}`}
                                        >
                                            {name}
                                        </a>
                                    )
                                )}
                            </div>
                        )}
                        {selectedCountry.partnerCountries.length > 0 && (
                            <div className="country_partners">
                                <label>
                                    {translations["Partner Countries"]}:
                                </label>{" "}
                                {selectedCountry.partnerCountries.map(
                                    ({ id, name }) => (
                                        <a
                                            key={id}
                                            href={`${route(
                                                "coop_projects.index"
                                            )}?filter[country]=${id}`}
                                        >
                                            {name}
                                        </a>
                                    )
                                )}
                            </div>
                        )}
                        <a
                            className="dev_coop_map_details_country_all_link"
                            href={`${route(
                                "coop_projects.index"
                            )}?filter[country]=${selectedCountry.id}`}
                        >
                            {
                                translations[
                                    "View all Cooperation Projects involving partners from"
                                ]
                            }{" "}
                            {selectedCountry.name}
                        </a>
                    </>
                ) : (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: translations["map_intro_text"],
                        }}
                    ></div>
                ),
                countryDetailsDom
            )}
        </>
    );
};

export const renderMap = (
    container: Element,
    countryDetailsDom: Element,
    props: IProps
) => {
    const root = createRoot(container!);
    root.render(<Map {...props} countryDetailsDom={countryDetailsDom} />);
};

(window as any).renderMap = renderMap;
