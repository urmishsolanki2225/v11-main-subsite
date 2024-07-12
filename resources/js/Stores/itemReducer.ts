import { Item } from "../Models";
import jsondiff from "../Utils/jsondiff";

import { ItemAction } from "./actions";

const itemReducer = (item: Item, action: ItemAction): Item => {
    let result = undefined;
    if (action.type === "patch") {
        result = { ...item, [action.field]: action.value };
    } else if (action.type === "item_reset") {
        result = action.item as Item;
    } else if (action.type === "attachmentgroup_update") {
        result = {
            ...item,
            attachment_groups: item.attachment_groups.map((group, i) => {
                return i === action.index
                    ? { ...group, [action.field]: action.value }
                    : group;
            }),
        };
    } else if (action.type === "attachmentgroup_add") {
        result = {
            ...item,
            attachment_groups: [
                ...item.attachment_groups,
                {
                    id: 0,
                    order: item.attachment_groups.length,
                    contents: [],
                    attachments: [],
                },
            ],
        };
    } else if (action.type === "attachmentgroup_remove") {
        const newGroups = [...item.attachment_groups];
        newGroups.splice(action.index, 1);
        result = { ...item, attachment_groups: newGroups };
    } else if (action.type === "attachment_add") {
        if (
            action.groupIndex === undefined &&
            !item.attachment_groups?.length
        ) {
            // should only be used when no groups exist yet

            result = {
                ...item,
                attachment_groups: [
                    {
                        id: 0,
                        order: 0,
                        contents: [],
                        attachments: [
                            { id: 0, order: 0, item: action.attachedItem },
                        ],
                    },
                ],
            };
        } else {
            if (
                !action.groupIndex ||
                action.groupIndex >= item.attachment_groups.length
            ) {
                action.groupIndex = 0;
            }
            const newGroup = { ...item.attachment_groups[action.groupIndex] };
            newGroup.attachments = [
                ...newGroup.attachments,
                {
                    id: 0,
                    order: newGroup.attachments.length || 0,
                    item: action.attachedItem,
                },
            ];
            const newGroups = [...item.attachment_groups];
            newGroups[action.groupIndex] = newGroup;
            result = { ...item, attachment_groups: newGroups };
        }
        // } else if (action.type === "dispatch") {
    } else {
        console.warn("invalid reducer action", action);
        result = item;
    }
    // check for changes
    return jsondiff.diff(result, item) ? result : item;
};

export default itemReducer;
