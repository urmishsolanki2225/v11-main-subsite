import React, {
    useState,
    useEffect,
    useCallback,
    useReducer,
    useMemo,
} from "react";

import { Inertia } from "@inertiajs/inertia";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import {
    Box,
    Typography,
    Select,
    MenuItem,
    Button,
    FormControl,
    OutlinedInput,
    InputLabel,
    Snackbar,
    Slide,
    Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { SxProps } from "@mui/material/styles";
import { Delta, formatters } from "jsondiffpatch";
import route from "ziggy-js";
import "jsondiffpatch/dist/formatters-styles/annotated.css";

import { ResourcePicker, VideoMenu } from "@/Components/Browser";
import ContentsEditor from "@/Components/ContentsEditor";
import { Confirm } from "@/Components/General/Confirm";
import ImagesManager from "@/Components/General/ImagesManager";
import { VideoCard } from "@/Components/General/VideoCard";
import MetaInfoManager from "@/Components/MetaInfoManager";
import Section, { SectionSummary } from "@/Components/Section";
import AnnualreportHighlightItemsManager from "@/Components/Section/AnnualreportHighlightItemsManager";
import { AppBarHeader, ContentScroll, useAppContext } from "@/Layout";
import {
    AuthPageProps,
    Annualreport,
    AnnualreportContent,
    isAnnualreportHighlight,
    Item,
} from "@/Models";
import { findTitle } from "@/Models/Content";
import annualreportReducer from "@/Stores/annualreportReducer";
import DispatchProvider from "@/Stores/DispatchProvider";
import jsondiff from "@/Utils/jsondiff";

interface IProps {
    annualreport: Annualreport<"highlight"> | Annualreport<"summary">;
    sx?: SxProps;
}

const Edit: React.FC<IProps & AuthPageProps> = ({
    annualreport: _annualreport,
    can,
}) => {
    const [annualreport, dispatch] = useReducer(
        annualreportReducer,
        _annualreport
    );
    const [diff, setDiff] = useState<Delta>();
    const { needSave, setNeedSave } = useAppContext();
    const [selectedMonth, setSelectedMonth] = useState<number>(
        annualreport.month
    );
    const [selectedYear, setSelectedYear] = useState<number>(annualreport.year);

    useEffect(() => {
        setSelectedYear(annualreport.year);
    }, [annualreport.year]);

    const [addFeedback, setAddFeedback] = useState<{
        severity: "error" | "warning" | "success";
        message: string;
    }>();

    const onChangeContents = useCallback((contents: AnnualreportContent[]) => {
        dispatch({
            type: "patch",
            field: "contents",
            value: contents,
        });
    }, []);

    const onChangeRelatedItems = useCallback(
        (items: Annualreport<"highlight">["items"], message?: string) => {
            dispatch({
                type: "patch",
                field: "items",
                value: items,
            });
            if (message) {
                setAddFeedback({
                    severity: "success",
                    message: message,
                });
            }
        },
        []
    );

    useEffect(() => {
        setNeedSave(!!diff);
    }, [setNeedSave, diff]);

    useEffect(() => {
        dispatch({ type: "annualreport_reset", annualreport: _annualreport });
    }, [_annualreport]);

    useEffect(() => {
        setDiff(jsondiff.diff(_annualreport, annualreport));
    }, [_annualreport, annualreport]);

    const inTrash = Boolean(annualreport.deleted_at);
    const onTrash = () => {
        Inertia.post(
            route("admin.annualreport.trash", { id: annualreport.id })
        );
    };
    const onRestore = () => {
        Inertia.post(
            route("admin.annualreport.restore", { id: annualreport.id })
        );
    };
    const onDestroy = () => {
        Inertia.delete(
            route("admin.annualreport.destroyreport", {
                id: annualreport.id,
                code: 0,
            })
        );
    };

    const onSave = () => {
        Inertia.patch(
            route("admin.annualreport.update", { annualreport }),
            diff,
            { preserveState: false, replace: true }
        );
        setNeedSave(false);
    };

    const onReset = () => {
        dispatch({ type: "annualreport_reset", annualreport: _annualreport });
        setSelectedYear(_annualreport.year);
        setSelectedMonth(_annualreport.month);
    };

    const months = useMemo(
        () =>
            Array.from({ length: 12 }, (_, index) => ({
                value: (index + 1).toString(),
                label: new Date(0, index).toLocaleString("en", {
                    month: "long",
                }),
            })),
        []
    );

    const currentYear = new Date().getFullYear();
    const years = useMemo(
        () =>
            Array.from({ length: currentYear - 1995 + 1 }, (_, index) => {
                const year = currentYear - index;
                return { value: year.toString(), label: year.toString() };
            }),
        [currentYear]
    );

    const onYearChange = (year: any) => {
        if (_annualreport.year == year) {
            setNeedSave(false);
            return false;
        }
        setSelectedYear(year);
        setNeedSave(true);
        dispatch({
            type: "patch",
            field: "year",
            value: year,
        });
    };

    const onMonthChange = (month: any) => {
        if (_annualreport.month == month) {
            setNeedSave(false);
            return false;
        }
        setSelectedMonth(month);
        setNeedSave(true);
        dispatch({
            type: "patch",
            field: "month",
            value: month,
        });
    };

    const [videoItem, setVideoItem] = useState(annualreport.video_item);
    const onVideoAdd = (item?: Item<"resource", "video">) => {
        dispatch({ type: "patch", field: "video_item_id", value: item?.id });
        setVideoItem(item);
    };

    return (
        <DispatchProvider dispatch={dispatch}>
            <AppBarHeader title={`Edit ${annualreport.type}`}>
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
                {addFeedback && (
                    <Snackbar
                        open={true}
                        autoHideDuration={6000}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        onClose={() => setAddFeedback(undefined)}
                        TransitionComponent={Slide}
                    >
                        <Alert severity={addFeedback.severity} elevation={6}>
                            {addFeedback.message}
                        </Alert>
                    </Snackbar>
                )}
                <form autoComplete="off" autoCapitalize="off">
                    <Box padding={2}>
                        <Typography variant="h4">
                            {findTitle(annualreport) ||
                                annualreport.contents[0].title ||
                                "-no title-"}
                        </Typography>
                    </Box>
                    <MetaInfoManager item={annualreport} />
                    <Box p={2}>
                        <Paper sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl
                                        sx={{ m: 1 }}
                                        style={{ marginLeft: "0px" }}
                                        fullWidth
                                    >
                                        <InputLabel id="year-label">
                                            Year*
                                        </InputLabel>
                                        <Select
                                            labelId="year-label"
                                            id="year"
                                            name="year"
                                            value={selectedYear}
                                            onChange={(e) =>
                                                onYearChange(
                                                    Number(e.target.value)
                                                )
                                            }
                                            input={
                                                <OutlinedInput label="Year*" />
                                            }
                                        >
                                            {years.map((year) => (
                                                <MenuItem
                                                    key={year.value}
                                                    value={year.value}
                                                >
                                                    {year.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {annualreport.type !== "summary" && (
                                    <>
                                        <Grid item xs={6}>
                                            <FormControl
                                                sx={{ m: 1 }}
                                                fullWidth
                                            >
                                                <InputLabel id="month-label">
                                                    Month*
                                                </InputLabel>
                                                <Select
                                                    labelId="month-label"
                                                    id="month"
                                                    name="month"
                                                    value={selectedMonth}
                                                    onChange={(e) =>
                                                        onMonthChange(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    input={
                                                        <OutlinedInput label="Month*" />
                                                    }
                                                >
                                                    {months.map((month) => (
                                                        <MenuItem
                                                            key={month.value}
                                                            value={month.value}
                                                        >
                                                            {month.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Paper>
                    </Box>
                    <Section
                        title="Contents"
                        open
                        summary={
                            <SectionSummary
                                contents={[
                                    {
                                        title: "Languages",
                                        text:
                                            annualreport.contents
                                                ?.map(({ lang }) => lang)
                                                .join(", ") || "No content",
                                    },
                                ]}
                            />
                        }
                    >
                        <ContentsEditor<AnnualreportContent>
                            contents={annualreport.contents}
                            fields={["title", "blurb", "content"]}
                            htmlFields={{ content: "full", blurb: "limited" }}
                            onChange={onChangeContents}
                        />
                    </Section>
                    {annualreport.type === "summary" && (
                        <Typography px={4}>
                            The first regular image is used for the tile in the
                            Activity Reports overview listing, the support color
                            is used here as well. If a portrait image is added
                            it is used in the summary on the annual report
                            timeline.
                        </Typography>
                    )}
                    <ImagesManager
                        images={annualreport.all_images}
                        singleImage={annualreport.type === "highlight"}
                        support_color={annualreport.support_color}
                    />
                    {isAnnualreportHighlight(annualreport) && (
                        <>
                            <Section
                                title="Related items"
                                open
                                summary={
                                    <Typography>
                                        {annualreport.items?.length || 0}{" "}
                                        related items
                                    </Typography>
                                }
                            >
                                <AnnualreportHighlightItemsManager
                                    annualreport={annualreport}
                                    onChange={onChangeRelatedItems}
                                />
                            </Section>
                            <Section title="Actions">
                                <Box display="flex" gap={2}>
                                    {inTrash ? (
                                        <>
                                            {can?.annualreports
                                                ?.restoreMany && (
                                                <Confirm onConfirm={onRestore}>
                                                    <Button
                                                        variant="contained"
                                                        startIcon={
                                                            <RestoreFromTrashIcon />
                                                        }
                                                    >
                                                        Restore from Trash
                                                    </Button>
                                                </Confirm>
                                            )}
                                            {can?.annualreports
                                                ?.forceDeleteMany && (
                                                <Confirm onConfirm={onDestroy}>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        startIcon={
                                                            <DeleteForeverIcon />
                                                        }
                                                    >
                                                        Delete permanently
                                                    </Button>
                                                </Confirm>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {can?.annualreports?.deleteMany && (
                                                <Confirm onConfirm={onTrash}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        startIcon={
                                                            <DeleteIcon />
                                                        }
                                                    >
                                                        Move to Trash
                                                    </Button>
                                                </Confirm>
                                            )}
                                        </>
                                    )}
                                </Box>
                            </Section>
                        </>
                    )}
                    {annualreport.type === "summary" && (
                        <Section title="Video (optional)" open>
                            <Typography>
                                If a video is added, it is shown instead of the
                                portrait on the Annual Report page
                            </Typography>
                            {videoItem && (
                                <VideoCard
                                    videoItem={videoItem}
                                    onRemoved={() => onVideoAdd(undefined)}
                                />
                            )}
                            {(!annualreport.video_item || true) && (
                                <ResourcePicker
                                    label={
                                        !annualreport.video_item
                                            ? "Add video"
                                            : "Choose another video"
                                    }
                                    menu={VideoMenu}
                                    onPick={(item) => {
                                        onVideoAdd(item);
                                    }}
                                />
                            )}
                        </Section>
                    )}
                </form>
                {import.meta.env.DEV && (
                    <div>
                        <div>
                            <pre>{JSON.stringify(diff, undefined, 4)}</pre>
                        </div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: diff
                                    ? formatters.annotated.format(
                                          diff || {},
                                          _annualreport
                                      )
                                    : "<p>no diff</p>",
                            }}
                        ></div>
                        <div style={{ whiteSpace: "pre-wrap" }}>
                            {JSON.stringify(annualreport, undefined, 4)}
                        </div>
                    </div>
                )}
            </ContentScroll>
        </DispatchProvider>
    );
};
export default Edit;
