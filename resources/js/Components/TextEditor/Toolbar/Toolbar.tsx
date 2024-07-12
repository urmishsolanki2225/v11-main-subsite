import React from "react";

import FormatSizeIcon from "@mui/icons-material/FormatSize";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import Looks5Icon from "@mui/icons-material/Looks5";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { SxProps } from "@mui/material/styles";

import {
    ImageElement,
    LinkElement,
    QuoteElement,
    VideoElement,
    OEmbedElement,
    OrderedListElement,
    UnorderedListElement,
    FootnoteElement,
    MapElement,
} from "../Elements";
import IFrameElement from "../Elements/IFrame";

import BlockButton from "./BlockButton";
import HistoryButton from "./HistoryButton";
import { BoldButton, ItalicButton } from "./MarkButtons";
import MultiButton from "./MultiButton";

interface IProps {
    mode?: "full" | "limited";
    fullscreen?: boolean;
    setFullscreen?: (fullscreen: boolean) => void;
    className?: string;
    sx: SxProps;
}
const Toolbar: React.FC<IProps> = ({
    mode = "full",
    fullscreen,
    setFullscreen,
    sx,
}) => {
    // const editor = useSlate();

    return (
        <Box display="flex" justifyContent="space-between" sx={sx}>
            <Box display="flex">
                <HistoryButton undo />
                <HistoryButton redo />

                <BoldButton />
                <ItalicButton />

                <OrderedListElement.ToolbarButton />
                <UnorderedListElement.ToolbarButton />

                <MultiButton
                    formats={["heading"]}
                    baseButton={
                        <BlockButton format="heading" attributes={{ level: 3 }}>
                            <FormatSizeIcon />
                        </BlockButton>
                    }
                >
                    <BlockButton format="heading" attributes={{ level: 3 }}>
                        <Looks3Icon />
                    </BlockButton>
                    <BlockButton format="heading" attributes={{ level: 4 }}>
                        <Looks4Icon />
                    </BlockButton>
                    <BlockButton format="heading" attributes={{ level: 5 }}>
                        <Looks5Icon />
                    </BlockButton>
                </MultiButton>

                <LinkElement.ToolbarButton />
                <QuoteElement.ToolbarButton />
                {mode === "full" && (
                    <>
                        <ImageElement.ToolbarButton />
                        <VideoElement.ToolbarButton />
                        <OEmbedElement.ToolbarButton />
                        <IFrameElement.ToolbarButton />
                        <FootnoteElement.ToolbarButton />
                        <MapElement.ToolbarButton />
                    </>
                )}
            </Box>
            <Box display="flex">
                {setFullscreen && (
                    <IconButton
                        onClick={() => setFullscreen(!fullscreen)}
                        size="small"
                    >
                        {fullscreen ? (
                            <FullscreenExitIcon />
                        ) : (
                            <FullscreenIcon />
                        )}
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};

export default Toolbar;
