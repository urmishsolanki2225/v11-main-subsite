import React, { useCallback, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
    DevCoopProject,
    DevCoopProjectPartner,
    Item,
    ItemContent,
} from "../../Models";
import { EditorProps } from "../ContentsEditor";
import { ManagePartners } from "../ManagePartners";
import { PlateFormControl } from "../PlateTextEditor";

const EditorDevCoopProject: React.FC<EditorProps<ItemContent>> = ({
    content,
    onChange,
}) => {
    const [dcProject, setDcProject] = useState(content.dev_coop_project);
    const [partnersBenefitting, setPartnersBenefitting] = useState(
        () =>
            dcProject?.partners.filter(({ role }) => role === "benefitting") ||
            []
    );
    const [partnersCoop, setPartnersCoop] = useState(
        () =>
            dcProject?.partners.filter(({ role }) => role === "dev_coop") || []
    );

    useEffect(() => {
        setDcProject(content?.dev_coop_project);
    }, [content.dev_coop_project]);

    useEffect(() => {
        setDcProject((dcProject) => {
            if (!dcProject) {
                return dcProject;
            }
            const partners = [...partnersBenefitting, ...partnersCoop].map(
                (partner) => {
                    const clonePartner = { ...partner };
                    delete clonePartner.country_name;
                    return clonePartner;
                }
            );
            return { ...dcProject, partners };
        });
    }, [partnersBenefitting, partnersCoop]);

    const onChangePartners = ({
        benefitting = partnersBenefitting,
        coop = partnersCoop,
    }: {
        benefitting?: DevCoopProjectPartner[];
        coop?: DevCoopProjectPartner[];
    }) => {
        const partners = [...benefitting, ...coop].map((partner) => {
            const clonePartner = { ...partner };
            delete clonePartner.country_name;
            return clonePartner;
        });
        const newDcProject = { ...dcProject, partners };
        setPartnersBenefitting(benefitting);
        setPartnersCoop(coop);
        onChange("dev_coop_project", newDcProject);
    };

    const setField = useCallback(
        (name: string, value?: number | string | Item[]) => {
            setDcProject((dcProject) => {
                if (!dcProject) {
                    return { [name]: value } as unknown as DevCoopProject;
                }
                if ((dcProject as any)[name] === value) {
                    return dcProject;
                } else {
                    return { ...dcProject, [name]: value };
                }
            });
        },
        []
    );

    const setIsReviewed = (isReviewed: boolean) => {
        onChange(
            "dev_coop_project",
            dcProject ? { ...dcProject, is_reviewed: isReviewed } : dcProject
        );
    };

    const setRegional = (regional: boolean) => {
        onChange(
            "dev_coop_project",
            dcProject ? { ...dcProject, regional: !!regional } : dcProject
        );
    };

    const onBlur = () => {
        if (dcProject !== content.dev_coop_project) {
            onChange("dev_coop_project", dcProject);
        }
    };

    if (!dcProject) {
        return (
            <Typography color="error">
                No development cooperation project info found, this is an error.
            </Typography>
        );
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h6">
                    Development cooperation project
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={Boolean(dcProject.is_reviewed)}
                            onChange={(evt, checked) => {
                                setIsReviewed(checked);
                            }}
                        />
                    }
                    label="Reviewed by EiiE staff"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={Boolean(dcProject.regional)}
                            onChange={(evt, checked) => {
                                setRegional(checked);
                            }}
                        />
                    }
                    label="Regional Project"
                />
                <Typography variant="h6">Implementing Organizations</Typography>
                <ManagePartners
                    role="benefitting"
                    onChange={(partners) =>
                        onChangePartners({ benefitting: partners })
                    }
                    initialPartners={partnersBenefitting}
                    adminMode
                />
                <Typography variant="h6">Cooperation Partners</Typography>
                <ManagePartners
                    role="dev_coop"
                    onChange={(partners) =>
                        onChangePartners({ coop: partners })
                    }
                    initialPartners={partnersCoop}
                    adminMode
                />
                <Typography variant="h6">Project details (public)</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            value={dcProject.year_start ?? ""}
                            label="Year started"
                            onChange={(e) =>
                                setField(
                                    "year_start",
                                    parseInt(e.target.value as string)
                                )
                            }
                            onBlur={onBlur}
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={dcProject.year_end ?? ""}
                            label="Year ended"
                            onChange={(e) =>
                                setField(
                                    "year_end",
                                    parseInt(e.target.value as string)
                                )
                            }
                            onBlur={onBlur}
                            margin="dense"
                        />
                    </Grid>
                </Grid>
                <TextField
                    value={dcProject.url ?? ""}
                    label="URL"
                    onChange={(e) => setField("url", e.target.value)}
                    onBlur={onBlur}
                />
                <TextField
                    value={dcProject.public_email ?? ""}
                    label="Published Email Address"
                    onChange={(e) => setField("public_email", e.target.value)}
                    onBlur={onBlur}
                />
                <PlateFormControl
                    label={`Description`}
                    onChange={(val) =>
                        setField("description", JSON.stringify(val))
                    }
                    initialValueAsText={dcProject.description}
                    FormControlProps={{ margin: "dense", onBlur }}
                    // onBlur={onBlur}
                    // helperText={
                    // errors.description || `required, max 1000 characters`
                    // }
                    // textLimit={1000}
                    // error={Boolean(errors.description)}
                />
                <PlateFormControl
                    label={`Objectives`}
                    onChange={(val) =>
                        setField("objectives", JSON.stringify(val))
                    }
                    initialValueAsText={dcProject.objectives}
                    FormControlProps={{ margin: "dense", onBlur }}
                    // onBlur={onBlur}
                    // helperText={
                    //     errors.objectives || `required, max 1000 characters`
                    // }
                    // textLimit={1000}
                    // error={Boolean(errors.objectives)}
                />
                <PlateFormControl
                    label={`Activities`}
                    onChange={(val) =>
                        setField("activities", JSON.stringify(val))
                    }
                    initialValueAsText={dcProject.activities}
                    FormControlProps={{ margin: "dense", onBlur }}
                    // onBlur={onBlur}
                    // helperText={
                    //     errors.activities || `required, max 1000 characters`
                    // }
                    // textLimit={1000}
                    // error={Boolean(errors.activities)}
                />
                <PlateFormControl
                    label={`Outcomes`}
                    onChange={(val) =>
                        setField("outcomes", JSON.stringify(val))
                    }
                    initialValueAsText={dcProject.outcomes}
                    FormControlProps={{ margin: "dense", onBlur }}
                    // onBlur={onBlur}
                    // helperText={errors.outcomes || `max 1000 characters`}
                    // textLimit={1000}
                    // error={Boolean(errors.outcomes)}
                />
                <Typography variant="h6">
                    Additional information (not public)
                </Typography>
                <TextField
                    value={dcProject.contact_name ?? ""}
                    label="Contact Person"
                    onChange={(e) => setField("contact_name", e.target.value)}
                    onBlur={onBlur}
                />
                <TextField
                    value={dcProject.contact_email ?? ""}
                    label="Contact Email"
                    onChange={(e) => setField("contact_email", e.target.value)}
                    onBlur={onBlur}
                />
                <TextField
                    value={dcProject.funding ?? ""}
                    label="Funding"
                    onChange={(e) => setField("funding", e.target.value)}
                    onBlur={onBlur}
                />
                <Box display="flex" gap={2}>
                    <TextField
                        select
                        hiddenLabel
                        // size="small"
                        fullWidth
                        value={dcProject.budget_currency}
                        onChange={(evt) =>
                            setField("budget_currency", evt.target.value)
                        }
                        // label={`Currency`}
                        // error={Boolean(errors.budget_currency)}
                        // helperText={errors.budget_currency || " "}
                        sx={{ width: 60 }}
                    >
                        {["€", "$"].map((currency) => (
                            <MenuItem key={currency} value={currency}>
                                {currency}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        value={dcProject.budget_amount || ""}
                        onChange={(evt) =>
                            setField(
                                "budget_amount",
                                parseInt(evt.target.value) || 0
                            )
                        }
                        label={`Budget`}
                        // error={Boolean(errors.budget_amount)}
                        // helperText={errors.budget_amount || " "}
                    />
                </Box>
                <TextField
                    value={dcProject.remark_internal ?? ""}
                    label="Remarks"
                    onChange={(e) =>
                        setField("remark_internal", e.target.value)
                    }
                    onBlur={onBlur}
                />
            </Grid>
        </Grid>
    );
};

export default EditorDevCoopProject;
