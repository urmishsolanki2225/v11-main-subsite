import React, { useCallback, useEffect, useReducer, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Delta, formatters } from "jsondiffpatch";
import route from "ziggy-js";
import "jsondiffpatch/dist/formatters-styles/annotated.css";

import AttachmentsManager from "../../Components/AttachmentsManager";
import { AuditSection } from "../../Components/Audit";
import CollectionsManager from "../../Components/CollectionsManager";
import { CollectionGroups } from "../../Components/CollectionsManager.constants";
import ContentsEditor from "../../Components/ContentsEditor";
import { Confirm } from "../../Components/General/Confirm";
import ImagesManager from "../../Components/General/ImagesManager";
import ImageResourceContext from "../../Components/ImageResourceContext";
import MetaInfoManager from "../../Components/MetaInfoManager";
import makeResourceEditor from "../../Components/Resources/makeResourceEditor";
import Section, {
    ItemContextSummary,
    SectionSummary,
} from "../../Components/Section";
import AppBarHeader from "../../Layout/AppBarHeader";
import { useAppContext } from "../../Layout/AppContext";
import ContentScroll from "../../Layout/ContentScroll";
import { AuthPageProps, isImageResource, ItemContent } from "../../Models";
import { findTitle } from "../../Models/Content";
import Item from "../../Models/Item";
import DispatchProvider from "../../Stores/DispatchProvider";
import itemReducer from "../../Stores/itemReducer";
import jsondiff from "../../Utils/jsondiff";

interface IProps {
    item: Item;
    layout: any;
}
const Edit: React.FC<IProps & AuthPageProps> = ({ item: _item, can }) => {
    const [item, dispatch] = useReducer(itemReducer, _item);
    const [diff, setDiff] = useState<Delta>();
    const { needSave, setNeedSave } = useAppContext();

    const onSave = () => {
        Inertia.patch(route("admin.items.update", { item }).toString(), diff, {
            preserveState: false,
            replace: true,
            onFinish: () => {
                if (item.type === "dev_coop_project") {
                    window.location.reload();
                }
            },
        });
        setNeedSave(false);
    };

    const onReset = () => {
        dispatch({ type: "item_reset", item: _item });
    };

    const onChangeContents = useCallback((contents: ItemContent[]) => {
        dispatch({
            type: "patch",
            field: "contents",
            value: contents,
        });
    }, []);

    const inTrash = Boolean(item.deleted_at);

    const onTrash = () => {
        Inertia.post(route("admin.items.trash", { id: item.id }));
    };
    const onRestore = () => {
        Inertia.post(route("admin.items.restore", { id: item.id }));
    };
    const onDestroy = () => {
        Inertia.delete(route("admin.items.destroy", { id: item.id }));
    };

    useEffect(() => {
        setNeedSave(!!diff);
    }, [diff, setNeedSave]);

    useEffect(() => {
        dispatch({ type: "item_reset", item: _item });
    }, [_item]);

    useEffect(() => {
        setDiff(jsondiff.diff(_item, item));
    }, [_item, item]);

    return (
        <DispatchProvider dispatch={dispatch}>
            <AppBarHeader title="Edit Item">
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
                <form autoComplete="off" autoCapitalize="off">
                    <Box padding={2}>
                        <Typography variant="h4">
                            {findTitle(item) ||
                                item.contents.at(0)?.title ||
                                "-no title-"}
                        </Typography>
                    </Box>
                    <MetaInfoManager<Item> item={item} />
                    {item.type === "activityreport_congress" && (
                        <Section title="Report to World Congress" open>
                            <Box display="flex" gap={2}>
                                <TextField
                                    label="Year from"
                                    value={
                                        item.activity_report_congress
                                            ?.year_from || ""
                                    }
                                    onChange={(evt) => {
                                        const year =
                                            parseInt(evt.currentTarget.value) ||
                                            0;
                                        dispatch({
                                            type: "patch",
                                            field: "activity_report_congress",
                                            value: {
                                                ...item.activity_report_congress,
                                                year_from: year,
                                            },
                                        });
                                    }}
                                />
                                <TextField
                                    label="Year to"
                                    value={
                                        item.activity_report_congress
                                            ?.year_to || ""
                                    }
                                    onChange={(evt) => {
                                        const year =
                                            parseInt(evt.currentTarget.value) ||
                                            0;
                                        dispatch({
                                            type: "patch",
                                            field: "activity_report_congress",
                                            value: {
                                                ...item.activity_report_congress,
                                                year_to: year,
                                            },
                                        });
                                    }}
                                />
                            </Box>
                        </Section>
                    )}

                    <Section
                        title="Contents"
                        open={true}
                        summary={
                            <SectionSummary
                                contents={[
                                    {
                                        title: "Languages",
                                        text:
                                            item.contents
                                                ?.map(({ lang }) => lang)
                                                .join(", ") || "No content",
                                    },
                                ]}
                            />
                        }
                    >
                        <ContentsEditor<ItemContent>
                            contents={item.contents}
                            fields={
                                item.type === "contact"
                                    ? ["title", "subtitle", "blurb"]
                                    : item.type === "dev_coop_project"
                                    ? ["title"]
                                    : ["title", "subtitle", "blurb", "content"]
                            }
                            htmlFields={{ content: "full", blurb: "limited" }}
                            itemSubtype={item.subtype}
                            additionalEditor={makeResourceEditor(item)}
                            onChange={onChangeContents}
                        />
                    </Section>
                    <Section
                        title="Context"
                        summary={<ItemContextSummary item={item} />}
                    >
                        {isImageResource(item) && (
                            <ImageResourceContext item={item} />
                        )}
                        <CollectionsManager
                            collections={item.collections ?? []}
                            groupings={CollectionGroups}
                            onChange={(collections) =>
                                dispatch({
                                    type: "patch",
                                    field: "collections",
                                    value: collections,
                                })
                            }
                        />
                    </Section>
                    {!isImageResource(item) && (
                        <ImagesManager
                            images={item.all_images}
                            support_color={item.support_color}
                        />
                    )}
                    {!isImageResource(item) && item.subtype !== "file" && (
                        <AttachmentsManager
                            attachmentGroups={item.attachment_groups}
                        />
                    )}
                    <AuditSection />

                    <Section title="Actions">
                        <Box display="flex" gap={2}>
                            {inTrash ? (
                                <>
                                    {can?.items?.restoreMany && (
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
                                    {can?.items?.forceDeleteMany && (
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
                                    {can?.items?.deleteMany && (
                                        <Confirm onConfirm={onTrash}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<DeleteIcon />}
                                            >
                                                Move to Trash
                                            </Button>
                                        </Confirm>
                                    )}
                                </>
                            )}
                        </Box>
                    </Section>

                    {import.meta.env.DEV && (
                        <div>
                            <div>
                                <pre>{JSON.stringify(diff, undefined, 4)}</pre>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: diff
                                        ? formatters.annotated.format(
                                              diff,
                                              _item
                                          )
                                        : "<p>no diff</p>",
                                }}
                            ></div>
                            <div style={{ whiteSpace: "pre-wrap" }}>
                                {JSON.stringify(item, undefined, 4)}
                            </div>
                        </div>
                    )}
                </form>
            </ContentScroll>
        </DispatchProvider>
    );
};

export default Edit;
