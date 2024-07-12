import React, { PropsWithChildren, useEffect, useState } from "react";

import { usePage } from "@inertiajs/inertia-react";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";

import { COLLECTION_ORDERINGS, IMAGE_SUBTYPES } from "../Config";
import {
    Collection,
    Item,
    isImageResource,
    isItem,
    ICollectionPageProps,
    Page,
    //Added by Cyblance for Annual-Reports section start
    Annualreport,
    isCollection,
} from "../Models";
import usePatcher from "../Stores/usePatcher";
import PreviewTextCopy from "../Utils/PreviewTextCopy";

import Section, { SectionSummary } from "./Section";

type MetaType = Item | Collection | Annualreport;
interface IProps<T extends MetaType> {
    item: T;
    // onChange: (key: string, value: any) => void;
}
const MetaInfoManager = <T extends MetaType>({
    item: itemOrCollectionOrAnnualreport,
}: PropsWithChildren<IProps<T>>) => {
    const { layouts } = usePage<Page<ICollectionPageProps>>().props;
    const patch = usePatcher();
    const item: Item | undefined = isItem(itemOrCollectionOrAnnualreport)
        ? (itemOrCollectionOrAnnualreport as Item)
        : undefined;
    const collection: Collection | undefined = isItem(
        itemOrCollectionOrAnnualreport
    )
        ? undefined
        : (itemOrCollectionOrAnnualreport as Collection);
    const annualreport =
        isItem(itemOrCollectionOrAnnualreport) ||
        isCollection(itemOrCollectionOrAnnualreport)
            ? undefined
            : (itemOrCollectionOrAnnualreport as Annualreport);
    const [publishAt, setPublishAt] = useState(
        itemOrCollectionOrAnnualreport.publish_at
            ? dayjs(itemOrCollectionOrAnnualreport.publish_at)
            : null
    );

    const inTrash = Boolean(itemOrCollectionOrAnnualreport.deleted_at);
    const publishAfterToday =
        !inTrash && publishAt && publishAt.isAfter(new Date());

    const onChangePublishAt = (newPublishAt: Dayjs | null) => {
        setPublishAt((publishAt) => {
            if (!publishAt && !newPublishAt) {
                return publishAt;
            }
            if (!newPublishAt) {
                return null;
            }

            if (publishAt && newPublishAt.isSame(publishAt)) {
                return publishAt;
            }
            return newPublishAt;
        });
    };

    useEffect(() => {
        onChangePublishAt(
            itemOrCollectionOrAnnualreport.publish_at
                ? dayjs(itemOrCollectionOrAnnualreport.publish_at)
                : null
        );
    }, [itemOrCollectionOrAnnualreport.publish_at]);

    useEffect(() => {
        if (publishAt === null) {
            patch("publish_at", undefined);
        } else if (publishAt.isValid()) {
            patch(
                "publish_at",
                publishAt?.utc().format("YYYY-MM-DDTHH:mm:00.000[Z]")
            );
        }
    }, [patch, publishAt]);

    return (
        <Section
            title="Publishing details"
            summary={
                <SectionSummary
                    contents={[
                        {
                            title: "Status",
                            // text: publishAfterToday
                            //     ? `publish at ${publishAt?.format(
                            //           "YYYY-MM-DD HH:mm"
                            //       )}`
                            //     : itemOrCollectionOrAnnualreport.status,
                            component: (
                                <FormControlLabel
                                    label={
                                        inTrash
                                            ? "Trashed"
                                            : publishAfterToday
                                            ? "Publish after"
                                            : itemOrCollectionOrAnnualreport.status ===
                                              "published"
                                            ? "Published"
                                            : "Draft"
                                    }
                                    // labelPlacement="top"
                                    // className={classes.switch}
                                    control={
                                        inTrash ? (
                                            <DeleteIcon />
                                        ) : (
                                            <Switch
                                                checked={
                                                    itemOrCollectionOrAnnualreport.status ===
                                                    "published"
                                                }
                                                onChange={(e) =>
                                                    patch(
                                                        "status",
                                                        e.target.checked
                                                            ? "published"
                                                            : "unpublished"
                                                    )
                                                }
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                color="primary"
                                            />
                                        )
                                    }
                                />
                            ),
                        },
                        {
                            title: "Dates",
                            component: (
                                <Box display="flex" flexWrap="wrap">
                                    <Box flexBasis="40%">
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            created:
                                        </Typography>
                                    </Box>
                                    <Box flexBasis="60%">
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {dayjs(
                                                itemOrCollectionOrAnnualreport.created_at
                                            ).format("YYYY-MM-DD HH:mm")}
                                        </Typography>
                                    </Box>
                                    <Box flexBasis="40%">
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            updated:
                                        </Typography>
                                    </Box>
                                    <Box flexBasis="60%">
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {dayjs(
                                                itemOrCollectionOrAnnualreport.updated_at
                                            ).format("YYYY-MM-DD HH:mm")}
                                        </Typography>
                                    </Box>
                                    {/* {publishAt && (
                                        <>
                                            {" "}
                                            <Box flexBasis="40%">
                                                publish at:
                                            </Box>
                                            <Box flexBasis="40%">
                                                {publishAt.format(
                                                    "YYYY-MM-DD HH:mm"
                                                )}
                                            </Box>
                                        </>
                                    )} */}
                                </Box>
                            ),
                        },
                        {
                            title: "Id and type",
                            text: (
                                <>
                                    {itemOrCollectionOrAnnualreport.id}
                                    <br />
                                    {itemOrCollectionOrAnnualreport.type}
                                    {item?.subtype && `:${item.subtype}`}
                                    {collection?.layout &&
                                        `:${collection.layout}`}
                                </>
                            ),
                        },
                    ]}
                />
            }
        >
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <TextField
                        label="Id"
                        value={itemOrCollectionOrAnnualreport.id}
                        InputProps={{
                            readOnly: true,
                            disableUnderline: true,
                        }}
                        fullWidth
                        variant="standard"
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label="Type"
                        value={itemOrCollectionOrAnnualreport.type}
                        InputProps={{
                            readOnly: true,
                            disableUnderline: true,
                        }}
                        fullWidth
                        variant="standard"
                        margin="dense"
                    />
                </Grid>
                {item && (
                    <>
                        <Grid item xs={3}>
                            {isImageResource(item) ? (
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={false}
                                >
                                    <InputLabel>Image type</InputLabel>
                                    <Select
                                        value={item.subtype}
                                        onChange={(e) =>
                                            patch("subtype", e.target.value)
                                        }
                                        label="Image type"
                                        fullWidth
                                        margin="dense"
                                    >
                                        {Object.entries(IMAGE_SUBTYPES).map(
                                            ([value, label], idx) => (
                                                <MenuItem
                                                    key={idx}
                                                    value={value}
                                                >
                                                    {label}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                    <FormHelperText>
                                        image resource type can be changed
                                    </FormHelperText>
                                </FormControl>
                            ) : (
                                <TextField
                                    label="Subtype"
                                    value={item.subtype ?? ""}
                                    InputProps={{
                                        readOnly: true,
                                        disableUnderline: true,
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    variant="standard"
                                    margin="dense"
                                />
                            )}
                        </Grid>
                        <Grid item xs={3}></Grid>
                    </>
                )}
                {/* Added by Cyblance for Annual-Reports section start */}
                {annualreport ? (
                    <Grid item xs={6}>
                        {/* Content specific to 'annualreport' */}
                    </Grid>
                ) : (
                    collection && (
                        <>
                            <Grid item xs={3}>
                                {layouts &&
                                Object.entries(layouts).length > 1 ? (
                                    <FormControl
                                        variant="outlined"
                                        fullWidth
                                        error={false}
                                    >
                                        <InputLabel>Layout</InputLabel>
                                        <Select
                                            value={collection.layout || ""}
                                            onChange={(e) =>
                                                patch("layout", e.target.value)
                                            }
                                            label="Layout"
                                            fullWidth
                                        >
                                            {Object.entries(layouts).map(
                                                ([value, label], idx) => (
                                                    <MenuItem
                                                        key={idx}
                                                        value={value}
                                                    >
                                                        {label}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                        <FormHelperText filled>
                                            Be careful changing layouts
                                        </FormHelperText>
                                    </FormControl>
                                ) : (
                                    <TextField
                                        label="Layout"
                                        value={collection.layout ?? ""}
                                        InputProps={{
                                            readOnly: true,
                                            disableUnderline: true,
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        fullWidth
                                        variant="standard"
                                        margin="dense"
                                    />
                                )}
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={false}
                                >
                                    <InputLabel>Ordering</InputLabel>
                                    <Select
                                        value={collection.ordering}
                                        onChange={(e) =>
                                            patch("ordering", e.target.value)
                                        }
                                        label="Ordering"
                                        fullWidth
                                    >
                                        {Object.entries(
                                            COLLECTION_ORDERINGS
                                        ).map(([value, label], idx) => (
                                            <MenuItem key={idx} value={value}>
                                                {label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText filled>
                                        {collection.ordering !== "date" &&
                                        collection.items_count &&
                                        collection.items_count > 50
                                            ? "large collection!"
                                            : " "}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                        </>
                    )
                )}
                {/* <Grid item xs={3}>
                                    <TextField
                                        label="Layout"
                                        value={collection.layout}
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) =>
                                            onChangeLayout(e.target.value)
                                        }
                                    />
                                </Grid> */}
                <Grid item xs={3}>
                    <FormControl sx={{ marginTop: 1.1 }}>
                        <InputLabel shrink>Status</InputLabel>

                        <FormControlLabel
                            label={
                                inTrash
                                    ? "Trashed"
                                    : publishAfterToday
                                    ? "Publish after"
                                    : itemOrCollectionOrAnnualreport.status ===
                                      "published"
                                    ? "Published"
                                    : "Draft"
                            }
                            // labelPlacement="top"
                            sx={{
                                marginTop: 1.25,
                                marginBottom: 0,
                            }}
                            control={
                                inTrash ? (
                                    <DeleteIcon />
                                ) : (
                                    <Switch
                                        checked={
                                            itemOrCollectionOrAnnualreport.status ===
                                            "published"
                                        }
                                        onChange={(e) =>
                                            patch(
                                                "status",
                                                e.target.checked
                                                    ? "published"
                                                    : "unpublished"
                                            )
                                        }
                                        color="primary"
                                    />
                                )
                            }
                        />
                        <FormHelperText>
                            {publishAfterToday ? (
                                itemOrCollectionOrAnnualreport.status ===
                                "published" ? (
                                    <>
                                        Will be published after{" "}
                                        <strong>Publish at</strong> date
                                    </>
                                ) : (
                                    <>
                                        Switch on to publish item after{" "}
                                        <strong>Publish at</strong> date
                                    </>
                                )
                            ) : (
                                " "
                            )}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <DateTimePicker
                        //  KeyboardDateTimePicker
                        value={publishAt}
                        label="Publish at"
                        mask="____-__-__ __:__"
                        inputFormat="YYYY-MM-DD HH:mm"
                        ampm={false}
                        OpenPickerButtonProps={{ size: "small" }}
                        onChange={onChangePublishAt}
                        renderInput={(props) => (
                            <TextField margin="dense" {...props} />
                        )}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label="Created"
                        value={
                            dayjs(
                                itemOrCollectionOrAnnualreport.created_at
                            ).format("YYYY-MM-DD HH:mm") || ""
                        }
                        InputProps={{
                            readOnly: true,
                            disableUnderline: true,
                        }}
                        fullWidth
                        variant="standard"
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label="Updated"
                        value={
                            dayjs(
                                itemOrCollectionOrAnnualreport.updated_at
                            ).format("YYYY-MM-DD HH:mm") || ""
                        }
                        InputProps={{
                            readOnly: true,
                            disableUnderline: true,
                        }}
                        fullWidth
                        variant="standard"
                        margin="dense"
                    />
                </Grid>
                {item?.contents && item.contents.length > 0 && (
                    <Grid item xs={12}>
                        <Box display="flex">
                            <Box flexBasis="10%">
                                <Typography variant="caption">
                                    language
                                </Typography>
                            </Box>
                            <Box flexBasis="60%">
                                <Typography variant="caption">URL</Typography>
                            </Box>
                            <Box flexBasis="10%" textAlign="center">
                                <Typography variant="caption">
                                    preview
                                </Typography>
                            </Box>
                        </Box>
                        {item?.contents.map((content, idx) => {
                            const url = `${window.origin}/${
                                content.lang === "*" ? "en" : content.lang
                            }/item/${item.id}:${content.slug || "_"}`;
                            return (
                                <Box
                                    key={idx}
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Box flexBasis="10%">{content.lang}</Box>
                                    <Box flexBasis="60%">
                                        <PreviewTextCopy text={url} />
                                    </Box>
                                    <Box flexBasis="10%" textAlign="center">
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() =>
                                                window.open(url, "_blank")
                                            }
                                        >
                                            <LaunchIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Grid>
                )}
                {/* Added by Cyblance for Annual-Reports section start */}
                {itemOrCollectionOrAnnualreport.type === "highlight" &&
                    annualreport?.contents &&
                    annualreport.contents.length > 0 && (
                        <Grid item xs={12}>
                            <Box display="flex">
                                <Box flexBasis="10%">
                                    <Typography variant="caption">
                                        language
                                    </Typography>
                                </Box>
                                <Box flexBasis="60%">
                                    <Typography variant="caption">
                                        URL
                                    </Typography>
                                </Box>
                                <Box flexBasis="10%" textAlign="center">
                                    <Typography variant="caption">
                                        preview
                                    </Typography>
                                </Box>
                            </Box>
                            {annualreport?.contents.map((content, idx) => {
                                const url = `${window.origin}/${
                                    content.lang === "*" ? "en" : content.lang
                                }/annualreport/${annualreport.id}:${
                                    content.slug || "_"
                                }`;
                                return (
                                    <Box
                                        key={idx}
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Box flexBasis="10%">
                                            {content.lang}
                                        </Box>
                                        <Box flexBasis="60%">
                                            <PreviewTextCopy text={url} />
                                        </Box>
                                        <Box flexBasis="10%" textAlign="center">
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() =>
                                                    window.open(url, "_blank")
                                                }
                                            >
                                                <LaunchIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Grid>
                    )}
                {/* Added by Cyblance for Annual-Reports section end */}
            </Grid>
        </Section>
    );
};

export default MetaInfoManager;
