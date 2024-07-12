import React, { useEffect, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/RemoveCircle";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { SxProps } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import route from "ziggy-js";

import { ItemSubtype } from "../../Config";
import { useAppContext } from "../../Layout";
import { findContent, ImageResource, Item } from "../../Models";
import { useLanguage } from "../../Utils/LanguageContext";
import useImageUrl from "../../Utils/useImageUrl";

import ButtonConfirmDialog from "./ButtonConfirmDialog";

interface BaseProps {
    // image?: Item;
    // imageResource?: ImageResource;
    // imageType?: ItemSubtype;
    imageOnly?: boolean;
    support_color?: string;
    onRemoved?: () => void;
    sx?: SxProps;
}
interface ImageProps extends BaseProps {
    image?: Item;
    imageResource?: ImageResource;
    imageType?: ItemSubtype;
}
interface ImageResourceProps extends BaseProps {
    image?: never;
    imageResource: ImageResource;
    imageType: ItemSubtype;
}
const ImageCard: React.FC<ImageResourceProps | ImageProps> = ({
    image,
    imageResource,
    imageType,
    imageOnly,
    support_color,
    onRemoved,
    sx,
}) => {
    const [resource, setResource] = useState<ImageResource | undefined>(
        imageResource
    );
    const [caption, setCaption] = useState("");
    const imgPath = useImageUrl(resource, { w: 300 });
    const { needSave } = useAppContext();
    const lang = useLanguage();

    useEffect(() => {
        setResource(imageResource);
    }, [imageResource]);

    useEffect(() => {
        if (!image) {
            return;
        }
        const content =
            findContent(image, lang) || image.contents[0] || image.content;
        if (content?.images?.length && content.images[0].path) {
            setResource(content.images[0]);
            setCaption(content.subtitle || "");
        }
    }, [image, lang]);

    if (!resource || !imgPath) {
        return (
            <Card sx={sx}>
                <CardContent>No image resource found!</CardContent>
            </Card>
        );
    }

    const onEdit = () => {
        Inertia.get(
            route("admin.items.edit", { item: image!.id }).toString(),
            {}
        );
    };

    return (
        <Card sx={sx}>
            <CardMedia
                image={imgPath}
                sx={{
                    backgroundColor: support_color || "background.default",
                    backgroundSize: "contain",
                    paddingTop: `${900 / 16}%`,
                    margin: "0 auto",
                    maxWidth:
                        image?.subtype === "image.square" ||
                        image?.subtype === "image.icon" ||
                        imageType === "image.square" ||
                        imageType === "image.icon"
                            ? `${900 / 16}%`
                            : undefined,
                }}
            />
            {!imageOnly && (
                <>
                    <CardContent>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            padding:
                                                "1px 3px 1px 0px !important",
                                            verticalAlign: "top",
                                            lineHeight: 1.4,
                                        }}
                                        variant="head"
                                    >
                                        type:
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding:
                                                "1px 3px 1px 0px !important",
                                            verticalAlign: "top",
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {(image ? image.subtype : imageType) ??
                                            "normal"}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            padding:
                                                "1px 3px 1px 0px !important",
                                            verticalAlign: "top",
                                            lineHeight: 1.4,
                                        }}
                                        variant="head"
                                    >
                                        caption:
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding:
                                                "1px 3px 1px 0px !important",
                                            verticalAlign: "top",
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {caption ?? "-not set-"}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            padding:
                                                "1px 3px 1px 0px !important",
                                            verticalAlign: "top",
                                            lineHeight: 1.4,
                                        }}
                                        variant="head"
                                    >
                                        languages:
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding:
                                                "1px 3px 1px 0px !important",
                                            verticalAlign: "top",
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {image?.contents
                                            ?.map((c) => c.lang)
                                            .join(", ")}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardActions
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                        disableSpacing
                    >
                        <ButtonConfirmDialog
                            label="Remove"
                            buttonProps={{ size: "small" }}
                            icon={<RemoveIcon />}
                            onConfirm={() => {
                                onRemoved && onRemoved();
                            }}
                        >
                            Remove this image from this context, note that it
                            will not be deleted so it can still be used in other
                            contexts.
                        </ButtonConfirmDialog>
                        <ButtonConfirmDialog
                            label="Edit"
                            buttonProps={{ size: "small" }}
                            icon={<EditIcon />}
                            onConfirm={onEdit}
                            needConfirmation={needSave}
                        >
                            Leave this screen to edit the image, unsaved changes
                            will be lost.
                        </ButtonConfirmDialog>
                    </CardActions>
                </>
            )}
        </Card>
    );
};

export default ImageCard;
