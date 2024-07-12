import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { FigureFloatStyles } from "../../../../Config";
import { ImageResource, findContent } from "../../../../Models";
import { useLanguage } from "../../../../Utils/LanguageContext";
import useImageUrl from "../../../../Utils/useImageUrl";
import { IPaneProps } from "../../Toolbar/ButtonDialog";
import FloatSelect from "../../Toolbar/FloatSelect";

import { ImageAttributes, ImageElementType } from "./type";

type IProps = IPaneProps<ImageElementType>;
const ImagePane: React.FC<IProps> = ({ item, onChange }) => {
    const [error, setError] = useState<string>();
    const [caption, setCaption] = useState<string>();
    const [floatStyle, setFloatStyle] = useState<FigureFloatStyles>("full");
    const [imageResource, setImageResource] = useState<ImageResource>();
    const [attributes, setAttributes] = useState<Partial<ImageAttributes>>({
        dataType: "image",
    });
    const language = useLanguage();
    const imgUrl = useImageUrl(imageResource);

    useEffect(() => {
        if (!item) {
            return;
        }
        const content = findContent(item, language || "*");
        if (!content) {
            setError("No image content found, this is an error");
            return;
        }
        const image = content.images[0];
        if (!image) {
            setError("No image details found, this is an error");
            return;
        }
        setError(undefined);
        setImageResource(image);
        setCaption(content.subtitle);
        setAttributes((attr) => ({
            ...attr,
            dataType: "image",
            dataId: String(item.id),
        }));
    }, [item, language]);

    useEffect(() => {
        setAttributes((attr) => ({ ...attr, url: imgUrl }));
    }, [imgUrl]);

    useEffect(() => {
        setAttributes((attr) => ({ ...attr, float: floatStyle }));
    }, [floatStyle]);

    useEffect(() => {
        onChange({
            ...attributes,
            type: "image",
            children: [
                { type: "caption", children: [{ text: caption || "" }] },
            ],
        });
    }, [attributes, caption, onChange]);

    return (
        <>
            <Box>
                {error && <Typography color="error">{error}</Typography>}
                <Box display="flex" flexDirection="column">
                    <img
                        src={attributes.url}
                        style={{ maxWidth: 200, maxHeight: 200 }}
                    />
                    <FloatSelect value={floatStyle} onChange={setFloatStyle} />
                </Box>
            </Box>
        </>
    );
};

export default ImagePane;
