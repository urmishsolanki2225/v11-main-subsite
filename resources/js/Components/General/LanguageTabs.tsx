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
                        {AvailableLanguages.map(([code, name], i) => (
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
