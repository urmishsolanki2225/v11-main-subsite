import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { IPaneProps } from "../../Toolbar/ButtonDialog";

import { MapElementType } from "./type";

type IProps = IPaneProps<MapElementType>;
const MapPane: React.FC<IProps> = ({ onChange }) => {
    const [error /*, setError*/] = useState<string>();
    const [caption /*, setCaption*/] = useState<string>();
    const [mapId, setMapId] = useState(2);

    useEffect(() => {
        onChange({
            mapId,
            type: "map",
            showLegend: "none",
            children: [
                { type: "caption", children: [{ text: caption || "" }] },
            ],
        });
    }, [caption, mapId, onChange]);

    return (
        <>
            <Box>
                {error && <Typography color="error">{error}</Typography>}
                <Box display="flex" flexDirection="column">
                    <TextField
                        value={mapId}
                        onChange={(evt) => {
                            if (Number(evt.currentTarget.value)) {
                                setMapId(Number(evt.currentTarget.value));
                            }
                        }}
                    />
                </Box>
            </Box>
        </>
    );
};

export default MapPane;
