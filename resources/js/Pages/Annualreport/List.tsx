import React, { useEffect, useMemo, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
    Badge,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Select,
    Switch,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useLocalStorage } from "react-use";
import route from "ziggy-js";

import AnnualreportHighlight from "../../Components/AnnualreportHighlight";
import { Confirm } from "../../Components/General/Confirm";
import PublishStatusIcon from "../../Components/General/PublishStatusIcon";
import Listing from "../../Components/Listing";
import useDataSource from "../../Components/useDataSource";
import AppBarHeader from "../../Layout/AppBarHeader";
import { Annualreport, Item } from "../../Models";
import { findTitle } from "../../Models/Content";
import { AuthPageProps, IListingPageProps } from "../../Models/Inertia";
import Paginated from "../../Models/Paginated";
import { LangColumn, makeDateColumn } from "../../Utils/DataGridUtils";

import { LOCALSTORAGE_KEYS } from "@/Config";

interface IProps extends IListingPageProps, AuthPageProps {
    annualreport: any;
    status: number;
    year: number;
    month: number;
    summary: Paginated<Annualreport<"summary">>;
    items: Paginated<Item>;
    tabid: string;
    videos: any;
    summary_video: any;
    main_published_date: any;
    pdf_status: Record<
        string,
        { exists: boolean; busy: boolean; link?: string }
    >;
}

