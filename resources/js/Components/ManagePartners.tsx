import React, { useCallback, useEffect, useRef, useState } from "react";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Autocomplete, {
    AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import route from "ziggy-js";

import {
    findTitle,
    Item,
    ItemAffiliate,
    Collection,
    DevCoopProjectPartner,
} from "../Models";

import { getContentTitleOptionLabel } from "./General/Autocomplete.renderers";
import AutocompleteSingle, {
    AutocompleteControlRef,
} from "./General/AutocompleteSingle";
import useDataSource from "./useDataSource";

interface IProps {
    initialPartners?: DevCoopProjectPartner[];
    onChange: (partners: DevCoopProjectPartner[]) => void;
    role: DevCoopProjectPartner["role"];
    adminMode?: boolean;
}
export const ManagePartners: React.FC<IProps> = ({
    initialPartners = [],
    role,
    onChange,
    adminMode = false,
}) => {
    const [partners, setPartners] =
        useState<DevCoopProjectPartner[]>(initialPartners);
    const [foundMember, setFoundMember] = useState<ItemAffiliate | null>(null);
    const [searchPartner, setSearchPartner] = useState("");
    const [freePartner, setFreePartner] = useState("");
    const [freePartnerAcronym, setFreePartnerAcronym] = useState("");
    const [freePartnerOptions, setFreePartnerOptions] = useState<
        DevCoopProjectPartner[]
    >([]);
    const [memberOptions, setMemberOptions] = useState<ItemAffiliate[]>([]);
    const [partnerCountry, setPartnerCountry] = useState<Collection | null>(
        null
    );
    const memberDataSource = useDataSource<ItemAffiliate>({
        mode: "xhr",
        search: searchPartner,
        xhrUrl: route("api.affiliates.search"),
        dataNotWrapped: true,
        pageSize: 42,
    });
    const countrySearchRef = useRef<AutocompleteControlRef | null>(null);
    const { paginatedData: freePartnerResults } =
        useDataSource<DevCoopProjectPartner>({
            mode: "xhr",
            search: freePartner,
            xhrUrl: route("api.dcpartners.search"),
            dataNotWrapped: true,
            pageSize: 42,
        });

    useEffect(() => {
        if (!memberDataSource.paginatedData?.data?.length) {
            setMemberOptions([]);
            return;
        }
        setMemberOptions([...memberDataSource.paginatedData.data]);
    }, [memberDataSource.paginatedData]);

    useEffect(() => {
        setFreePartnerOptions(freePartnerResults?.data || []);
    }, [freePartnerResults]);

    const addFoundMember = () => {
        if (!foundMember) {
            return;
        }
        const country = foundMember.collections?.find(
            ({ type }) => type === "country"
        );

        const newPartners: DevCoopProjectPartner[] = [
            ...partners,
            {
                role,
                affiliate_item_id: foundMember.id,
                name: `${
                    findTitle(foundMember) ||
                    foundMember.affiliate?.official_name ||
                    ""
                }`,
                acronym: foundMember.affiliate?.acronym,
                country_collection_id: country?.id,
                country_name: country ? findTitle(country) : undefined,
            },
        ];
        setPartners(newPartners);
        onChange(newPartners);
        setSearchPartner("");
        setFoundMember(null);
    };

    const addFreePartner = () => {
        if (!freePartner) {
            return;
        }
        const newPartners: DevCoopProjectPartner[] = [
            ...partners,
            {
                role,
                name: freePartner,
                acronym: freePartnerAcronym || undefined,
                country_collection_id: partnerCountry?.id,
                country_name: partnerCountry
                    ? findTitle(partnerCountry)
                    : undefined,
            },
        ];
        setPartners(newPartners);
        onChange(newPartners);
        setFreePartner("");
        setFreePartnerAcronym("");
        setPartnerCountry(null);
        countrySearchRef.current?.reset();
    };

    const onRemovePartner = (idx: number) => {
        const newPartners = [...partners];
        newPartners.splice(idx, 1);
        setPartners(newPartners);
        onChange(newPartners);
    };

    const onChangePartnerAutocomplete = (
        value: string | ItemAffiliate | null,
        reason: AutocompleteChangeReason
    ) => {
        switch (reason) {
            case "createOption":
                setSearchPartner(value as string);
                break;
            case "selectOption":
                setFoundMember(value as Item);
                break;
            case "clear":
                setFoundMember(null);
                setSearchPartner("");
                break;
        }
    };

    const onAddMembersFromRegion = useCallback(
        (members: ItemAffiliate[]) => {
            const newPartners: DevCoopProjectPartner[] = [
                ...partners,
                ...members.map((affiliate) => {
                    const country = affiliate.collections?.find(
                        ({ type }) => type === "country"
                    );
                    return {
                        role,
                        affiliate_item_id: affiliate.id,
                        name: `${
                            findTitle(affiliate) ||
                            affiliate.affiliate?.official_name ||
                            ""
                        }`,
                        acronym: affiliate.affiliate?.acronym,
                        country_collection_id: country?.id,
                        country_name: country ? findTitle(country) : undefined,
                    };
                }),
            ];
            setPartners(newPartners);
            onChange(newPartners);
        },
        [partners, onChange, role]
    );

    const onClearPartners = () => {
        setPartners([]);
        onChange([]);
    };

    return (
        <>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={10}>
                    <Autocomplete<ItemAffiliate, false, false, false>
                        includeInputInList
                        value={foundMember}
                        options={memberOptions}
                        filterOptions={(x) => x}
                        onChange={(_evt, member, reason) =>
                            onChangePartnerAutocomplete(member, reason)
                        }
                        inputValue={searchPartner}
                        onInputChange={(_event, newInputValue) => {
                            setSearchPartner(newInputValue);
                        }}
                        noOptionsText={`Start typing to search...`}
                        getOptionLabel={getAffiliateOptionLabel}
                        renderOption={(props, option) => (
                            <li {...props} key={option.id}>
                                {getAffiliateOptionLabel(option)}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={`Member Partner`}
                                placeholder={`Type to search`}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        )}
                        isOptionEqualToValue={({ id: optId }, { id: valId }) =>
                            optId === valId
                        }
                        // PopperComponent={(props) => (
                        //     <Popper
                        //         {...props}
                        //         style={{ width: "fit-content" }}
                        //     />
                        // )}
                    />
                </Grid>
                <Grid item xs>
                    <Button
                        variant="contained"
                        disabled={!foundMember}
                        onClick={() => addFoundMember()}
                    >{`Add`}</Button>
                </Grid>
                {role === "benefitting" && (
                    <Grid item xs={12} my={-2} display="flex">
                        <AddMembersFromRegion onAdd={onAddMembersFromRegion} />
                    </Grid>
                )}
                <Grid item xs={adminMode ? 4 : 5}>
                    <Autocomplete<DevCoopProjectPartner, false, false, true>
                        includeInputInList
                        inputValue={freePartner}
                        options={freePartnerOptions}
                        filterOptions={(x) => x}
                        freeSolo
                        onChange={(_evt, partner) => {
                            if (typeof partner === "string") {
                                // the free partner will already be picked up
                            } else {
                                if (partner) {
                                    setFreePartner(partner.name);
                                    setFreePartnerAcronym(
                                        partner.acronym || ""
                                    );
                                }
                                setPartnerCountry(partner?.country || null);
                            }
                        }}
                        onInputChange={(_event, newInputValue) => {
                            setFreePartner(newInputValue);
                        }}
                        noOptionsText={`Start typing to search...`}
                        getOptionLabel={(partner) => {
                            if (typeof partner === "string") {
                                return partner;
                            }
                            return partner.name;
                        }}
                        renderOption={(props, partner) => (
                            <li {...props} key={partner.name}>
                                {partner.name}
                                {partner.acronym ? ` (${partner.acronym})` : ""}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={`Non-member Partner`}
                                placeholder={`Type to search`}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        )}
                        isOptionEqualToValue={(
                            { name: optName },
                            { name: valName }
                        ) => optName === valName}
                        // PopperComponent={(props) => (
                        //     <Popper
                        //         {...props}
                        //         style={{ width: "fit-content" }}
                        //     />
                        // )}
                    />
                </Grid>
                {adminMode && (
                    <Grid item xs={2}>
                        <TextField
                            value={freePartnerAcronym}
                            onChange={(evt) =>
                                setFreePartnerAcronym(evt.target.value)
                            }
                            fullWidth
                            label={`Acronym`}
                        />
                    </Grid>
                )}
                <Grid item xs={adminMode ? 4 : 5}>
                    <AutocompleteSingle<Collection>
                        label={`Partner country`}
                        value={partnerCountry}
                        onChange={(collection) => setPartnerCountry(collection)}
                        dataSource={{
                            xhrUrl: route("api.countries.search"),
                            dataNotWrapped: true,
                        }}
                        getOptionLabel={getContentTitleOptionLabel}
                        autocompleteProps={{
                            fullWidth: true,
                        }}
                        controlRef={countrySearchRef}
                    />
                </Grid>
                <Grid item xs>
                    <Button
                        variant="contained"
                        disabled={!freePartner}
                        onClick={() => addFreePartner()}
                    >{`Add`}</Button>
                </Grid>
            </Grid>

            {partners.length > 0 && (
                <>
                    <Table sx={{ width: 1 }} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>{`Partner`}</TableCell>
                                <TableCell
                                    sx={{ whiteSpace: "nowrap" }}
                                >{`Country`}</TableCell>
                                <TableCell>
                                    <Tooltip
                                        title={`Linked in member database?`}
                                    >
                                        <span>{`Member`}</span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {partners.map((partner, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>
                                        {partner.name}{" "}
                                        {partner.acronym
                                            ? `(${partner.acronym})`
                                            : ""}
                                    </TableCell>
                                    <TableCell>
                                        {partner.country_name ??
                                            (partner.country
                                                ? findTitle(partner.country)
                                                : "")}
                                    </TableCell>
                                    <TableCell>
                                        {partner.affiliate_item_id
                                            ? `yes`
                                            : `no`}
                                    </TableCell>
                                    <TableCell padding="none">
                                        <IconButton
                                            onClick={() => onRemovePartner(idx)}
                                            edge="end"
                                            size="small"
                                        >
                                            <RemoveCircleOutlineIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button
                        variant="text"
                        onClick={onClearPartners}
                        sx={{ textTransform: "none" }}
                    >{`Remove all partners`}</Button>
                </>
            )}
        </>
    );
};

const getAffiliateOptionLabel = (item: Item<"affiliate">) => {
    const country = item.collections?.find(({ type }) => type === "country");
    return `${
        item.affiliate?.official_name || item.content?.title || `${item.id}`
    }${item.affiliate?.acronym ? ` (${item.affiliate?.acronym})` : ""}${
        country?.content?.title ? ` [${country.content.title}]` : ""
    }`;
};

const AddMembersFromRegion: React.FC<{
    onAdd: (members: ItemAffiliate[]) => void;
}> = ({ onAdd }) => {
    const [showAddFromRegion, setShowAddFromRegion] = useState(false);
    const { paginatedData: regionsData } = useDataSource<Collection>({
        mode: "xhr",
        search: showAddFromRegion ? " " : undefined, // non-empty search will trigger the request
        xhrUrl: route("api.regions.search"),
        dataNotWrapped: true,
        pageSize: 42,
    });
    const [regions, setRegions] = useState<Collection[]>([]);
    const [regionId, setRegionId] = useState<Collection["id"]>();

    useEffect(() => {
        setRegions(regionsData?.data || []);
    }, [regionsData]);

    const { paginatedData: membersData } = useDataSource<ItemAffiliate>({
        mode: "xhr",
        filter: regionId ? { filter: { region_id: regionId } } : undefined,
        xhrUrl: route("api.affiliates.search"),
        dataNotWrapped: true,
        pageSize: 1000,
    });

    return (
        <>
            <Button
                variant="text"
                onClick={() => setShowAddFromRegion(true)}
                sx={{ textTransform: "none" }}
            >
                Add all members from region
            </Button>
            {showAddFromRegion && (
                <Dialog
                    maxWidth="xs"
                    fullWidth
                    open
                    onClose={() => setShowAddFromRegion(false)}
                >
                    <DialogTitle>Select region</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth>
                            <InputLabel shrink>{`Region`}</InputLabel>
                            <Select
                                value={
                                    regionId !== undefined ? `${regionId}` : ""
                                }
                                onChange={(evt: SelectChangeEvent) =>
                                    setRegionId(
                                        parseInt(evt.target.value) || undefined
                                    )
                                }
                                fullWidth
                                label={`Region`}
                            >
                                {regions.map((region) => (
                                    <MenuItem value={region.id} key={region.id}>
                                        {region.content?.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="text"
                            onClick={() => setShowAddFromRegion(false)}
                        >{`Cancel`}</Button>
                        <Button
                            disabled={!membersData?.data?.length}
                            onClick={() => {
                                onAdd(membersData?.data || []);
                                setShowAddFromRegion(false);
                            }}
                            variant="contained"
                        >{`Add ${
                            membersData?.data.length || 0
                        } members`}</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};
