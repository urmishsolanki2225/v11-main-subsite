import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import route from "ziggy-js";

import { IErrors } from "../../Models";
import Item from "../../Models/Item";
import usePostData from "../../Utils/usePostData";

import ChooseExisting from "./ChooseExisting";

interface IProps {
    onCreated: (item: Item) => void;
    onError?: (errors?: IErrors) => void;
    postData?: FormData;
    disableSubmit?: boolean;
    submitTitle: string;
    children?: React.ReactNode;
}
const AbstractResourceCreator: React.FC<IProps> = ({
    onCreated,
    onError,
    postData,
    disableSubmit,
    children,
    submitTitle,
}) => {
    const { post, result, progress, errors, errorMessage } = usePostData<{
        exists?: boolean;
        item: Item;
    }>();
    const [errorMsg, setErrorMsg] = useState(errorMessage);
    const [existingItem, setExistingItem] = useState<Item>();

    useEffect(() => {
        onError && onError(errors);
    }, [errors, onError]);

    useEffect(() => {
        setErrorMsg(errorMessage);
    }, [errorMessage]);

    useEffect(() => {
        if (result) {
            if (result.exists) {
                setExistingItem(result.item);
            } else if (result.item) {
                onCreated(result.item);
            } else {
                setErrorMsg("Unknown error creating item");
            }
        }
    }, [result, onCreated]);

    const onCreate = (force = false) => {
        const data = postData || new FormData();
        if (force) {
            data.append("force", "1");
        }
        setErrorMsg(undefined);
        post(route("admin.resourceitems.store"), data);
    };

    const onCreateNew = (createNew: boolean) => {
        if (createNew) {
            onCreate(true);
        } else {
            onCreated(existingItem!);
        }
    };

    // console.log("progress", progress);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            padding={2}
        >
            {children}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="baseline"
            >
                <Typography color="error">{errorMsg || " "}</Typography>
                <Button
                    onClick={() => onCreate()}
                    color="primary"
                    variant="contained"
                    disabled={disableSubmit}
                >
                    {submitTitle}
                </Button>
            </Box>
            {existingItem && (
                <ChooseExisting item={existingItem} onCreateNew={onCreateNew} />
            )}
            <Box margin={-2} marginTop={2}>
                <LinearProgress
                    variant="determinate"
                    value={progress ? progress * 100 : 0}
                />
            </Box>
        </Box>
    );
};

export default AbstractResourceCreator;
