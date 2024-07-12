import React, { ReactNode } from "react";

import Box from "@mui/material/Box";
import { pascalCase } from "pascal-case";

import Item from "../../Models/Item";
import ImageCard from "../General/ImageCard";

import SectionSummary, { SectionSummaryContent } from "./SectionSummary";

interface IProps {
    images: Item[];
    addImageButton?: ReactNode;
    support_color?: string;
}
export const ImagesSummary: React.FC<IProps> = ({
    images,
    addImageButton,
    support_color,
}) => {
    let contents: SectionSummaryContent[] = [];
    if (images.length === 0) {
        contents.push({ title: "No images", component: addImageButton });
    } else {
        contents = images.slice(0, 2).map((item) => ({
            title: pascalCase(item.subtype?.replace("image.", "") || ""),
            component: (
                <Box sx={{ width: "100%", maxWidth: 200 }}>
                    <ImageCard
                        image={item}
                        imageOnly={true}
                        support_color={support_color}
                    />
                </Box>
            ),
        }));
        contents.push({
            title: "Add image",
            text: images.length === 1 ? "1 image" : `${images.length} images`,
            component: addImageButton,
        });
    }
    return <SectionSummary contents={contents} />;
};

export default ImagesSummary;
