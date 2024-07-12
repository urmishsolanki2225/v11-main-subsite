import React, { useEffect, useRef, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import route from "ziggy-js";

import { AppBarHeader, useAppContext } from "../../Layout";
import { findContent, Item, ItemContent } from "../../Models";
import { useLanguage } from "../../Utils/LanguageContext";
import usePostData from "../../Utils/usePostData";
import { ImageBrowse, ResourcePicker } from "../Browser";
import { EditorProps } from "../ContentsEditor";
import ImageCard from "../General/ImageCard";
import InputFile from "../General/InputFile";

const EditorImage: React.FC<EditorProps<ItemContent>> = ({
    itemSubtype,
    content,
    onChange,
}) => {
    // const imgPath = useImageUrl(content.images[0], { w: 300 });
    const lang = useLanguage();
    const fileInput = useRef<HTMLInputElement>(null);
    const [allowUpload, setAllowUpload] = useState(false);
    const [largefileSize, setLargeFileSize] = useState<number>();
    const {
        post,
        result,
        errors,
        reset: resetPost,
        isBusy,
        progress,
    } = usePostData<{ success: boolean }>();
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const { needSave } = useAppContext();

    useEffect(() => {
        if (result?.success) {
            Inertia.reload();
            setOpenUploadDialog(false);
        }
    }, [result]);

    const onPick = (item: Item) => {
        const pickContent = findContent(item, lang) || item.contents[0];
        if (pickContent?.images.length) {
            onChange("images", [{ path: pickContent.images[0].path }]);
        } else {
            // alert
            console.log(
                "no image in picked item, shouldnt happen",
                lang,
                pickContent,
                item
            );
        }
    };

    const onFileChange = () => {
        if (
            fileInput.current?.files?.length &&
            fileInput.current.files[0].size > 10 * 1024 * 1024
        ) {
            setLargeFileSize(
                Math.round(
                    (fileInput.current.files[0].size / (1024 * 1024)) * 10
                ) / 10
            );
        } else {
            setLargeFileSize(undefined);
        }
        setAllowUpload(Boolean(fileInput.current?.files?.length));
    };

    const onUpload = () => {
        if (!fileInput.current?.files?.length || !content.id) {
            return;
        }
        setAllowUpload(false);
        const data = new FormData();
        data.set("content_id", `${content.id}`);
        data.append("file", fileInput.current.files[0]);
        post(route("admin.resourceitem.image.replace"), data);
    };

    useEffect(() => {
        if (openUploadDialog) {
            resetPost();
        }
    }, [openUploadDialog, resetPost]);

    const disableUpload = !content.id || needSave;

    return (
        <>
            <Typography variant="body2">
                The Subtitle field will be used as caption, if present.
            </Typography>
            <Typography variant="h6">Image</Typography>
            <Box display="flex" flexDirection="row">
                <ImageCard
                    imageResource={content.images[0]}
                    imageType={itemSubtype}
                    imageOnly
                    sx={{
                        width: "100%",
                        maxWidth: 350,
                        mr: 2,
                        mb: 1,
                    }}
                />
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                >
                    {!content.id ? (
                        <Typography variant="body1">
                            Save item first in order to replace the image.
                        </Typography>
                    ) : (
                        <>
                            <Typography variant="body2" marginBottom={1}>
                                Replace image for this language, either by
                                picking an existing image or uploading a new
                                file.
                            </Typography>
                            <ResourcePicker
                                label="Find existing image"
                                onPick={onPick}
                                menu={[ImageBrowse]}
                                buttonProps={{
                                    color: "primary",
                                    variant: "outlined",
                                    size: "medium",
                                }}
                            />
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="flex-start"
                                alignItems="start"
                                marginTop={1}
                                padding={0}
                            >
                                <Button
                                    disabled={disableUpload}
                                    onClick={() => setOpenUploadDialog(true)}
                                    variant="outlined"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload a new file
                                </Button>
                                {disableUpload && (
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        First save before uploading a new image
                                        file
                                    </Typography>
                                )}
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
            {openUploadDialog && (
                <Dialog
                    open={true}
                    maxWidth="md"
                    onClose={() => !isBusy && setOpenUploadDialog(false)}
                >
                    <AppBarHeader
                        title={`Upload new image for ${content.lang.toUpperCase()}`}
                        isDialog
                    >
                        <IconButton
                            edge="end"
                            color="inherit"
                            disabled={isBusy}
                            onClick={() => setOpenUploadDialog(false)}
                            aria-label="close"
                            size="large"
                        >
                            <CloseIcon />
                        </IconButton>
                    </AppBarHeader>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        padding={2}
                    >
                        <FormControl
                            variant="outlined"
                            fullWidth
                            error={Boolean(errors?.files)}
                        >
                            <InputLabel shrink>File</InputLabel>
                            <InputFile
                                label="File"
                                ref={fileInput}
                                accept="image/*"
                                onChange={onFileChange}
                                // multiple
                            />
                            <FormHelperText>
                                {errors?.files ||
                                    (largefileSize
                                        ? `Large file: ${largefileSize}MB`
                                        : " ")}
                            </FormHelperText>
                        </FormControl>
                        <FormControl fullWidth>
                            <Button
                                disabled={!allowUpload || needSave}
                                onClick={onUpload}
                                startIcon={<CloudUploadIcon />}
                                color={largefileSize ? "warning" : "primary"}
                                variant="contained"
                            >
                                Upload
                            </Button>
                            <FormHelperText>
                                {needSave
                                    ? "Save the item before adding uploads"
                                    : " "}
                            </FormHelperText>
                        </FormControl>
                        <Box margin={-2} marginTop={2}>
                            <LinearProgress
                                variant="determinate"
                                value={progress ? progress * 100 : 0}
                            />
                        </Box>
                    </Box>
                </Dialog>
            )}
        </>
    );
};

export default EditorImage;
