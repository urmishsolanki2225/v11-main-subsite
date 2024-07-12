import React, { useState } from "react";

import { useForm } from "@inertiajs/inertia-react";
import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import route from "ziggy-js";

// import Autocomplete from "../../Components/General/Autocomplete";
import { ManagePartners } from "../../Components/ManagePartners";
import { PlateFormControl } from "../../Components/PlateTextEditor";
import { Collection, DevCoopProjectPartner, findTitle } from "../../Models";
import { Themed } from "../Themed";

interface IForm {
    language: string;
    title: string;
    year_start: number;
    year_end: number;
    partners_benefitting: DevCoopProjectPartner[];
    partners_dev_coop: DevCoopProjectPartner[];
    taxonomy_collection_ids: Collection["id"][];
    description: string;
    objectives: string;
    activities: string;
    outcomes: string;
    url: string;
    public_email: string;
    contact_email: string;
    contact_name: string;
    funding: string;
    budget_currency: string;
    budget_amount: number;
    remark_internal: string;
    image: File | null;
    files: FileList | null;
}

interface IProps {
    taxonomy?: Collection;
}
const SubmissionPage: React.FC<IProps> = ({ taxonomy }) => {
    const [taxonomyMembership, setTaxonomyMembership] = useState<
        Record<Collection["id"], Collection["id"][]>
    >(() => {
        return (
            taxonomy?.sub_collections?.reduce(
                (tax, sub) => ({ ...tax, [sub.id]: [] }),
                {}
            ) || {}
        );
    });

    const { data, setData, errors, setError, clearErrors, post } =
        useForm<IForm>({
            language: ((window as any).language || "en") as string,
            title: "",
            partners_benefitting: [],
            partners_dev_coop: [],
            year_start: new Date().getFullYear(),
            year_end: new Date().getFullYear(),
            taxonomy_collection_ids: [],
            description: "",
            objectives: "",
            activities: "",
            outcomes: "",
            url: "",
            public_email: "",
            contact_email: "",
            contact_name: "",
            funding: "",
            budget_currency: "€",
            budget_amount: 0,
            remark_internal: "",
            image: null,
            files: null,
        });

    const onSubmit = () => {
        // debugger;

        post(route("coop_projects.store"));
    };

    const onBlurRequired = (field: keyof IForm) => {
        if (!data[field]) {
            setError(field, `This field is required`);
        } else {
            clearErrors(field);
        }
    };

    const onChangeTaxonomyMembership = (
        taxonomyCollectionId: Collection["id"],
        subCollections: Collection["id"][] | string
    ) => {
        const subs =
            typeof subCollections === "string"
                ? subCollections.split(",").map((str) => parseInt(str))
                : subCollections;
        const newTaxonomyMembership = {
            ...taxonomyMembership,
            [taxonomyCollectionId]: [...subs],
        };
        setTaxonomyMembership(newTaxonomyMembership);
        setData(
            "taxonomy_collection_ids",
            Object.values(newTaxonomyMembership).flat()
        );
        // setTaxonomyMembership((tax) => {
        //     return { ...tax, [taxonomyCollectionId]: [...subs] };
        // });
    };

    // const onDeleteTaxonomyMembership = (
    //     taxonomyCollectionId: Collection["id"],
    //     subCollectionId: Collection["id"]
    // ) => {
    //     setTaxonomyMembership((tax) => {
    //         return {
    //             ...tax,
    //             [taxonomyCollectionId]: tax[taxonomyCollectionId]
    //                 ? [...tax[taxonomyCollectionId]].filter(
    //                       (id) => id === subCollectionId
    //                   )
    //                 : [],
    //         };
    //     });
    // };

    const checkUrlFormat = () => {
        if (data.url && !data.url.match(/^https?:\/\//)) {
            setError("url", `The URL should start with http:// or https://`);
        } else {
            clearErrors("url");
        }
    };

    const onSetEditorValue = (field: keyof IForm, val: any) => {
        setData(field, JSON.stringify(val));
    };

    return (
        <Themed>
            <Box p={4}>
                <Box
                    display="flex"
                    flexDirection="column"
                    maxWidth={800}
                    alignItems="flex-start"
                >
                    <h2>{`Data entry form Development Cooperation projects`}</h2>
                    <p>
                        This form is for use by EI member organisations carrying
                        out cooperation projects with other EI affiliates.
                        Submitted projects will be added to the EI cooperation
                        database, which can be found{" "}
                        <a href="https://www.ei-ie.org/en/coop_projects">
                            here
                        </a>
                        . If you are collaborating on a project with other
                        cooperation partners, please ensure that the project has
                        not been submitted yet. Please contact us at{" "}
                        <a href="mailto:Solidarity@ei-ie.org">
                            Solidarity@ei-ie.org
                        </a>{" "}
                        if you have any questions
                    </p>
                    <TextField
                        select
                        value={data.language}
                        onChange={(evt) =>
                            setData("language", evt.target.value)
                        }
                        label={`Language`}
                        fullWidth={false}
                        error={Boolean(errors.language)}
                        helperText={
                            errors.language ||
                            `The language used in this data sheet`
                        }
                    >
                        {["en", "es", "fr"].map((lang) => (
                            <MenuItem key={lang} value={lang}>
                                {lang}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        value={data.title}
                        onChange={(evt) => setData("title", evt.target.value)}
                        label={`Project title`}
                        fullWidth
                        error={Boolean(errors.title)}
                        helperText={errors.title || `required`}
                        onBlur={() => onBlurRequired("title")}
                    />
                    <h3>{`Partners`}</h3>
                    <p>{`Add each partner on a separate line, indicating their role in the project and optionally their country. Please use the search box to find a partner in the member database, that way we can automatically link the project to them and their country. If the partner is not a member you can still add them, in that case please provide the country, if applicable.`}</p>
                    <p>{`Note that the order in which partners are listed here is not taken into account; on the published project pages they will be shown grouped by role and then alphabetically by country.`}</p>

                    <h4>Implementing Organizations</h4>
                    <ManagePartners
                        role="benefitting"
                        onChange={(partners) =>
                            setData("partners_benefitting", partners)
                        }
                    />

                    <h4>Cooperation Partners</h4>
                    <ManagePartners
                        role="dev_coop"
                        onChange={(partners) =>
                            setData("partners_dev_coop", partners)
                        }
                    />

                    <h3>{`Project details`}</h3>

                    <Box display="flex" gap={2}>
                        <TextField
                            value={data.year_start || ""}
                            onChange={(evt) =>
                                setData(
                                    "year_start",
                                    parseInt(evt.target.value) || 0
                                )
                            }
                            label={`Year started`}
                            error={Boolean(errors.year_start)}
                            helperText={errors.year_start || `required`}
                            onBlur={() => onBlurRequired("year_start")}
                        />
                        <TextField
                            value={data.year_end || ""}
                            onChange={(evt) =>
                                setData(
                                    "year_end",
                                    parseInt(evt.target.value) || 0
                                )
                            }
                            label={`Year ended`}
                            error={Boolean(errors.year_end)}
                            helperText={errors.year_end || `required`}
                            onBlur={() => onBlurRequired("year_end")}
                        />
                    </Box>
                    {taxonomy?.sub_collections?.map((collection) => (
                        <FormControl
                            key={collection.id}
                            variant="filled"
                            fullWidth
                        >
                            <InputLabel shrink>
                                {findTitle(collection)}
                            </InputLabel>
                            <Select
                                multiple
                                value={taxonomyMembership[collection.id] || []}
                                onChange={(evt) =>
                                    onChangeTaxonomyMembership(
                                        collection.id,
                                        evt.target.value
                                    )
                                }
                                renderValue={(selected) => (
                                    <Box
                                        display="flex"
                                        flexWrap="wrap"
                                        gap={0.5}
                                    >
                                        {selected.map((collId) => (
                                            <Chip
                                                key={collId}
                                                label={findTitle(
                                                    collection.sub_collections!.find(
                                                        ({ id }) =>
                                                            collId === id
                                                    )!
                                                )}
                                                // onDelete={() =>
                                                //     onDeleteTaxonomyMembership(
                                                //         collection.id,
                                                //         collId
                                                //     )
                                                // }
                                            />
                                        ))}
                                    </Box>
                                )}
                            >
                                {collection.sub_collections?.map((sub) => (
                                    <MenuItem key={sub.id} value={sub.id}>
                                        <Checkbox
                                            checked={taxonomyMembership[
                                                collection.id
                                            ].includes(sub.id)}
                                        />
                                        <ListItemText
                                            primary={findTitle(sub)}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                                {collection.content?.subtitle ||
                                    `several choices possible`}
                            </FormHelperText>
                        </FormControl>
                    ))}

                    <PlateFormControl
                        label={`Description`}
                        onChange={(val) => onSetEditorValue("description", val)}
                        helperText={
                            errors.description ||
                            `required, max 1000 characters`
                        }
                        textLimit={1000}
                        error={Boolean(errors.description)}
                    />
                    <PlateFormControl
                        label={`Objectives`}
                        onChange={(val) => onSetEditorValue("objectives", val)}
                        helperText={
                            errors.objectives || `required, max 1000 characters`
                        }
                        textLimit={1000}
                        error={Boolean(errors.objectives)}
                    />
                    <PlateFormControl
                        label={`Activities`}
                        onChange={(val) => onSetEditorValue("activities", val)}
                        helperText={
                            errors.activities || `required, max 1000 characters`
                        }
                        textLimit={1000}
                        error={Boolean(errors.activities)}
                    />
                    <PlateFormControl
                        label={`outcomes`}
                        onChange={(val) => onSetEditorValue("outcomes", val)}
                        helperText={errors.outcomes || `max 1000 characters`}
                        textLimit={1000}
                        error={Boolean(errors.outcomes)}
                    />

                    <TextField
                        value={data.url}
                        onChange={(evt) => setData("url", evt.target.value)}
                        onBlur={checkUrlFormat}
                        label={`Website url`}
                        fullWidth
                        error={Boolean(errors.url)}
                        helperText={errors.url || " "}
                    />
                    <TextField
                        value={data.public_email}
                        onChange={(evt) =>
                            setData("public_email", evt.target.value)
                        }
                        label={`Published Email Address`}
                        fullWidth
                        error={Boolean(errors.public_email)}
                        helperText={errors.public_email || " "}
                    />
                    <FormControl variant="filled" fullWidth margin="dense">
                        <InputLabel shrink>{`Lead Image`}</InputLabel>
                        <FilledInput
                            type="file"
                            inputProps={{ multiple: true }}
                            // value={data.files}
                            onChange={(evt) =>
                                setData(
                                    "image",
                                    (evt.target as HTMLInputElement).files &&
                                        (evt.target as HTMLInputElement).files!
                                            .length
                                        ? (evt.target as HTMLInputElement)
                                              .files![0]
                                        : null
                                )
                            }
                            sx={{ pb: 0.5 }}
                        />
                        <FormHelperText>{`optional`}</FormHelperText>
                    </FormControl>
                    <FormControl variant="filled" fullWidth>
                        <InputLabel shrink>{`Additional files`}</InputLabel>
                        <FilledInput
                            type="file"
                            inputProps={{ multiple: true }}
                            // value={data.files}
                            onChange={(evt) =>
                                setData(
                                    "files",
                                    (evt.target as HTMLInputElement).files
                                )
                            }
                            sx={{ pb: 0.5 }}
                        />
                        <FormHelperText>{`optional, max 3`}</FormHelperText>
                    </FormControl>
                </Box>
                <h2>{`Additional information`}</h2>
                <p>{`The fields below will not be published. Please do provide a contact in case we require clarifications or additional details.`}</p>
                <Box
                    display="flex"
                    flexDirection="column"
                    maxWidth={800}
                    alignItems="flex-start"
                >
                    <TextField
                        value={data.contact_name}
                        onChange={(evt) =>
                            setData("contact_name", evt.target.value)
                        }
                        label={`Contact Person`}
                        fullWidth
                        error={Boolean(errors.contact_name)}
                        helperText={errors.contact_name || `required`}
                        onBlur={() => onBlurRequired("contact_name")}
                    />
                    <TextField
                        value={data.contact_email}
                        onChange={(evt) =>
                            setData("contact_email", evt.target.value)
                        }
                        label={`Contact Email`}
                        fullWidth
                        error={Boolean(errors.contact_email)}
                        helperText={errors.contact_email || `required`}
                        onBlur={() => onBlurRequired("contact_email")}
                    />
                    <TextField
                        value={data.funding}
                        onChange={(evt) => setData("funding", evt.target.value)}
                        label={`Funding`}
                        fullWidth
                        error={Boolean(errors.funding)}
                        helperText={errors.funding || `required`}
                        onBlur={() => onBlurRequired("funding")}
                    />
                    <Box display="flex" gap={2}>
                        <TextField
                            select
                            hiddenLabel
                            // size="small"
                            fullWidth
                            value={data.budget_currency}
                            onChange={(evt) =>
                                setData("budget_currency", evt.target.value)
                            }
                            // label={`Currency`}
                            error={Boolean(errors.budget_currency)}
                            helperText={errors.budget_currency || " "}
                            sx={{ width: 60 }}
                        >
                            {["€", "$"].map((currency) => (
                                <MenuItem key={currency} value={currency}>
                                    {currency}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            value={data.budget_amount || ""}
                            onChange={(evt) =>
                                setData(
                                    "budget_amount",
                                    parseInt(evt.target.value) || 0
                                )
                            }
                            label={`Budget`}
                            error={Boolean(errors.budget_amount)}
                            helperText={errors.budget_amount || " "}
                        />
                    </Box>
                    <TextField
                        value={data.remark_internal}
                        onChange={(evt) =>
                            setData("remark_internal", evt.target.value)
                        }
                        label={`Remarks`}
                        multiline
                        rows={3}
                        fullWidth
                        error={Boolean(errors.remark_internal)}
                        helperText={errors.remark_internal || " "}
                    />
                    <p>{`Please review the information you entered, you can not change it after submitting. The project will be published after review by EiiE.`}</p>
                    <button onClick={() => onSubmit()}>{`Submit`}</button>
                </Box>
            </Box>
        </Themed>
    );
};

export default SubmissionPage;
