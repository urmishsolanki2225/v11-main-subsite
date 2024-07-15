import React, { PropsWithChildren, useEffect, useState } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { AvailableLanguages } from "../../Config";
import Content from "../../Models/Content";
//Added by Cyblance for Subsite section start
import { GetSubsite, Page } from "@/Models";
import { usePage } from "@inertiajs/inertia-react";
//Added by Cyblance for Subsite section end

interface IProps<T> {
    contents: T[];
    language?: string;
    showAdd?: boolean;
    onChange: (lang: string) => void;
    onAdd: (lang: string) => void;
}
const LanguageTabs = <T extends Content>({
    contents,
    language,
    showAdd,
    onChange,
    onAdd,
}: PropsWithChildren<IProps<T>>) => {
    const [languages, setLanguages] = useState<string[]>([]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const onClickAdd = (evt: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(evt.currentTarget);
    };

    const onClickMenuItem = (lang?: string) => {
        setAnchorEl(null);
        lang && onAdd(lang);
    };

    const activeLanguage =
        language && languages.includes(language) ? language : languages[0];

    useEffect(() => {
        setLanguages(contents.map((content) => content.lang));
    }, [contents]);

    //Added by Cyblance for Subsite section start
    const { subsite } = usePage<Page<GetSubsite>>().props;
    let subsiteLanguages: [string, string][] = [];
    if (subsite && subsite.languages && subsite.languages !== "" && subsite.languages != "*") {
        subsiteLanguages = AvailableLanguages.filter(([code, name]) => {
            return subsite.languages.includes(code) || code == "*";
        });
    } else {
        subsiteLanguages = AvailableLanguages;
    }
    //Added by Cyblance for Subsite section end

    return (
        <Grid container alignItems="center" mt={0} mb={1}>
            {showAdd && (
                <Grid item xs={1}>
                    <Button
                        color="secondary"
                        onClick={onClickAdd}
                        size="small"
                        startIcon={<AddCircleIcon />}
                    >
                        language
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => onClickMenuItem()}
                    >
                        {/* Added by Cyblance for Subsite section start */}
                        {AvailableLanguages.filter(([code, name]) => subsiteLanguages.map(([subCode, _]) => subCode).includes(code)).map(([code, name], i) => (
                        // Added by Cyblance for Subsite section start
                            <MenuItem
                                onClick={() => onClickMenuItem(code)}
                                disabled={languages.indexOf(code) >= 0}
                                key={i}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Menu>
                </Grid>
            )}
            {languages.length ? (
                <Grid item xs={10}>
                    <Tabs
                        value={activeLanguage}
                        onChange={(e, newLang) => onChange(newLang)}
                        centered
                    >
                        {languages.map((lang, i) => (
                            <Tab value={lang} label={lang} key={i} />
                        ))}
                    </Tabs>
                </Grid>
            ) : (
                ""
            )}
        </Grid>
    );
};

export default LanguageTabs;
