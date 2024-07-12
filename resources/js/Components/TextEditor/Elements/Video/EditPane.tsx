import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { findContent } from "../../../../Models";
import { useLanguage } from "../../../../Utils/LanguageContext";
import { IPaneProps } from "../../Toolbar/ButtonDialog";

import { VideoAttributes, VideoElementType } from "./type";

type IProps = IPaneProps<VideoElementType>;
const VideoEditPane: React.FC<IProps> = ({ item, onChange }) => {
    const [provider, setProvider] = useState<string>();
    const [providerId, setProviderId] = useState<string>();
    const [error, setError] = useState<string>();
    const [attributes, setAttributes] = useState<VideoAttributes>({
        dataType: "video",
    });
    const language = useLanguage();

    useEffect(() => {
        if (!item) {
            return;
        }
        const content = findContent(item, language || "*");
        if (!content) {
            setError("No video content found, this is an error");
            return;
        }
        const video = content.videos[0];
        if (!video) {
            setError("No video details found, this is an error");
            return;
        }
        setError(undefined);
        setProvider(video.provider);
        setProviderId(video.provider_id);
        setAttributes((attr) => ({ ...attr, dataId: String(item.id) }));
    }, [item, language]);

    useEffect(() => {
        switch (provider) {
            case "youtube":
                setAttributes((attr) => ({
                    ...attr,
                    url: `https://www.youtube.com/embed/${providerId}`,
                }));
                break;
            case "vimeo":
                setAttributes((attr) => ({
                    ...attr,
                    url: `https://player.vimeo.com/video/${providerId}`,
                }));
                break;
        }
    }, [provider, providerId]);

    useEffect(() => {
        onChange({
            ...attributes,
            type: "video",
            children: [{ type: "caption", children: [{ text: "" }] }],
        });
    }, [attributes, onChange]);

    return (
        <>
            <Box>
                {error && <Typography color="error">{error}</Typography>}
                <Box>
                    <iframe
                        src={attributes.url}
                        style={{
                            maxWidth: 200,
                            maxHeight: 200,
                        }}
                    />
                </Box>
                {provider} {providerId}
            </Box>
        </>
    );
};

export default VideoEditPane;
