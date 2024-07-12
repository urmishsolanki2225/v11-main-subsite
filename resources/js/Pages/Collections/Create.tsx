import React, { useEffect, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import route from "ziggy-js";

import AppBarHeader from "../../Layout/AppBarHeader";
import ContentScroll from "../../Layout/ContentScroll";
import { Collection, findTitle } from "../../Models";

interface IProps {
    types: { [key: string]: string };
    layouts: { [key: string]: { [key: string]: string } };
    parentCollection?: Collection;
}
const Create: React.FC<IProps> = ({ types, layouts, parentCollection }) => {
    const [type, setType] = useState<string>("");
    const [layout, setLayout] = useState<string>("");
    const [subOpen, setSubOpen] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const onCreate = () => {
        // Added by Cyblance for disable multi-item create start
        setIsValid(false);
        // Added by Cyblance for disable multi-item create end
        const params: any = { type, layout };
        if (parentCollection) {
            params.parent_collection_id = parentCollection.id;
        }
        Inertia.post(route("admin.collections.store").toString(), params);
    };

    useEffect(() => {
        if (layouts[type]) {
            setSubOpen(true);
            setLayout((sub) => (layouts[type][sub] ? sub : ""));
        }
    }, [type, layouts]);

    useEffect(() => {
        setIsValid(!!type && (layouts[type] ? !!layout : true));
    }, [type, layout, layouts]);

    return (
        <>
            <AppBarHeader title="Create Collection" />
            <ContentScroll>
                <Box padding={2}>
                    <Paper>
                        <Box padding={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        Create a collection of a specific type
                                        and layout.
                                        <br />
                                        Note that the type{" "}
                                        <strong>can not</strong> be changed
                                        later, whereas the layout{" "}
                                        <strong>can</strong> be changed.
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel>Type</InputLabel>
                                        <Select
                                            value={type}
                                            onChange={(e) =>
                                                setType(
                                                    e.target.value as string
                                                )
                                            }
                                            label="Type"
                                            fullWidth
                                        >
                                            {Object.entries(types).map(
                                                ([type, label], i) => (
                                                    <MenuItem
                                                        value={type}
                                                        key={i}
                                                    >
                                                        {label}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    {layouts[type] && (
                                        <FormControl
                                            variant="outlined"
                                            fullWidth
                                        >
                                            <InputLabel>Layout</InputLabel>
                                            <Select
                                                value={layout}
                                                open={subOpen}
                                                onChange={(e) =>
                                                    setLayout(
                                                        e.target.value as string
                                                    )
                                                }
                                                disabled={!layouts[type]}
                                                onClose={() =>
                                                    setSubOpen(false)
                                                }
                                                onOpen={() => setSubOpen(true)}
                                                label="Layout"
                                                fullWidth
                                            >
                                                {!layouts[type] ? (
                                                    <MenuItem value="">
                                                        not applicable
                                                    </MenuItem>
                                                ) : (
                                                    (
                                                        <MenuItem value="">
                                                            required
                                                        </MenuItem>
                                                    ) &&
                                                    Object.entries(
                                                        layouts[type]
                                                    ).map(
                                                        (
                                                            [layout, label],
                                                            i
                                                        ) => (
                                                            <MenuItem
                                                                value={layout}
                                                                key={i}
                                                            >
                                                                {label}
                                                            </MenuItem>
                                                        )
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                    )}
                                </Grid>
                                {parentCollection && (
                                    <Grid item xs={12}>
                                        <Typography variant="body1">
                                            This item will be created in the
                                            parent collection:{" "}
                                            <strong>
                                                {findTitle(parentCollection) ??
                                                    "-untitled-"}
                                            </strong>
                                        </Typography>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        onClick={onCreate}
                                        disabled={!isValid}
                                    >
                                        Create
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </ContentScroll>
        </>
    );
};

export default Create;
