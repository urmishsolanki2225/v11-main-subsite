import React, { useEffect, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/RemoveCircle";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    SxProps,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import route from "ziggy-js";

import ButtonConfirmDialog from "./ButtonConfirmDialog";

import { Item } from "@/Models";

interface IProps {
    videoItem: Item<"resource", "video">;
    onRemoved: () => void;
    sx?: SxProps;
}
export const VideoCard: React.FC<IProps> = ({ videoItem, onRemoved, sx }) => {
    const [content, setContent] = useState(videoItem.contents.at(0));

    useEffect(() => {
        setContent(videoItem.contents.at(0));
    }, [videoItem]);
    if (!videoItem) {
        return null;
    }

    const videoResource = content?.videos?.at(0);
    const url = !videoResource
        ? null
        : videoResource?.provider === "vimeo"
        ? `https://player.vimeo.com/video/${videoResource.provider_id}`
        : `https://www.youtube-nocookie.com/embed/${videoResource.provider_id}`;

    const onEdit = () => {
        Inertia.get(route("admin.items.edit", { item: videoItem.id }));
    };

    return (
        <Card sx={{ width: 320, ...sx }}>
            <CardContent sx={{ p: 0 }}>
                <Tabs
                    value={content?.lang}
                    onChange={(evt, val) =>
                        setContent(
                            videoItem.contents?.find(({ lang }) => lang === val)
                        )
                    }
                >
                    {videoItem.contents?.map((c) => (
                        <Tab
                            key={c.lang}
                            label={c.lang}
                            value={c.lang}
                            sx={{ minWidth: 40 }}
                        />
                    ))}
                </Tabs>
            </CardContent>
            <CardMedia component="iframe" src={url || ""}></CardMedia>
            <CardContent sx={{ p: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                    {content?.title}
                </Typography>
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
                    Remove this video from this context, note that it will not
                    be deleted so it can still be used in other contexts.
                </ButtonConfirmDialog>
                <ButtonConfirmDialog
                    label="Edit"
                    buttonProps={{ size: "small" }}
                    icon={<EditIcon />}
                    onConfirm={onEdit}
                >
                    Leave this screen to edit the image, unsaved changes will be
                    lost.
                </ButtonConfirmDialog>
            </CardActions>
        </Card>
    );
};
