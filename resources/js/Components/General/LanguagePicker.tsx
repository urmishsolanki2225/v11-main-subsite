import React, { useEffect, useState } from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";

import { AvailableLanguages } from "../../Config";

interface IProps {
    onChange: (languages: string[]) => void;
}
const LanguagePicker: React.FC<IProps> = ({ onChange }) => {
    const [langs, setLangs] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLangs((langs) => {
            if (event.target.checked) {
                return [...langs, event.target.value];
            } else {
                return langs.filter((lang) => lang !== event.target.value);
            }
        });
    };

    useEffect(() => {
        onChange(langs);
    }, [langs, onChange]);

    return (
        <FormControl>
            <FormLabel>Languages</FormLabel>
            <FormGroup row>
                {AvailableLanguages.map(([code, name]) => (
                    <FormControlLabel
                        key={code}
                        value={code}
                        label={name}
                        control={
                            <Checkbox
                                checked={langs.includes(code)}
                                onChange={handleChange}
                                disabled={
                                    code === "*"
                                        ? langs.length > 1 ||
                                          (langs.length === 1 &&
                                              langs[0] !== code)
                                        : langs.includes("*")
                                }
                            />
                        }
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
};

export default LanguagePicker;
