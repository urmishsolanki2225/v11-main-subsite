import React from "react";

import AddIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import {
    Attachment,
    AttachmentGroup,
    AttachmentGroupContent,
} from "../Models/Attachment";
import { findTitle } from "../Models/Content";
import Item from "../Models/Item";
import { useItemDispatch } from "../Stores/DispatchProvider";

import {
    makeSummaryText,
    makeSummaryTitle,
} from "./AttachmentsManager.functions";
import { AttachmentMenu, ResourcePicker } from "./Browser";
import ContentsEditor from "./ContentsEditor";
import ButtonConfirmDialog from "./General/ButtonConfirmDialog";
import Section, { SectionSummary } from "./Section";
import Sorter from "./Sorter";
import AttachmentSorterRenderer from "./Sorter/AttachmentSorterRenderer";

// import AddResourcePicker from "./Resources/AddResourcePicker";

interface IProps {
    attachmentGroups: AttachmentGroup[];
    // onChange: (attachmentGroups: AttachmentGroup[]) => void;
}
const AttachmentsManager: React.FC<IProps> = ({
    // attachmentGroups: _attachmentGroups,
    attachmentGroups,
    // onChange: onChange,
}) => {
    const dispatch = useItemDispatch();

    const onChangeByIndex = (idx: number, key: string, value: any) => {
        dispatch({
            type: "attachmentgroup_update",
            index: idx,
            field: key,
            value,
        });
    };

    const removeAttachmentGroup = (idx: number) => {
        dispatch({ type: "attachmentgroup_remove", index: idx });
    };

    const onAddGroup = () => {
        dispatch({ type: "attachmentgroup_add" });
    };

    const onAddAttachment = (groupIdx: number | undefined, item: Item) => {
        dispatch({
            type: "attachment_add",
            groupIndex: groupIdx,
            attachedItem: item,
        });
    };

    return (
        <Section
            title="Attachments"
            summary={
                <SectionSummary
                    contents={[
                        {
                            title: makeSummaryTitle(attachmentGroups),
                            text: makeSummaryText(attachmentGroups),
                        },
                        {
                            title: "Add attachment",
                            text:
                                attachmentGroups?.length > 1
                                    ? "Open the panel to add an attachment to a group."
                                    : undefined,
                            component:
                                attachmentGroups?.length > 1 ? undefined : (
                                    <ResourcePicker
                                        label="Attachment"
                                        menu={AttachmentMenu}
                                        onPick={(item) => {
                                            onAddAttachment(undefined, item);
                                        }}
                                    />
                                ),
                        },
                    ]}
                />
            }
        >
            <Typography variant="body1">
                Attachments are grouped, where each group can optionally have a
                title and a blurb.
            </Typography>
            {attachmentGroups.map((attachmentGroup: AttachmentGroup, idx) => (
                <Box display="flex" flexDirection="column" key={idx}>
                    <Box display="flex" flexDirection="row">
                        <Box flexGrow={2}>
                            <Typography variant="h6">
                                {findTitle(attachmentGroup) || "-untitled-"}
                            </Typography>
                        </Box>
                        <ButtonConfirmDialog
                            color="secondary"
                            onConfirm={() => removeAttachmentGroup(idx)}
                            icon={<DeleteIcon />}
                            buttonProps={{ size: "small" }}
                        >
                            Removing attachment group can not be undone.
                        </ButtonConfirmDialog>
                    </Box>

                    <ContentsEditor<AttachmentGroupContent>
                        contents={attachmentGroup.contents}
                        fields={["title", "blurb"]}
                        onChange={(contents) =>
                            onChangeByIndex(idx, "contents", contents)
                        }
                    />
                    <Sorter<Attachment>
                        items={attachmentGroup.attachments}
                        Renderer={AttachmentSorterRenderer}
                        onChange={(attachments) =>
                            onChangeByIndex(idx, "attachments", attachments)
                        }
                        getId={(attachment) => attachment.item.id}
                    />
                    <Box>
                        <ResourcePicker
                            label="Attachment"
                            menu={AttachmentMenu}
                            onPick={(item) => {
                                onAddAttachment(idx, item);
                            }}
                        />
                    </Box>
                    <Divider variant="middle" />
                </Box>
            ))}
            {attachmentGroups?.length === 0 ? (
                <ResourcePicker
                    label="Attachment"
                    menu={AttachmentMenu}
                    onPick={(item) => {
                        onAddAttachment(undefined, item);
                    }}
                />
            ) : (
                <Button
                    onClick={onAddGroup}
                    startIcon={<AddIcon />}
                    color="secondary"
                    size="small"
                >
                    Attachment Group
                </Button>
            )}
        </Section>
    );
};

export default AttachmentsManager;
