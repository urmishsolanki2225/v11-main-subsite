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
import flatMap from "lodash/flatMap";
import route from "ziggy-js";

import Autocomplete from "../../Components/General/Autocomplete";
import {
    getContentTitleOptionLabel,
    groupByParentCollection,
} from "../../Components/General/Autocomplete.renderers";
import LanguagePicker from "../../Components/General/LanguagePicker";
import { QueryParams } from "../../Components/General/LinkQuery";
import PickGroupRadio from "../../Components/General/PickGroupRadio";
import { AppBarHeader, ContentScroll } from "../../Layout";
import { Collection, findTitle } from "../../Models";

export interface IPrepickGroup {
    label: string;
    filter?: QueryParams;
    onlyChildTypes?: boolean;
    mode?: "radio" | "autocomplete";
    groupByParent?: boolean;
}
interface IProps {
    types: { [key: string]: string };
    subtypes: { [key: string]: { [key: string]: string } };
    collection?: Collection;
    collection_prepick: Record<string, IPrepickGroup[]>;
}
const Create: React.FC<IProps> = ({
    types,
    subtypes,
    collection,
    collection_prepick,
}) => {
    const [type, setType] = useState<string>("");
    const [subtype, setSubtype] = useState<string>("");
    const [subOpen, setSubOpen] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [withCollection] = useState(true);
    const [langs, setLangs] = useState<string[]>([]);
    const [prepickGroups, setPrepickGroups] = useState<IPrepickGroup[]>();
    const [prepickCollectionsGrouped, setPrepickCollectionsGrouped] = useState<
        Record<string, Collection[]>
    >({});
    const [prepickCollections, setPrepickCollections] = useState<Collection[]>(
        []
    );

    const onCreate = () => {
        // Added by Cyblance for disable multi-item create start
        setIsValid(false);
        // Added by Cyblance for disable multi-item create end
        const params: any = {
            type,
            subtype,
            collection_ids: prepickCollections
                .map(({ id }) => id)
                .filter((id) => !!id),
            languages: langs || [],
        };
        if (withCollection && collection) {
            params.collection_id = collection?.id;
        }
        Inertia.post(route("admin.items.store").toString(), params);
    };

    const handleChangeCollections = (
        group: string,
        collections: Collection[]
    ) => {
        setPrepickCollectionsGrouped((prepickCollectionsGrouped) => ({
            ...prepickCollectionsGrouped,
            [group]: collections || [],
        }));
    };

    useEffect(() => {
        setPrepickCollectionsGrouped((prepickCollectionsGrouped) => {
            const result: Record<string, Collection[]> = {};
            prepickGroups?.forEach(
                ({ label }) =>
                    (result[label] = prepickCollectionsGrouped[label] || [])
            );
            return result;
        });
    }, [prepickGroups]);

    useEffect(() => {
        setPrepickCollections(flatMap(prepickCollectionsGrouped));
    }, [prepickCollectionsGrouped]);

    useEffect(() => {
        if (Object.entries(types).length === 1) {
            setType(Object.entries(types)[0][0]);
        }
    }, [types]);

    useEffect(() => {
        if (subtypes[type]) {
            setSubOpen(true);
            setSubtype((sub) => (subtypes[type][sub] ? sub : ""));
        }
    }, [type, subtypes]);

    useEffect(() => {
        setIsValid(
            !!type &&
                (subtypes[type] ? !!subtype : true) &&
                langs.length > 0 &&
                (!prepickGroups?.length || prepickCollections.length > 0)
        );
    }, [type, subtype, subtypes, langs, prepickGroups, prepickCollections]);

    useEffect(() => {
        const groups = [
            ...(collection_prepick[type] || []),
            ...(collection_prepick["default"] || []),
        ];
        if (
            subtype?.startsWith("image") ||
            type === "person" ||
            type === "dev_coop_project" ||
            type === "contact"
        ) {
            setPrepickGroups([]);
        } else if (groups) {
            setPrepickGroups(groups);
        } else {
            setPrepickGroups([]);
        }
    }, [type, subtype, collection_prepick]);

    return (
        <>
            <AppBarHeader title="Create Item" />
            <ContentScroll>
                <Box p={2}>
                    <Paper sx={{ p: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="body1">
                                    Create an item of a specific type. Note that
                                    the type can <strong>not</strong> be changed
                                    later.
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        value={type}
                                        onChange={(e) =>
                                            setType(e.target.value as string)
                                        }
                                        label="Type"
                                        fullWidth
                                    >
                                        {Object.entries(types).map(
                                            ([type, label], i) => (
                                                <MenuItem value={type} key={i}>
                                                    {label}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                {subtypes[type] && (
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel>Subtype</InputLabel>
                                        <Select
                                            value={subtype}
                                            open={subOpen}
                                            onChange={(e) =>
                                                setSubtype(
                                                    e.target.value as string
                                                )
                                            }
                                            disabled={!subtypes[type]}
                                            onClose={() => setSubOpen(false)}
                                            onOpen={() => setSubOpen(true)}
                                            label="Subtype"
                                            fullWidth
                                        >
                                            {!subtypes[type] ? (
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
                                                    subtypes[type]
                                                ).map(([subtype, label], i) => (
                                                    <MenuItem
                                                        value={subtype}
                                                        key={i}
                                                    >
                                                        {label}
                                                    </MenuItem>
                                                ))
                                            )}
                                        </Select>
                                    </FormControl>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6">
                                    Content languages
                                </Typography>
                                <Typography variant="body1">
                                    Select the languages for which you will
                                    provide content now, others can be added
                                    later.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LanguagePicker onChange={setLangs} />
                            </Grid>
                            {collection && (
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        This item will be created in the
                                        collection:{" "}
                                        <strong>{findTitle(collection)}</strong>
                                    </Typography>
                                </Grid>
                            )}
                            {prepickGroups?.length ? (
                                <>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            Collections for this item
                                        </Typography>
                                        <Typography variant="body1">
                                            These are the most common
                                            collections in use, others can be
                                            added later.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} container spacing={2}>
                                        {prepickGroups?.map((group) => (
                                            <Grid
                                                item
                                                xs={12}
                                                key={group.label}
                                            >
                                                {group.mode === "radio" ? (
                                                    <PickGroupRadio
                                                        label={group.label}
                                                        showReset
                                                        dataSource={{
                                                            xhrUrl: route(
                                                                "admin.collections.index"
                                                            ),
                                                            filter: {
                                                                filter: {
                                                                    ...group.filter,
                                                                    status: "published",
                                                                },
                                                            },
                                                            sort: "title",
                                                        }}
                                                        onChange={(
                                                            collections
                                                        ) =>
                                                            handleChangeCollections(
                                                                group.label,
                                                                collections
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <Autocomplete<Collection>
                                                        label={group.label}
                                                        values={
                                                            prepickCollectionsGrouped[
                                                                group.label
                                                            ]
                                                        }
                                                        autocompleteProps={{
                                                            openOnFocus: true,
                                                        }}
                                                        dataSource={{
                                                            xhrUrl: route(
                                                                "admin.collections.index"
                                                            ),
                                                            filter: {
                                                                filter: {
                                                                    ...group.filter,
                                                                    status: "published",
                                                                },
                                                            },
                                                            sort: "title",
                                                        }}
                                                        getOptionLabel={
                                                            getContentTitleOptionLabel
                                                        }
                                                        groupBy={
                                                            group.groupByParent
                                                                ? groupByParentCollection
                                                                : undefined
                                                        }
                                                        onlyChildTypes={
                                                            group.onlyChildTypes
                                                        }
                                                        onChange={(
                                                            collections
                                                        ) =>
                                                            handleChangeCollections(
                                                                group.label,
                                                                collections
                                                            )
                                                        }
                                                    />
                                                )}
                                            </Grid>
                                        ))}
                                    </Grid>
                                </>
                            ) : (
                                <></>
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
                    </Paper>
                </Box>
            </ContentScroll>
        </>
    );
};

export default Create;
