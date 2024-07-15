import React, { useEffect, useState } from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";

import { AvailableLanguages } from "../../Config";
//Added by Cyblance for Subsite section start
import { GetSubsite, Page } from "@/Models";
import { usePage } from "@inertiajs/inertia-react";
interface IProps {
    onChange: (languages: string[]) => void;
    initialLanguages?: any;
}
const LanguagePicker: React.FC<IProps> = ({ onChange, initialLanguages }) => {     
    const [langs, setLangs] = useState<string[]>(initialLanguages || []);
    //Added by Cyblance for Subsite section end

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

    //Added by Cyblance for Subsite section start
    useEffect(() => {
        setLangs(initialLanguages || []);
    }, [initialLanguages]);
    
    const { subsite } = usePage<Page<GetSubsite>>().props;
    let filteredAvailableLanguages: [string, string][] = [];
    if (subsite && subsite.languages && subsite.languages !== "" && subsite.languages != "*") {
        filteredAvailableLanguages = AvailableLanguages.filter(([code, name]) => {
            return subsite.languages.includes(code) || code === "*";
        });
    } else {
        filteredAvailableLanguages = AvailableLanguages;
    }
    //Added by Cyblance for Subsite section end

    return (
        <FormControl>
            {/* Added by Cyblance for Subsite section start */}
            <FormLabel>Languages *</FormLabel>
            <FormGroup row>
                {filteredAvailableLanguages.map(([code, name]) => (
                    //Added by Cyblance for Subsite section end
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
