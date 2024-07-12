import React, {
    ReactElement,
    ReactNode,
    useEffect,
    useMemo,
    useState,
} from "react";

import useTheme from "@mui/material/styles/useTheme";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Instance } from "@popperjs/core";
import { createRoot } from "react-dom/client";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
} from "react-simple-maps";
import UAParser from "ua-parser-js";

import MAP_JSON from "./world-map.json"; // ?url to import as url, but won't be compressed then

// https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
export type CountryCodeISO3166alpha3 = string; // just to remember the country code format

export interface CountryData {
    id: number;
    country_code: CountryCodeISO3166alpha3;
    name: string;
    className?: string;
    annotationLabel?: string;
    opacity?: number;
}

export type MapData<T extends CountryData = CountryData> = Record<
    CountryCodeISO3166alpha3,
    T
>;

interface IProps {
    mapData: MapData;
    // translations: Record<string, string>;
    // countryDetailsDom: Element;
    onSelectCountry?: (country?: CountryData) => void;
    svgDefs?: ReactElement<SVGDefsElement>;
}

export const Map: React.FC<IProps> = ({
    mapData,
    svgDefs,
    onSelectCountry,
}) => {
    const [selectedCountry, setSelectedCountry] = useState<CountryData>();
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
    const [zoom, setZoom] = useState(isPhone ? 2 : 1);
    const [center, setCenter] = useState<[number, number]>(
        isPhone ? [55, 6] : [15, 0]
    );
    const [tooltip, setTooltip] = useState<ReactNode>();

    const isSafari = useMemo(() => UAParser().browser.name === "Safari", []);

    if (selectedCountry) {
        // console.log("selected", selectedCountry);
    }

    useEffect(() => {
        if (zoom === 1) {
            setCenter([15, 0]);
        }
    }, [zoom]);
    const positionRef = React.useRef<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const popperRef = React.useRef<Instance>(null);
    const onMouseMove: React.MouseEventHandler = (evt) => {
        positionRef.current = { x: evt.clientX, y: evt.clientY };

        if (popperRef.current != null) {
            popperRef.current.update();
        }
    };

    return (
        <>
            <ComposableMap
                className="map_map"
                width={800}
                height={480}
                projectionConfig={{ rotate: [-15, 0, 0] }}
                onClick={() => {
                    setSelectedCountry(undefined);
                    if (onSelectCountry) {
                        onSelectCountry(undefined);
                    }
                }}
            >
                {svgDefs}
                <ZoomableGroup
                    center={center}
                    zoom={zoom}
                    onMoveEnd={({ coordinates, zoom }) => {
                        setCenter(coordinates);
                        setZoom(zoom);
                        // setSelectedCountry(undefined);
                        // if (onSelectCountry) {
                        //     onSelectCountry(undefined);
                        // }
                    }}
                    // translateExtent={[
                    //     [0, 0],
                    //     [800, 480],
                    // ]}
                    filterZoomEvent={(evt) => {
                        if (isSafari && (evt as any).type === "wheel") {
                            return false;
                        }
                        return true;
                    }}
                >
                    <Geographies
                        geography={MAP_JSON}
                        fill="white"
                        onMouseMove={onMouseMove}
                    >
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    className={`${
                                        mapData[
                                            geo.properties["iso-a3"] || geo.id
                                        ]?.className || ""
                                    } ${
                                        mapData[
                                            geo.properties["iso-a3"] || geo.id
                                        ]?.id === selectedCountry?.id
                                            ? "active"
                                            : ""
                                    }`}
                                    stroke="#bbb"
                                    vectorEffect="non-scaling-stroke"
                                    style={{
                                        default: {
                                            outline: "none",
                                            opacity:
                                                mapData[
                                                    geo.properties["iso-a3"] ||
                                                        geo.id
                                                ]?.opacity,
                                        },
                                        pressed: { outline: "none" },
                                        hover: { outline: "none" },
                                    }}
                                    onMouseEnter={() =>
                                        setTooltip(
                                            <div className="map_annotation">
                                                <span className="title">
                                                    {
                                                        mapData[
                                                            geo.properties[
                                                                "iso-a3"
                                                            ] || geo.id
                                                        ]?.name
                                                    }
                                                </span>
                                                {mapData[
                                                    geo.properties["iso-a3"] ||
                                                        geo.id
                                                ]?.annotationLabel ? (
                                                    <span
                                                        className="label"
                                                        style={{
                                                            whiteSpace:
                                                                "pre-wrap",
                                                        }}
                                                    >
                                                        {
                                                            mapData[
                                                                geo.properties[
                                                                    "iso-a3"
                                                                ] || geo.id
                                                            ]?.annotationLabel
                                                        }
                                                    </span>
                                                ) : null}
                                            </div>
                                        )
                                    }
                                    onMouseLeave={() => setTooltip(undefined)}
                                    onClick={(evt) => {
                                        evt.stopPropagation();
                                        setSelectedCountry(
                                            mapData[
                                                geo.properties["iso-a3"] ||
                                                    geo.id
                                            ]
                                        );
                                        if (onSelectCountry) {
                                            onSelectCountry(
                                                mapData[
                                                    geo.properties["iso-a3"] ||
                                                        geo.id
                                                ]
                                            );
                                        }
                                    }}
                                />
                            ))
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            <Tooltip
                title={tooltip || <>&nbsp;</>}
                placement="top"
                arrow
                open={Boolean(tooltip && !isPhone)}
                // slotProps={{ tooltip: { sx: { pointerEvents: "none" } } }}
                PopperProps={{
                    popperRef,
                    sx: { pointerEvents: "none" },
                    anchorEl: {
                        getBoundingClientRect: () =>
                            new DOMRect(
                                positionRef.current.x,
                                positionRef.current.y,
                                0,
                                0
                            ),
                    },
                }}
            >
                <span style={{ display: "none" }}></span>
            </Tooltip>
            <div className="map_zoomcontrols">
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
        </>
    );
};

export const renderMap = (container: Element, props: IProps) => {
    const root = createRoot(container);
    root.render(<Map {...props} />);
};

(window as any).renderMap = renderMap;
