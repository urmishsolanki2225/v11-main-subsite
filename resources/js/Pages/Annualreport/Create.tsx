import React, { useState, useEffect } from "react";

import { Inertia } from "@inertiajs/inertia";
import {
    Box,
    Select,
    MenuItem,
    Button,
    FormControl,
    OutlinedInput,
    InputLabel,
    Typography,
    Backdrop,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import route from "ziggy-js";

import LanguagePicker from "../../Components/General/LanguagePicker";
import { AppBarHeader, ContentScroll } from "../../Layout";

interface IProps {
    types: { [key: string]: string };
    month: any;
    year: any;
    selectedTypes: any;
}
const Create: React.FC<IProps> = ({ types, month, year, selectedTypes }) => {
    const [type, setType] = useState<string>(selectedTypes || "");
    const [isValid, setIsValid] = useState(false);
    const [langs, setLangs] = useState<string[]>([]);

    const [selectedMonth, setSelectedMonth] = useState(month || "");
    const [selectedYear, setSelectedYear] = useState(year || "");
    const months = Array.from({ length: 12 }, (_, index) => ({
        value: (index + 1).toString(),
        label: new Date(0, index).toLocaleString("en", { month: "long" }),
    }));
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1995 + 1 }, (_, index) => {
        const year = currentYear - index;
        return { value: year.toString(), label: year.toString() };
    });

    const [open, setOpen] = React.useState(false);
    const onCreate = () => {
        setIsValid(false);
        setOpen(true);
        const params: any = {
            type,
            selectedMonth,
            selectedYear,
            languages: langs || [],
        };
        Inertia.post(route("admin.annualreport.store").toString(), params);
    };
    useEffect(() => {
        setIsValid(
            (type === "summary" && Boolean(selectedYear)) ||
                (type !== "summary" &&
                    langs.length > 0 &&
                    Boolean(type) &&
                    Boolean(selectedYear) &&
                    Boolean(selectedMonth))
        );
    }, [type, selectedMonth, selectedYear, langs]);

    return (
        <>
            <AppBarHeader title="Create Annual Report" />
            <ContentScroll>
                {open && (
                    <Backdrop
                        sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        open={open}
                    >
                        <CircularProgress color="primary" />
                    </Backdrop>
                )}
                <Box p={2}>
                    <Paper sx={{ p: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="body1">
                                    Create an Annual Report of a specific type.
                                    Note that the type can <strong>not</strong>{" "}
                                    be changed later.
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
                            {type !== "summary" ? (
                                <>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            Content languages
                                        </Typography>
                                        <Typography variant="body1">
                                            Select the languages for which you
                                            will provide content now, others can
                                            be added later.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LanguagePicker onChange={setLangs} />
                                    </Grid>
                                </>
                            ) : (
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        {/* <strong>Note:</strong><br/>
                  We are generating content from yearly highlights.<br/>
                  English is auto-generated through ChatGPT, while French and Spanish can be added manually. <br/>
                  Please be patient; it'll take a moment. */}
                                    </Typography>
                                </Grid>
                            )}
                            {type !== "" && (
                                <>
                                    <Grid item xs={12}>
                                        <FormControl
                                            sx={{ m: 1, width: 300 }}
                                            style={{ marginLeft: "0px" }}
                                        >
                                            <InputLabel id="year-label">
                                                Year*
                                            </InputLabel>
                                            <Select
                                                labelId="year-label"
                                                id="year"
                                                name="year"
                                                value={selectedYear}
                                                onChange={(e) =>
                                                    setSelectedYear(
                                                        e.target.value
                                                    )
                                                }
                                                input={
                                                    <OutlinedInput label="Year" />
                                                }
                                            >
                                                {years.map((year) => (
                                                    <MenuItem
                                                        key={year.value}
                                                        value={year.value}
                                                    >
                                                        {year.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {type == "highlight" && (
                                            <>
                                                <FormControl
                                                    sx={{ m: 1, width: 300 }}
                                                >
                                                    <InputLabel id="month-label">
                                                        Month*
                                                    </InputLabel>
                                                    <Select
                                                        labelId="month-label"
                                                        id="month"
                                                        name="month"
                                                        value={selectedMonth}
                                                        onChange={(e) =>
                                                            setSelectedMonth(
                                                                e.target.value
                                                            )
                                                        }
                                                        input={
                                                            <OutlinedInput label="Month" />
                                                        }
                                                    >
                                                        {months.map((month) => (
                                                            <MenuItem
                                                                key={
                                                                    month.value
                                                                }
                                                                value={
                                                                    month.value
                                                                }
                                                            >
                                                                {month.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </>
                                        )}
                                    </Grid>
                                </>
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
