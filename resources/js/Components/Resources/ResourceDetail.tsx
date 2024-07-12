import React, { useEffect, useState } from "react";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";

import Item, { ItemContent } from "../../Models/Item";

const findContent = (
    { contents, content }: { contents?: ItemContent[]; content?: ItemContent },
    lang = "en"
): ItemContent | undefined => {
    if (content?.lang === lang || content?.lang === "*") {
        return content;
    }
    return (
        contents?.find(({ lang: _lang }) => _lang === lang) ||
        contents?.find(({ lang: _lang }) => _lang === "*") ||
        content ||
        (contents?.length ? contents[0] : undefined)
    );
};

interface IProps {
    item: Item;
}
export const ResourceDetail: React.FC<IProps> = ({ item }) => {
    const content = findContent(item);
    const [text, setText] = useState<string>();
    const [url, setUrl] = useState<string>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (!content) {
            console.log("no content found", item);
            setError("- no content found -");
        } else if (!text) {
            if (item.type === "resource") {
                switch (item.subtype) {
                    case "link":
                        if (!content.links?.length) {
                            setError("- no link found -");
                            break;
                        }
                        setText(content.links[0].url);
                        setUrl(content.links[0].url);
                        break;
                    case "file":
                        if (!content.files?.length) {
                            setError("- no file found -");
                            break;
                        }
                        setText(content.files[0].path);
                        setUrl(content.files[0].path);
                        break;
                    case "video":
                        if (!content.videos?.length) {
                            setError("- no video found -");
                            break;
                        }
                        setText(
                            `${content.videos[0].provider}: ${content.videos[0].provider_id}`
                        );
                        switch (content.videos[0].provider) {
                            case "youtube":
                                setUrl(
                                    `https://youtube.com/watch?v=${content.videos[0].provider_id}`
                                );
                                break;
                            case "vimeo":
                                setUrl(
                                    `https://vimeo.com/${content.videos[0].provider_id}`
                                );
                                break;
                            default:
                                setUrl("");
                        }
                        break;
                    default:
                        setError("- unknown resource type -");
                }
            } else {
                //
            }
        }
    }, [content, item, text]);

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            {error ? (
                error
            ) : (
                <>
                    <Box
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "pre",
                            textAlign: "left",
                        }}
                    >
                        {text}
                    </Box>
                    {url && (
                        <a href={url} target="_blank" rel="nofollow noreferrer">
                            <OpenInNewIcon
                                sx={{ fontSize: "1rem" }}
                                color="primary"
                            />
                        </a>
                    )}
                </>
            )}
        </Box>
    );
};

export default ResourceDetail;
