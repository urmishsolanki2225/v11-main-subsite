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
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import route from "ziggy-js";

import { AppBarHeader, useAppContext } from "../../Layout";
import { FileResource, ItemContent } from "../../Models";
import usePostData from "../../Utils/usePostData";
import { EditorProps } from "../ContentsEditor";
import InputFile from "../General/InputFile";
import Sorter, { FileResourceSorterRenderer } from "../Sorter";

const EditorFile: React.FC<EditorProps<ItemContent>> = ({
    content,
    onChange,
}) => {
    const [label, setLabel] = useState("");
    const fileInput = useRef<HTMLInputElement>(null);
    const [allowUpload, setAllowUpload] = useState(false);
    const { needSave } = useAppContext();
    const [openUploadDialog, setOpenUploadDialog] = useState(false);

    const {
        post,
        result,
        errors,
        progress,
        isBusy,
        reset: resetPost,
    } = usePostData<{
        success: boolean;
    }>();

    const onFileChange = () => {
        setAllowUpload(Boolean(fileInput.current?.files?.length));
    };

    const onUpload = () => {
        setAllowUpload(false);
        if (!fileInput.current?.files?.length || !content.id) {
            return;
        }
        const data = new FormData();
        data.set("label", label);
        data.set("content_id", `${content.id}`);
        data.append("files[]", fileInput.current.files[0]);
        post(route("admin.resourceitem.file.upload"), data);
    };

    const onChangeFiles = (files: FileResource[]) => {
        onChange("files", files);
    };

    useEffect(() => {
        if (result?.success) {
            Inertia.reload();
            setOpenUploadDialog(false);
        }
    }, [result]);

    useEffect(() => {
        if (openUploadDialog) {
            resetPost();
        }
    }, [openUploadDialog, resetPost]);

    const disableUpload = !content.id || needSave;

    return (
        <>
            <Typography variant="h6">Files</Typography>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                marginBottom={2}
            >
                <Button
                    disabled={disableUpload}
                    onClick={() => setOpenUploadDialog(true)}
                    variant="outlined"
                >
                    Add file
                </Button>
                {disableUpload && (
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        marginLeft={2}
                    >
                        First save before adding files
                    </Typography>
                )}
            </Box>
            {content.files.filter(({ label }) => !label).length > 1 && (
                <Typography variant="body2" color="warning">
                    Note: there are multiple files without a label, this might
                    be confusing for visitors of the website. Please provide
                    labels for each file.
                </Typography>
            )}
            {content.files.length > 0 && (
                <Sorter
                    items={content.files}
                    onChange={onChangeFiles}
                    Renderer={FileResourceSorterRenderer}
                />
            )}
            {openUploadDialog && (
                <Dialog
                    open={true}
                    maxWidth="md"
                    onClose={() => !isBusy && setOpenUploadDialog(false)}
                >
                    <AppBarHeader
                        title={`Add file for ${content.lang.toUpperCase()}`}
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
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Label"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            error={Boolean(errors?.label)}
                            InputLabelProps={{ shrink: true }}
                            helperText={
                                errors?.label ||
                                "optional, but needed when there are multiple files"
                            }
                        />
                        <FormControl
                            variant="outlined"
                            fullWidth
                            error={Boolean(errors?.files)}
                        >
                            <InputLabel shrink>File</InputLabel>
                            <InputFile
                                label="File"
                                ref={fileInput}
                                onChange={onFileChange}
                                // multiple
                            />
                            <FormHelperText>
                                {
                                    errors?.files || " "
                                    // || "possible to upload multiple files"
                                }
                            </FormHelperText>
                        </FormControl>
                        <FormControl fullWidth>
                            <Button
                                disabled={!allowUpload || needSave}
                                onClick={onUpload}
                                startIcon={<CloudUploadIcon />}
                                color="primary"
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

export default EditorFile;
