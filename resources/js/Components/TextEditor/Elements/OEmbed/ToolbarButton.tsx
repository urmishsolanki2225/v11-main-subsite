import React from "react";

import TwitterIcon from "@mui/icons-material/Twitter";

import ButtonDialog from "../../Toolbar/ButtonDialog";

import OEmbedPane from "./EditPane";
import OEmbedElement from "./OEmbedElement";

const OEmbedToolbarButton: React.FC = () => {
    return (
        <ButtonDialog
            elementType={OEmbedElement}
            icon={<TwitterIcon />}
            pickerMenu={[]}
            EditPane={OEmbedPane}
        />
    );
};

export default OEmbedToolbarButton;
