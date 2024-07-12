import React from "react";

import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

import { VideoMenu } from "../../../Browser";
import ButtonDialog from "../../Toolbar/ButtonDialog";

import VideoEditPane from "./EditPane";

import VideoElement from ".";

const VideoToolbarButton: React.FC = () => {
    return (
        <ButtonDialog
            elementType={VideoElement}
            icon={<OndemandVideoIcon />}
            pickerMenu={VideoMenu}
            EditPane={VideoEditPane}
        />
    );
};

export default VideoToolbarButton;
