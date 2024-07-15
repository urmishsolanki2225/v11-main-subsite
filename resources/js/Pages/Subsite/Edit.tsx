import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Box, Button, FormControl, FormHelperText, Paper, Grid, InputLabel, MenuItem, Select, TextField, Theme, Typography,
} from "@mui/material";
import route from "ziggy-js";
import { AppBarHeader, ContentScroll, useAppContext } from "../../Layout";
import { AuthPageProps, ErrorPageProps, Subsite } from "../../Models";
import ColorPickerInput from "../../Components/General/ColorPickerInput";
import InputAdornment from '@mui/material/InputAdornment';
import LanguagePicker from "@/Components/General/LanguagePicker";
interface IProps extends AuthPageProps {
    subsiteModel: Subsite;
    is_actives: Record<string, string>;
    get_collection: Record<string, string>;
}
const Edit: React.FC<IProps & ErrorPageProps> = ({
    subsiteModel: subsite,
    errors,
    is_actives,
    get_collection,
    can,
}) => {
    const { needSave, setNeedSave } = useAppContext();
    const [name, setName] = useState(subsite.name);
    // const [address, setAddress] = useState(subsite.address);
    const [region_id, setRegion] = useState(subsite.region_id);
    const [aliase_name, setAliase] = useState(subsite.aliase_name);
    // const [email, setEmail] = useState(subsite.email);
    const [map_url, setMapurl] = useState(subsite.map_url.replace('https://',''));
    // const [phone, setPhone] = useState(subsite.phone);
    // const [fax, setFax] = useState(subsite.fax);
    const [primary_color, setPrimaryCol] = useState(subsite.primary_color);
    // const [secondary_color, setSecondaryCol] = useState(subsite.secondary_color);
    const [is_active, setIsActive] = useState(subsite.is_active);
    const [tracking_code, setTrackingCode] = useState(subsite.tracking_code.replace('G-',''));
    const [view_id, setViewId] = useState(subsite.view_id);
    const [langs, setLangs] = useState<string[]>([]);
    const [initialLangs, setInitialLangs] = useState<string[]>([]);

    const [facebookURL, setFacebookURL] = useState(subsite.facebookURL.replace('https://',''));
    const [youtubeURL, setYoutubeURL] = useState(subsite.youtubeURL.replace('https://',''));
    const [twitterURL, setTwitterURL] = useState(subsite.twitterURL.replace('https://',''));
    const [soundcloudURL, setSoundcloudURL] = useState(subsite.soundcloudURL.replace('https://',''));

    useEffect(() => {
        setNeedSave(
            name !== subsite.name ||
           // address !== subsite.address ||
            region_id !== subsite.region_id ||
            aliase_name !== subsite.aliase_name ||
            // email !== subsite.email ||
            map_url.replace('https://','') !== subsite.map_url.replace('https://','') ||
            // phone !== subsite.phone ||
            // fax !== subsite.fax ||
            primary_color !== subsite.primary_color ||
            // secondary_color !== subsite.secondary_color||
            tracking_code.replace('G-','') !== subsite.tracking_code.replace('G-','') ||
            is_active !== subsite.is_active ||
            view_id !== subsite.view_id ||
            facebookURL.replace('https://','') !== subsite.facebookURL.replace('https://','') ||
            youtubeURL.replace('https://','') !== subsite.youtubeURL.replace('https://','') ||
            twitterURL.replace('https://','') !== subsite.twitterURL.replace('https://','') ||
            soundcloudURL.replace('https://','') !== subsite.soundcloudURL.replace('https://','') ||
            langs.join(',') !== initialLangs.join(',') &&
            langs.length > 0
        );
    }, [setNeedSave, subsite, name,region_id,aliase_name,map_url,is_active,primary_color,tracking_code,view_id, langs, facebookURL, twitterURL, youtubeURL, soundcloudURL]);

    function setColorFunction(result:any){
        const formattedColor = result.startsWith("#") ? result : `#${result}`;
        setPrimaryCol(formattedColor);
    }
    //  function setSecColorFunction(result:any){
    //     const formattedColor = result.startsWith("#") ? result : `#${result}`;
    //     setSecondaryCol(formattedColor);
    // }
    const onReset = () => {
        setName(subsite.name);
        // setAddress(subsite.address);
        // setPhone(subsite.phone);
        // setFax(subsite.fax);
        setRegion(subsite.region_id);
        setAliase(subsite.aliase_name);
        // setEmail(subsite.email);
        setMapurl(subsite.map_url.replace('https://',''));
        setPrimaryCol(subsite.primary_color);
        // setSecondaryCol(subsite.secondary_color);
        setIsActive(subsite.is_active);
        setTrackingCode(subsite.tracking_code.replace('G-',''));
        setViewId(subsite.view_id);
        setLangs(subsite.languages.split(","))
        setMapurl(subsite.facebookURL.replace('https://',''));
        setMapurl(subsite.youtubeURL.replace('https://',''));
        setMapurl(subsite.twitterURL.replace('https://',''));
        setMapurl(subsite.soundcloudURL.replace('https://',''));

    };
    const onSave = () => {
        setNeedSave(false);
        const params: any = { name,region_id,aliase_name,map_url,primary_color,is_active,tracking_code,view_id,languages: langs, facebookURL,youtubeURL, twitterURL, soundcloudURL};
        Inertia.patch(
            route("admin.subsites.update", { subsite }).toString(),params,
        );
    };
    useEffect(() => {
        const error_data = JSON.stringify(errors);
        if(error_data != ""){
            setTrackingCode(subsite.tracking_code.replace('G-',''));
            setMapurl(subsite.map_url.replace('https://',''));
            setViewId(subsite.view_id);
        }
    },[errors]);

    useEffect(() => {
        if (subsite && subsite.languages) {
            const initialLangs = subsite.languages.split(","); // Split the languages string into an array
            setInitialLangs(initialLangs);
            setLangs(initialLangs);
        }
    }, [subsite]);

    return (
        <>
            <AppBarHeader title="Edit Subsite">
                <Button
                    variant="outlined"
                    onClick={onReset}
                    color="secondary"
                    disabled={!needSave}
                >
                    Reset
                </Button>
                <Button
                    variant={needSave ? "contained" : "outlined"}
                    onClick={onSave}
                    color="secondary"
                    disabled={!needSave}
                >
                    Save
                </Button>
            </AppBarHeader>
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
                                            setRegion(e.target.value as any)
                                        }
                                        label="Region Name"
                                        fullWidth
                                    >
                                        {Object.entries(get_collection[0]).map(
                                            ([region_id, label], i) => (
                                                <MenuItem value={region_id} key={i} disabled>
                                                    {label}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
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
                                    fullWidth
                                    disabled = {true}
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
                            {can?.is_active?.update && (
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel>Region Status*</InputLabel>
                                        <Select
                                            value={is_active}
                                            onChange={(e) =>
                                                setIsActive(e.target.value as any)
                                            }
                                            label="Region Status"
                                            fullWidth
                                        >
                                            {Object.entries(is_actives).map(
                                                ([is_active, label], i) => (
                                                    <MenuItem value={is_active} key={i}>
                                                        {label}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                        <FormHelperText>
                                            {errors?.is_active}
                                        </FormHelperText>
                                    </FormControl>
                                    <span style={{color: "red"}}>{ errors?.is_active}</span>
                                </Grid>
                            )}                            
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
                                    value={tracking_code.replace('G-','')}
                                    onChange={(e) => setTrackingCode(e.target.value.replace('G-',''))}
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            G-
                                        </InputAdornment>
                                    ),
                                    }}
                                    fullWidth
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
                                    value={map_url.replace('https://','')}
                                    onChange={(e) => setMapurl(e.target.value.replace('https://',''))}
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
                                <LanguagePicker onChange={setLangs} initialLanguages={langs} />
                                <Typography><strong>Note:</strong> Selected languages are automatically assigned to subsite admins.</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </ContentScroll>
        </>
    );
};
export default Edit;
