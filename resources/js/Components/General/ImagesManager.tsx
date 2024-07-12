import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Item from "../../Models/Item";
import usePatcher from "../../Stores/usePatcher";
import { ImageMenu, ResourcePicker } from "../Browser";
import Section, { ImagesSummary } from "../Section";

import ColorPickerInput from "./ColorPickerInput";
import ImageCard from "./ImageCard";

interface IProps {
    images: Item[];
    support_color?: string;
    disableSupportColor?: boolean;
    singleImage?: boolean;
}
const ImagesManager: React.FC<IProps> = ({
    images,
    support_color,
    disableSupportColor = false,
    singleImage = false,
}) => {
    const patch = usePatcher();
    const canAdd = singleImage ? images.length === 0 : true;

    const onRemoved = (image: Item) => {
        patch(
            "all_images",
            images.filter((img) => img.id !== image.id)
        );
    };

    const onAdd = (item: Item) => {
        patch("all_images", [...images, item]);
    };

    const color = support_color ? `#${support_color}` : undefined;
    const onChangeColor = (hex?: string) => {
        patch("support_color", hex?.replace("#", "") || "");
    };

    return (
        <Section
            title={`Image${singleImage ? "" : "s"}${
                disableSupportColor ? "" : " and support color"
            }`}
            open={singleImage && !images.length}
            summary={
                <ImagesSummary
                    images={images}
                    support_color={color}
                    addImageButton={
                        canAdd ? (
                            <ResourcePicker
                                label="Add image"
                                onPick={onAdd}
                                menu={ImageMenu}
                            />
                        ) : undefined
                    }
                />
            }
        >
            <Grid container spacing={2}>
                {images.map((img, i) => (
                    <Grid item xs={3} key={i}>
                        <ImageCard
                            image={img}
                            onRemoved={() => onRemoved(img)}
                            support_color={color}
                        />
                        {/* <ImageLanguagesPicker contents={img.contents} /> */}
                    </Grid>
                ))}
                {canAdd && (
                    <Grid
                        item
                        xs={3}
                        container
                        spacing={0}
                        alignSelf="center"
                        justifyContent="center"
                    >
                        <ResourcePicker
                            label="Add image"
                            onPick={onAdd}
                            menu={ImageMenu}
                        />
                    </Grid>
                )}
                {!disableSupportColor && (
                    <Grid item xs={12}>
                        <ColorPickerInput
                            label="Support color"
                            color={color}
                            onChange={(hex) => onChangeColor(hex)}
                        />
                        <br />
                        <Typography variant="caption">
                            The support color is used in certain situations to
                            provide extra visual differentation.
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Section>
    );
};

export default ImagesManager;
