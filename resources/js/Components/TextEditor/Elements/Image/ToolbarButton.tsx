import React from "react";

import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

import { ImageMenu } from "../../../Browser";
import ButtonDialog from "../../Toolbar/ButtonDialog";

import ImagePane from "./EditPane";
import ImageElement from "./ImageElement";

const ImageToolbarButton: React.FC = () => {
    return (
        <ButtonDialog
            elementType={ImageElement}
            icon={<InsertPhotoIcon />}
            pickerMenu={ImageMenu}
            EditPane={ImagePane}
        />
    );
};

export default ImageToolbarButton;