const AnnualList: React.FC<IProps> = ({
    tabid,
    summary,
    filter: _filter,
    sort,
    annualreport,
    status,
    month,
    year,
    items,
    videos,
    summary_video,
    main_published_date,
    pdf_status,
}) => {
    const [search, setSearch] = useState<string>();
    const [filter, setFilter] = useState(_filter);
    const [prevYear, setPrevYear] = useLocalStorage<number>(
        LOCALSTORAGE_KEYS.ANNUALREPORT_YEAR
    );

    const selectedYear = useMemo(() => {
        return year ? year : prevYear ? prevYear : new Date().getFullYear();
    }, [prevYear, year]);

    const [selectedMonth, setSelectedMonth] = useState(
        month !== null ? `${month}` : ""
    );

    //Summary listing selected year wise
    const dataSourceSummary = useDataSource({
        mode: "inertia",
        paginatedData: summary,
        search,
        filter: {
            ...filter,
            ...(selectedYear && { year: selectedYear }),
            ...(selectedMonth && { month: selectedMonth }),
        },
        sort,
    });
    const columns: GridColDef<Annualreport<"summary">>[] = [
        {
            field: "id",
            headerName: "Id",
            renderCell: (cell) => (
                <>
                    {cell.row.id} <PublishStatusIcon item={cell.row} />
                </>
            ),
        },
        {
            field: "title",
            headerName: "Title",
            renderCell: (cell) => (
                <InertiaLink
                    href={route("admin.annualreport.edit", {
                        id: cell.row.id,
                    }).toString()}
                >
                    {findTitle(cell.row) || "- no title -"}
                </InertiaLink>
            ),
            flex: 3,
        },
        LangColumn,
        {
            field: "year",
            headerName: "Year",
            sortable: false,
        },
        makeDateColumn("created_at", "Created at"),
        makeDateColumn("updated_at", "Updated at"),
    ];
    useEffect(() => {
        setFilter(_filter);
    }, [_filter]);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1995 + 1 }, (_, index) => {
        const year = currentYear - index;
        return { value: year.toString(), label: year.toString() };
    });
    const monthOptions = Array.from({ length: 12 }, (_, index) => {
        return {
            value: (index + 1).toString(),
            label: new Date(0, index).toLocaleString("en", { month: "long" }),
        };
    });

    const handleYearChange = (year: number, id: string) => {
        setPrevYear(year);
        Inertia.get(route("admin.annualreports.tabbing", { id: id }), {
            year,
            trashed: showTrashed == 1 ? "only" : "",
        });
    };

    //Handle Published Report in frontend
    const handlePublish = (year: any) => {
        Inertia.get(route("admin.annualreport.publishedreport"), { year });
    };

    //Trashed Item Listed with enable and disable
    // const [showTrashed, setShowTrashed] = useState<number>(status);
    const showTrashed = status;
    const handleToggleShowTrashed = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        event.stopPropagation();
        Inertia.get(route("admin.annualreports.tabbing", { id: 1 }), {
            year: selectedYear,
            trashed: showTrashed == 0 ? "only" : "",
        });
    };

    //Listing of Headline(Item - Article and Library)
    const dataSourceItems = useDataSource({
        mode: "inertia",
        paginatedData: items,
        search,
        filter: {
            ...filter,
            ...(selectedYear && { year: selectedYear }),
            ...(selectedMonth && { month: selectedMonth }),
        },
        sort,
    });
    //Headline show in Frontend Display
    const handleToggleChange = (id: any, year: any, month: any) => {
        Inertia.post(
            route("admin.annualreport.hideItem", { id, year, month }),
            {
                preserveState: true,
            }
        );
    };
    const columnsItem: GridColDef[] = [
        {
            field: "id",
            headerName: "Id",
            renderCell: (cell) => (
                <>
                    {cell.row.id} <PublishStatusIcon item={cell.row as Item} />
                </>
            ),
        },
        {
            field: "title",
            headerName: "Title",
            renderCell: (cell) => (
                <InertiaLink
                    href={route("admin.items.edit", {
                        id: cell.row.id,
                    }).toString()}
                >
                    {findTitle(cell.row as Item) ||
                        (cell.row as Item).contents[0]?.title ||
                        "- no title -"}
                </InertiaLink>
            ),
            flex: 3,
        },
        LangColumn,
        {
            field: "Hide",
            headerName: "Change Status",
            renderCell: (cell) => (
                <Switch
                    checked={cell.row.annual_headline == "1"}
                    onChange={() =>
                        handleToggleChange(
                            cell.row.id,
                            selectedYear,
                            selectedMonth
                        )
                    }
                    color="primary"
                />
            ),
            sortable: false,
            flex: 1,
        },
        {
            field: "type",
            headerName: "Type",
        },
        makeDateColumn("publish_at"),
    ];

    //Trashed Highlight Listing show
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const TabPenalvalue = tabid;
    const handleChangeTabPenal = (
        event: React.SyntheticEvent,
        newValue: string
    ) => {
        Inertia.get(route("admin.annualreports.tabbing", { id: newValue }), {
            year: selectedYear,
        });
    };

    //Video Resources Add and Validation
    const [error, setError] = useState("");
    const youtubeRegex = /^[a-zA-Z0-9_-]{11}$/;
    const vimeoRegex = /^[0-9]+$/;

    const [isValid, setIsValid] = useState(false);
    const [provider, setProvider] = useState("");
    const [provider_id, setProvider_id] = useState("");

    const handleProviderChange = (event: any) => {
        setProvider(event.target.value);
        setProvider_id("");
        setError("");
    };

    const handleProvider_idChange = (event: any) => {
        setProvider_id(event.target.value);
        setIsValid(true);
        setError("");
    };
    useEffect(() => {
        if (provider_id == summary_video[0]?.provider_id) {
            setIsValid(false);
        }
    }, [provider_id, summary_video]);

    useEffect(() => {
        if (provider == summary_video[0]?.provider) {
            setProvider_id(summary_video[0]?.provider_id);
            setIsValid(false);
        }
    }, [provider, summary_video]);

    const setVideoSave = (provider: any, provider_id: any, year: any) => {
        if (provider === "youtube") {
            if (!provider_id || !youtubeRegex.test(provider_id)) {
                setError(`Please enter a valid ${provider} video ID.`);
                return false;
            }
        } else if (provider === "vimeo") {
            if (
                !provider_id ||
                !vimeoRegex.test(provider_id) ||
                provider_id.length !== 9
            ) {
                setError(
                    `Please enter a valid ${provider} video ID with 9 digits.`
                );
                return false;
            }
        }
        setError("");
        setIsValid(false);
        const params = { provider, provider_id, year };
        Inertia.post(route("admin.annualreport.videos").toString(), params);
    };

    useEffect(() => {
        if (!provider_id) {
            setError("");
        }
    }, [provider_id]);

    useEffect(() => {
        const trimmedProviderId = provider_id?.trim();
        setIsValid(
            provider !== "" &&
                (provider !== summary_video[0]?.provider ||
                    trimmedProviderId !== summary_video[0]?.provider_id?.trim())
        );
    }, [provider, provider_id, summary_video]);

    useEffect(() => {
        if (summary_video[0] && summary_video[0]?.year === selectedYear) {
            setIsValid(false);
            setProvider(summary_video[0].provider);
            setProvider_id(summary_video[0].provider_id);
        } else {
            setProvider("");
            setProvider_id("");
        }
    }, [summary_video, selectedYear]);

    const setRemoveVideo = (year: any) => {
        if (provider_id) {
            const params = { year };
            Inertia.post(
                route("admin.annualreport.removevideos").toString(),
                params
            );
        }
    };

    const onCreate = () => {
        const type = "summary";
        const params = { year, type };
        Inertia.get(route("admin.annualreport.create").toString(), params);
    };

    const [showPDFStatus, setShowPDFStatus] = useState(false);

    const handleGeneratePDFs = () => {
        Inertia.post(route("admin.annualreport.generatePDF"), {
            year: selectedYear,
        });
        Inertia.reload();
    };

    return (
        <>
            <AppBarHeader
                title={"Annual Report " + selectedYear}
                filter={TabPenalvalue == "2" ? filter : undefined}
                onSearch={TabPenalvalue == "2" ? setSearch : undefined}
                onChangeFilter={TabPenalvalue == "2" ? setFilter : undefined}
            >
                <Select
                    size="small"
                    value={selectedYear}
                    onChange={(e) =>
                        handleYearChange(Number(e.target.value), TabPenalvalue)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    style={{
                        borderRadius: "0px",
                        maxHeight: "34px",
                        width: "105px",
                    }}
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        transition: "all 0.4s ease-in-out",
                        "&.Mui-focused": {
                            backgroundColor: "rgba(255,255,255,0.8)",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                    }}
                >
                    {years.map((year) => (
                        <MenuItem key={year.value} value={year.value}>
                            {year.label}
                        </MenuItem>
                    ))}
                </Select>
                {TabPenalvalue == "1" && (
                    <>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => handlePublish(selectedYear)}
                        >
                            Save
                        </Button>

                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => setShowPDFStatus(true)}
                            // onClick={() => handleGeneratePDFs()}
                            // disabled={
                            // showTrashed === 1 || annualreport.length === 0
                            // }
                        >
                            PDF report
                        </Button>
                        {showPDFStatus && (
                            <Dialog
                                open
                                onClose={() => setShowPDFStatus(false)}
                                maxWidth="sm"
                            >
                                <DialogTitle>PDF Reports</DialogTitle>
                                <DialogContent>
                                    <Typography>
                                        It can take a long time for the PDFs to
                                        be generated. The jobs that generate
                                        them run in a background queue.{" "}
                                    </Typography>
                                    <Box mx={-3}>
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ pl: 3 }}>
                                                        Language
                                                    </TableCell>
                                                    <TableCell>
                                                        Exists
                                                    </TableCell>
                                                    <TableCell>
                                                        Generating now
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {["en", "fr", "es"].map(
                                                    (lang) => (
                                                        <TableRow key={lang}>
                                                            <TableCell
                                                                sx={{ pl: 3 }}
                                                            >
                                                                {lang}
                                                            </TableCell>
                                                            <TableCell>
                                                                {pdf_status[
                                                                    lang
                                                                ]?.exists ? (
                                                                    <a
                                                                        href={
                                                                            pdf_status[
                                                                                lang
                                                                            ]
                                                                                .link
                                                                        }
                                                                    >
                                                                        yes
                                                                    </a>
                                                                ) : (
                                                                    "no"
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {pdf_status[
                                                                    lang
                                                                ]?.busy
                                                                    ? "busy"
                                                                    : "no"}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </DialogContent>
                                <DialogActions
                                    sx={{ justifyContent: "space-between" }}
                                >
                                    <Button
                                        variant="text"
                                        onClick={() => {
                                            Inertia.reload();
                                        }}
                                        sx={{ verticalAlign: "baseline" }}
                                    >
                                        Refresh status
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleGeneratePDFs()}
                                    >
                                        Generate PDFs
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        )}
                        <IconButton
                            size="large"
                            onClick={(evt) => setAnchorEl(evt.currentTarget)}
                        >
                            <Badge
                                aria-haspopup="true"
                                badgeContent={showTrashed === 1 ? " " : ""}
                                color={
                                    showTrashed === 1 ? "secondary" : undefined
                                }
                            >
                                <FilterListIcon />
                            </Badge>
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            keepMounted
                            anchorEl={anchorEl}
                            onClose={() => setAnchorEl(null)}
                            open={open}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <MenuItem>
                                <ListItemText>Trashed Highlights</ListItemText>
                                <Switch
                                    checked={showTrashed === 1}
                                    onChange={(event) =>
                                        handleToggleShowTrashed(event)
                                    }
                                />
                            </MenuItem>
                        </Menu>
                    </>
                )}
                {TabPenalvalue == "3" && (
                    <IconButton onClick={onCreate} size="large">
                        <AddIcon />
                    </IconButton>
                )}
                {TabPenalvalue == "2" && (
                    <>
                        <Select
                            size="small"
                            value={`${selectedMonth}`}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            displayEmpty
                            style={{
                                borderRadius: "0px",
                                maxHeight: "34px",
                                width: "130px",
                            }}
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                transition: "all 0.4s ease-in-out",
                                "&.Mui-focused": {
                                    backgroundColor: "rgba(255,255,255,0.8)",
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        border: "none",
                                    },
                            }}
                        >
                            <MenuItem value="" disabled>
                                Month
                            </MenuItem>
                            {monthOptions.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </>
                )}
            </AppBarHeader>
            <Box
                sx={{
                    height: "100vh",
                    pt: 8,
                    boxSizing: "border-box",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <TabContext value={TabPenalvalue}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <TabList
                            onChange={handleChangeTabPenal}
                            aria-label="lab API tabs example"
                            textColor="inherit"
                        >
                            <Tab label="Highlights" value="1" />
                            <Tab label="Headlines" value="2" />
                            <Tab label="Summary" value="3" />
                        </TabList>
                        {TabPenalvalue == "1" && (
                            <Typography style={{ fontSize: "12px" }}>
                                {main_published_date?.main_publish_at && (
                                    <>
                                        Last Published at:&nbsp;
                                        {dayjs(
                                            main_published_date.main_publish_at
                                        ).format("YYYY-MM-DD HH:mm")}
                                    </>
                                )}
                            </Typography>
                        )}
                    </div>
                    <TabPanel value="1" sx={{ p: 0, overflowY: "scroll" }}>
                        <AnnualreportHighlight
                            annualreport={annualreport}
                            year={selectedYear}
                            status={status}
                            showTrashed={showTrashed}
                        />
                    </TabPanel>
                    <TabPanel
                        value="2"
                        style={{ height: "100%" }}
                        sx={{ p: 0 }}
                    >
                        <Listing
                            columns={columnsItem}
                            dataSource={dataSourceItems}
                            selectMode="none"
                        ></Listing>
                    </TabPanel>
                    <TabPanel
                        value="3"
                        style={{ height: "100%" }}
                        sx={{ p: 0 }}
                    >
                        <Listing
                            columns={columns}
                            dataSource={dataSourceSummary}
                            selectMode="none"
                        />
                    </TabPanel>
                    <TabPanel
                        value="4"
                        style={{ height: "100%" }}
                        sx={{ p: 0 }}
                    >
                        <Box p={2}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6">
                                    Video resource
                                </Typography>
                                <div>
                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                    >
                                        {provider === "youtube" ? (
                                            <span>
                                                <strong>Note:</strong> You must
                                                enter a valid YouTube video ID.
                                                It should be 11 characters long
                                                and consist of letters, numbers,
                                                or underscores.
                                            </span>
                                        ) : provider === "vimeo" ? (
                                            <span>
                                                <strong>Note:</strong> You must
                                                enter a valid Vimeo video ID. It
                                                should consist of 9 numeric
                                                characters.
                                            </span>
                                        ) : null}
                                    </Typography>
                                </div>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <FormControl
                                            variant="outlined"
                                            fullWidth
                                        >
                                            <InputLabel>Provider</InputLabel>
                                            <Select
                                                value={provider}
                                                onChange={handleProviderChange}
                                                label="Provider"
                                            >
                                                {videos.map(
                                                    (
                                                        video: any,
                                                        index: any
                                                    ) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={video}
                                                        >
                                                            {video}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            value={provider_id}
                                            onChange={handleProvider_idChange}
                                            label="ID"
                                            variant="outlined"
                                            fullWidth
                                            disabled={provider ? false : true}
                                        />
                                        {error && (
                                            <Typography color="error">
                                                {error}
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            setVideoSave(
                                                provider,
                                                provider_id,
                                                selectedYear
                                            )
                                        }
                                        disabled={!isValid}
                                    >
                                        Save
                                    </Button>
                                    <Confirm
                                        onConfirm={() =>
                                            setRemoveVideo(selectedYear)
                                        }
                                    >
                                        <Button
                                            variant="contained"
                                            //onClick={() => setRemoveVideo(selectedYear)}
                                            disabled={
                                                !summary_video[0]?.provider ||
                                                !summary_video[0]
                                                    ?.provider_id ||
                                                !provider_id
                                            }
                                            style={{ marginLeft: "10px" }}
                                        >
                                            Remove
                                        </Button>
                                    </Confirm>
                                </Grid>
                            </Paper>
                        </Box>
                        {summary_video[0]?.provider && (
                            <Box p={2}>
                                <Paper sx={{ p: 2 }}>
                                    <Typography variant="h6">
                                        Preview
                                    </Typography>
                                    <div>
                                        {summary_video[0]?.provider ===
                                        "youtube" ? (
                                            <iframe
                                                src={`https://www.youtube.com/embed/${summary_video[0]?.provider_id}`}
                                                width="400"
                                                height="200"
                                                frameBorder="0"
                                                allow="autoplay; fullscreen; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <iframe
                                                src={`https://player.vimeo.com/video/${summary_video[0]?.provider_id}`}
                                                width="400"
                                                height="200"
                                                frameBorder="0"
                                                allow="autoplay; fullscreen; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        )}
                                    </div>
                                </Paper>
                            </Box>
                        )}
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    );
};
export default AnnualList;
