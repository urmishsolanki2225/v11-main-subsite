import React from "react";

import MapIcon from "@mui/icons-material/Map";

import ButtonDialog from "../../Toolbar/ButtonDialog";

import MapPane from "./EditPane";
import MapElement from "./MapElement";

const MapToolbarButton: React.FC = () => {
    return (
        <ButtonDialog
            elementType={MapElement}
            icon={<MapIcon />}
            // pickerMenu={MapMenu}
            EditPane={MapPane}
        />
    );
};

export default MapToolbarButton;
