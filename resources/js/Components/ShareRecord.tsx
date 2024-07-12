import React, { useEffect, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import route from "ziggy-js";

interface IProps {
    RecordLang?: any;
    Id?: string;
    setArray?: any;
    AvailableLang?: any;
}

export const ShareRecord: React.FC<IProps> = ({
    RecordLang,
    Id,
    setArray,
    AvailableLang,
}) => {
    const [dialogOpen, setModelOpen] = React.useState(true);
    const [social_array, setSocialArray] = useState<Record<string, string>>();
    const [show, setShow] = useState(false);
    const [share_typedata, setSech] = React.useState("");
    const [langs, setlangs] = React.useState("");
    const [disableBtn, setdisableBtn] = useState(false);

    const page = setArray.type;
    const handleChangeLanguage = (event: any) => {
        setlangs(event.target.value);
        setSocialArray({ ...social_array, language: event.target.value });
    };
    const handleChangeSech = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSech((event.target as HTMLInputElement).value);
        if (event.target.value == "schedule") {
            setShow(!show);
            setSocialArray({
                ...social_array,
                share_typedata: event.target.value,
            });
        } else if (event.target.value == "share") {
            setShow(false);
            setSocialArray({
                ...social_array,
                share_typedata: event.target.value,
            });
        }
    };
    const onSave = () => {
        setLoader(true);
        setdisableBtn(true);
        Inertia.post(route("admin.share.share"), social_array, {
            preserveState: true,
            onSuccess() {
                setLoader(false);
                setModelOpen(false);
                setdisableBtn(false);
                handleReset();
            },
            onError() {
                setLoader(false);
                setModelOpen(false);
                setdisableBtn(false);
                handleReset();
            },
        });
        setShow(false);
    };
    const handleReset = () => {
        setSech("");
        setSocialArray(undefined);
        setlangs("");
        setErrTranslate("");
        setErrorDate("");
        setLoader(false);
        setdisableBtn(false);
    };
    const handleModelClose = () => {
        setModelOpen(false);
        handleReset();
        setShow(false);
        setLoader(false);
    };
    function setfacebook() {
        setSocialArray({ ...social_array, social: "facebook" });
    }
    function setTwitter() {
        setSocialArray({ ...social_array, social: "twitter" });
    }
    function setLinkedIn() {
        setSocialArray({ ...social_array, social: "linkedin" });
    }
    const setField = (key: string, value: any) => {
        setSocialArray({ ...social_array, schedule_date: value });
    };

    const [errorDate, setErrorDate] = useState("");
    const [errTranslate, setErrTranslate] = useState("") as any;
    const [a11, setLoader] = React.useState(false);
    useEffect(() => {
        if (share_typedata == "" || langs == "" || !social_array?.social) {
            setdisableBtn(true);
        } else {
            setdisableBtn(false);
            setErrTranslate("");
            if (
                (RecordLang.indexOf(langs) == -1 &&
                    RecordLang.indexOf("*") != 0) ||
                social_array?.share_typedata == "schedule"
            ) {
                if (
                    RecordLang.indexOf(langs) == -1 &&
                    RecordLang.indexOf("*") != 0
                ) {
                    setdisableBtn(true);
                    setErrTranslate(
                        "Please translate this record in selected language"
                    );
                }

                if (
                    !social_array?.schedule_date ||
                    social_array?.schedule_date <
                        new Date().toISOString().slice(0, 16)
                ) {
                    setdisableBtn(true);
                    setErrorDate("Please select valid future date");
                }
            }
        }
    }, [
        share_typedata,
        langs,
        social_array,
        RecordLang,
        setdisableBtn,
        errTranslate,
        setErrTranslate,
        setSocialArray,
    ]);
    useEffect(() => {
        if (Id != "") {
            setModelOpen(true);
        }
    }, [setModelOpen, Id]);
    useEffect(() => {
        if (social_array !== undefined && dialogOpen == false) {
            setModelOpen(true);
        }
    }, [social_array, setModelOpen, dialogOpen]);
    useEffect(() => {
        setSocialArray(setArray);
    }, [setArray, setSocialArray]);
    return (
        <Dialog
            open={dialogOpen}
            onClose={handleModelClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Share {page}</DialogTitle>
            <DialogContent>
                <FormControl sx={{ m: 1, minWidth: 500 }}>
                    <InputLabel
                        color="primary"
                        id="demo-simple-select-outlined-label"
                    >
                        Language*
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select"
                        value={langs}
                        onChange={handleChangeLanguage}
                        label="Languages"
                    >
                        {AvailableLang.map(
                            ([is_active, getlabel]: any, i: any) =>
                                is_active != "*" ? (
                                    <MenuItem key={i} value={is_active}>
                                        {getlabel}
                                    </MenuItem>
                                ) : null
                        )}
                    </Select>
                    {/*Added for validation messege of share functionality */}
                    <Typography color="error">{errTranslate}</Typography>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 500 }}>
                    <FormLabel> Select Social Media*</FormLabel>
                    <Grid>
                        <RadioGroup
                            row
                            aria-label="social"
                            name="row-radio-buttons-group"
                        >
                            <Grid>
                                <FormControlLabel
                                    value="fb"
                                    control={<Radio />}
                                    label={<FacebookIcon />}
                                    onChange={() => setfacebook()}
                                />
                            </Grid>
                            <Grid>
                                <FormControlLabel
                                    value="tw"
                                    control={<Radio />}
                                    label={<TwitterIcon />}
                                    onChange={() => setTwitter()}
                                />
                            </Grid>
                            <Grid>
                                <FormControlLabel
                                    value="ld"
                                    control={<Radio />}
                                    label={<LinkedInIcon />}
                                    onChange={() => setLinkedIn()}
                                />
                            </Grid>
                        </RadioGroup>
                    </Grid>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 500 }}>
                    <FormLabel>Select Share Option*</FormLabel>
                    <RadioGroup
                        aria-label="Share"
                        name="share"
                        value={share_typedata}
                        onChange={handleChangeSech}
                    >
                        <FormControlLabel
                            value="share"
                            control={<Radio />}
                            label="Share"
                        />
                        <FormControlLabel
                            value="schedule"
                            control={<Radio />}
                            label="Schedule"
                        />
                    </RadioGroup>
                    {show ? (
                        <TextField
                            sx={{ width: "50%" }}
                            type="datetime-local"
                            value={social_array?.schedule_date || ""}
                            onChange={(e) => setField("date", e.target.value)}
                            inputProps={{
                                min: new Date().toISOString().slice(0, 16),
                                max: "2200-06-14T00:00",
                            }}
                        />
                    ) : null}
                    <Typography color="error">
                        {social_array?.share_typedata === "schedule" &&
                        (!social_array?.schedule_date ||
                            social_array?.schedule_date <
                                new Date().toISOString().slice(0, 16))
                            ? errorDate
                            : ""}
                    </Typography>
                    {a11 ? (
                        <Box component="span" p={2}>
                            <CircularProgress />
                            <Typography> Sharing {page}... </Typography>
                        </Box>
                    ) : null}
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleModelClose}
                    variant="outlined"
                    color="primary"
                >
                    Cancel
                </Button>
                <Button
                    onClick={onSave}
                    variant="outlined"
                    disabled={disableBtn}
                    color="primary"
                >
                    {show ? "Schedule" : "Share"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShareRecord;
