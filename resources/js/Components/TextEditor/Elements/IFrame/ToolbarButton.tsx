import React from "react";

import WebAssetIcon from "@mui/icons-material/WebAsset";

import ButtonDialog from "../../Toolbar/ButtonDialog";

import IFramePane from "./EditPane";
import IFrameElement from "./IFrameElement";

const IFrameToolbarButton: React.FC = () => {
    return (
        <ButtonDialog
            elementType={IFrameElement}
            icon={<WebAssetIcon />}
            pickerMenu={[]}
            EditPane={IFramePane}
        />
    );
};

export default IFrameToolbarButton;
