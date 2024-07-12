import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { MuiTelInput } from "mui-tel-input";
import { createRoot } from "react-dom/client";
import route from "ziggy-js";

import { getContentTitleOptionLabel } from "../../Components/General/Autocomplete.renderers";
import AutocompleteSingle from "../../Components/General/AutocompleteSingle";
import { Collection, ItemAffiliate } from "../../Models";
import { Themed } from "../Themed";

interface IProps {
    newsletters: string[];
    translations: Record<string, string>;
    lang: { code: string; ei_code: string };
}
export const NewsletterSubscribeForm: React.FC<IProps> = ({
    newsletters,
    translations,
    lang,
}) => {
    const [country, setCountry] = useState<Collection | null>(null);
    const [organisationItem, setOrganisationItem] =
        useState<ItemAffiliate | null>(null);
    const [phonenumber, setPhonenumber] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [orgName, setOrgName] = useState("");
    const [agreed, setAgreed] = useState(false);

    return (
        <Themed>
            <input type="hidden" name="lang" value={lang.ei_code} />
            <h3>{translations["Select your subscriptions"]}</h3>
            {newsletters.map((newsletter) => (
                <label key={newsletter}>
                    <h4>{translations[`${newsletter}_header`]}</h4>
                    <img
                        src={`/images/newsletters/${newsletter}_${lang.code}.png`}
                    />
                    <p>{translations[`${newsletter}_intro`]}</p>
                    <input type="checkbox" name={newsletter} value="on" />
                    <span>{translations["Stay up-to-date"]}</span>
                </label>
            ))}
            <h3>{translations["Your information"]}</h3>
            <TextField
                name="emailaddress"
                value={email}
                type="email"
                required
                onChange={(evt) => setEmail(evt.currentTarget.value)}
                label={translations["Email"]}
            />
            <TextField
                name="firstname"
                label={translations["First name"]}
                value={firstname}
                onChange={(evt) => setFirstname(evt.currentTarget.value)}
                required
            />
            <TextField
                name="lastname"
                label={translations["Last name"]}
                value={lastname}
                onChange={(evt) => setLastname(evt.currentTarget.value)}
                required
            />
            <MuiTelInput
                label={translations["Phone number"]}
                value={phonenumber}
                onChange={setPhonenumber}
                langOfCountryName={lang.code}
                // preferredCountries={
                //     (country?.content as any)?.meta?.country_code
                //         ? [(country?.content as any)?.meta?.country_code]
                //         : []
                // }
            />

            <AutocompleteSingle<Collection>
                label={translations["Country"]}
                value={country}
                onChange={(collection) => setCountry(collection)}
                dataSource={{
                    xhrUrl: route("api.countries.search"),
                    dataNotWrapped: true,
                }}
                autocompleteProps={{
                    fullWidth: true,
                }}
                getOptionLabel={getContentTitleOptionLabel}
            />
            <AutocompleteSingle<ItemAffiliate>
                value={organisationItem}
                onChange={setOrganisationItem}
                label={translations["Union"]}
                dataSource={{
                    xhrUrl: route("api.affiliates.search"),
                    dataNotWrapped: true,
                    filter: { filter: { country_id: country?.id } },
                }}
                getOptionLabel={getContentTitleOptionLabel}
                autocompleteProps={{
                    fullWidth: true,
                    disabled: !country || !!orgName,
                }}
            />
            <TextField
                label={translations["Organisation"]}
                value={orgName}
                disabled={!country || !!organisationItem}
                onChange={(evt) => setOrgName(evt.currentTarget.value)}
            />
            <input
                type="hidden"
                name="organisation"
                value={organisationItem?.content?.title || orgName || ""}
            />
            <input
                type="hidden"
                name="phone"
                value={phonenumber.replace(/\D/g, "")}
            />
            <label className="newsletter_agree">
                <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(evt) => setAgreed(evt.currentTarget.checked)}
                />
                <span>{translations["Policy"]}</span>
            </label>
            <p
                dangerouslySetInnerHTML={{
                    __html: translations[
                        "data_protection_policy_available_here"
                    ],
                }}
            ></p>
            <Button
                variant="contained"
                type="submit"
                disabled={!email || !firstname || !lastname || !agreed}
            >
                {translations["Subscribe"]}
            </Button>
        </Themed>
    );
};

export const setupForm = (props: IProps) => {
    const container = document.getElementById("form_root");
    const root = createRoot(container!); // createRoot(container!) if you use TypeScript
    root.render(<NewsletterSubscribeForm {...props} />);
};
(window as any).setupForm = setupForm;

export default NewsletterSubscribeForm;
