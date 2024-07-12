import { AttachmentGroup } from "../Models/Attachment";

export const makeSummaryTitle = (attachmentGroups?: AttachmentGroup[]) => {
    return !attachmentGroups?.length
        ? "No attachments"
        : "Item has attachments";
};

const countAttachments = (attachmentGroups?: AttachmentGroup[]) => {
    if (!attachmentGroups?.length) {
        return 0;
    }
    return attachmentGroups.reduce(
        (total: number, { attachments }) => total + attachments.length,
        0
    );
};

export const makeSummaryText = (attachmentGroups?: AttachmentGroup[]) => {
    const total = countAttachments(attachmentGroups);
    if (!total) {
        return;
    }
    if (attachmentGroups!.length === 1) {
        return total == 1 ? `${total} attachment.` : `${total} attachments.`;
    } else {
        return `A total of ${total} attachments in ${
            attachmentGroups!.length
        } groups.`;
    }
};
