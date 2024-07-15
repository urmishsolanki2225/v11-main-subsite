import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography,FormHelperText,
} from "@mui/material";
import route from "ziggy-js";
import AppBarHeader from "../../Layout/AppBarHeader";
import ContentScroll from "../../Layout/ContentScroll";
import { ErrorPageProps } from "../../Models";
import ColorPickerInput from "../../Components/General/ColorPickerInput";
import InputAdornment from '@mui/material/InputAdornment';
import LanguagePicker from "@/Components/General/LanguagePicker";
interface IProps {
    is_actives: { [key: string]: string };
    get_collection: { [key: string]: string };
    subsite_id:any;
}
const Create: React.FC<IProps & ErrorPageProps> = ({ is_actives, errors,get_collection,subsite_id, }) => {
    const [name, setName] = useState<string>("");
    // const [address, setAddress] = useState<string>("");
    // const [phone, setPhone] = useState<string>("");
    // const [fax, setFax] = useState<string>("");
    // const [email, setEmail] = useState<string>("");
    const [map_url, setMapurl] = useState<string>("");
    const [tracking_code, settrackingCode] = useState<string>("");
    const [view_id, setViewId] = useState<string>("");
    const [primary_color, setPrimaryCol] = useState<string>("");
    // const [secondary_color, setSecondaryCol] = useState<string>("");
    const [region_id, setRegion] = useState<string>("");
    const [aliase_name, setAliase] = useState<string>("");
    const [is_active, setIsActives] = useState<string>("");
    const [langs, setLangs] = useState<string[]>([]);
    const [isValid, setIsValid] = useState(false);

    const [facebookURL, setFacebookURL] = useState<string>("");
    const [youtubeURL, setYoutubeURL] = useState<string>("");
    const [twitterURL, setTwitterURL] = useState<string>("");
    const [soundcloudURL, setSoundcloudURL] = useState<string>("");

    const onCreate = () => {
        setIsValid(false);
        const params: any = { name, is_active, map_url, primary_color, region_id, aliase_name ,tracking_code,view_id, languages: langs || [], facebookURL, youtubeURL, twitterURL, soundcloudURL };
        Inertia.post(route("admin.subsites.store").toString(), params);
    };
    useEffect(() => {
        if (Object.entries(is_actives).length === 1) {
            setIsActives(Object.entries(is_actives)[0][0]);
        }
    }, [is_actives]);
    useEffect(() => {
        if (Object.entries(get_collection).length === 1) {
            setRegion(Object.entries(get_collection)[0][0]);
        }
    }, [get_collection]);

    useEffect(() => {
        setIsValid(Boolean(is_active)
            && Boolean(name)
            // && Boolean(address)
            // && Boolean(phone)
            // && Boolean(fax)
            // && Boolean(email)
           // && Boolean(map_url)
            && Boolean(primary_color)
            // && Boolean(secondary_color)
            && Boolean(aliase_name)
            && Boolean(region_id)
            && langs.length > 0);
    }, [is_active, name,primary_color, aliase_name,region_id, langs,]);

    function setColorFunction(result:any){
         setPrimaryCol(result);
    }
    // function setSecColorFunction(result:any){
    //     setSecondaryCol(result);
    // }
    useEffect(() => {
        const error_data = JSON.stringify(errors);
        if(error_data != ""){
            settrackingCode(tracking_code.replace('G-',''));
            setMapurl(map_url.replace('https://',''));
            setMapurl(facebookURL.replace('https://',''));
            setMapurl(twitterURL.replace('https://',''));
            setMapurl(youtubeURL.replace('https://',''));
            setMapurl(soundcloudURL.replace('https://',''));
        }
    },[errors]);

    return (
        <>
            <AppBarHeader title="Create Subsite" />
            <ContentScroll>
                <Box>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="body1" color="warning">
                            <span style={{color: "red"}}>Fields marked with * are required.</span>
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    label="Subsite Name*"
                                    variant="outlined"
                                    fullWidth
                                />
                                <span style={{color: "red"}}>{ errors?.name}</span>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <TextField
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    label="Address*"
                                    variant="outlined"
                                    fullWidth
                                />
                                <span style={{color: "red"}}>{ errors?.address}</span>
                            </Grid> */}
                            <Grid item xs={6}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel>Region name*</InputLabel>
                                    <Select
                                        value={region_id}
                                        onChange={(e) =>
                                            setRegion(e.target.value as string)
                                        }
                                        label="Region Name*"
                                        fullWidth
                                    >
                                        {Object.entries(get_collection).map(
                                            ([region_id, label], i) => (
                                                <MenuItem value={region_id} key={i} disabled={subsite_id.indexOf(parseInt(region_id))>=0}>
                                                    {label}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                    <FormHelperText>
                                        {"Note: Region name "}<b>{"can't change"}</b> {"later."}
                                    </FormHelperText>
                                </FormControl>
                                    {
                                        errors?.region_id ?
                                        <span style={{color: "red"}}>{"The region name field is required."}</span>
                                        :
                                        null
                                    }
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    value={aliase_name}
                                    onChange={(e) => setAliase(e.target.value)}
                                    label="Aliase Name*"
                                    variant="outlined"
                                    helperText={"Note: Aliase name should be in only LowerCase letter and can't be changed later."}
                                />
                            <span style={{color: "red"}}>{ errors?.aliase_name}</span>
                            </Grid>
                            <Grid item xs={3}>
                                    <TextField
                                    value={"." + window.location.hostname}
                                    label="Host name"
                                    variant="outlined"
                                    disabled
                                />
                            </Grid>
                            {/* <Grid item xs={6}>
                                <TextField
                                    id = "phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    label="Phone*"
                                    variant="outlined"
                                    fullWidth
                                />
                                <span style={{color: "red"}}>{ errors?.phone}</span>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    value={fax}
                                    onChange={(e) => setFax(e.target.value)}
                                    label="Fax number*"
                                    variant="outlined"
                                    fullWidth
                                />
                                <span style={{color: "red"}}>{ errors?.fax}</span>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Email address*"
                                    variant="outlined"
                                    fullWidth
                                />
                                <span style={{color: "red"}}>{ errors?.email}</span>
                            </Grid> */}
                            <Grid item xs={6}>
                                <ColorPickerInput
                                    label='Primary Color*'
                                    color={primary_color}
                                    onChange={primary_color => setColorFunction(primary_color)}
                                />
                                <span style={{color: "red"}}>{ errors?.primary_color}</span>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel>Region Status*</InputLabel>
                                    <Select
                                        value={is_active}
                                        onChange={(e) =>
                                            setIsActives(e.target.value as string)
                                        }
                                        label="Region Status"
                                        fullWidth
                                    >
                                        {Object.entries(is_actives).map(
                                            ([role, label], i) => (
                                                <MenuItem value={role} key={i}>
                                                    {label}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </FormControl>
                                <span style={{color: "red"}}>{ errors?.is_active}</span>
                            </Grid>
                            {/* <Grid item xs={6}>
                                <ColorPickerInput
                                    label='Secondary Color*'
                                    color={secondary_color}
                                    onChange={secondary_color => setSecColorFunction(secondary_color)}
                                />
                                <span style={{color: "red"}}>{ errors?.secondary_color}</span>
                            </Grid> */}
                            <Grid item xs={6}>
                                <TextField
                                    label="Google Analytics Tracking Code"
                                    value={tracking_code}
                                    onChange={(e) => settrackingCode(e.target.value.replace('G-',''))}
                                    fullWidth
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            G-
                                        </InputAdornment>
                                    ),
                                    }}
                                    variant="outlined"
                                />
                                <span style={{color: "red"}}>{ errors?.tracking_code}</span>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Google Analytics Property View Id"
                                    value={view_id}
                                    onChange={(e) => setViewId(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                />
                                <span style={{color: "red"}}>{ errors?.view_id}</span>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={map_url}
                                    onChange={(e) => setMapurl(e.target.value.replace(/^(https?:\/\/)?/, ''))}
                                    label="Map URL"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                https://
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <span style={{color: "red"}}>{ errors?.map_url}</span>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Facebook URL"
                                    value={facebookURL}
                                    onChange={(e) => setFacebookURL(e.target.value.replace(/^(https?:\/\/)?/, ''))}
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                https://
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <span style={{color: "red"}}>{ errors?.facebookURL}</span>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Twitter URL"
                                    value={twitterURL}
                                    onChange={(e) => setTwitterURL(e.target.value.replace(/^(https?:\/\/)?/, ''))}
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                https://
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <span style={{color: "red"}}>{ errors?.twitterURL}</span>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Youtube URL"
                                    value={youtubeURL}
                                    onChange={(e) => setYoutubeURL(e.target.value.replace(/^(https?:\/\/)?/, ''))}
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                https://
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <span style={{color: "red"}}>{ errors?.youtubeURL}</span>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Soundcloud URL"
                                    value={soundcloudURL}
                                    onChange={(e) => setSoundcloudURL(e.target.value.replace(/^(https?:\/\/)?/, ''))}
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                https://
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <span style={{color: "red"}}>{ errors?.soundcloudURL}</span>
                            </Grid>
                            <Grid item xs={12}>
                                <LanguagePicker onChange={setLangs} />
                                <Typography><strong>Note:</strong> Selected languages are automatically assigned to subsite admins.</Typography>
                            </Grid>
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
