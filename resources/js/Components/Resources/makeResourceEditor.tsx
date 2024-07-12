import { ComponentType } from "react";

import Item, { ItemContent } from "../../Models/Item";
import { EditorProps } from "../ContentsEditor";

import EditorContact from "./EditorContact";
import EditorDevCoopProject from "./EditorDevCoopProject";
import EditorEmbed from "./EditorEmbed";
import EditorFile from "./EditorFile";
import EditorImage from "./EditorImage";
import EditorLink from "./EditorLink";
import EditorVideo from "./EditorVideo";

export const makeResourceEditor = (
    item: Item
): ComponentType<EditorProps<ItemContent>> | undefined => {
    switch (item.type) {
        // case "dcproject":
        //     return EditorDCProject;
        case "dev_coop_project":
            return EditorDevCoopProject;
        case "contact":
        case "person":
            return item.contents.length && item.contents[0].contacts
                ? EditorContact
                : undefined;
        case "affiliate":
        default:
            //todo
            break;
    }
    switch (item.subtype) {
        case "link":
            return EditorLink;
        case "image":
        case "image.icon":
        case "image.portrait":
        case "image.square":
            return EditorImage;
        case "file":
            return EditorFile;
        case "video":
            return EditorVideo;
        case "embed":
            return EditorEmbed;
        default:
            return undefined;
    }
};

export default makeResourceEditor;
