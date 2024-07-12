import React from "react";

import LinkIcon from "@mui/icons-material/Link";

import { findContent, Item } from "../../../../Models";
import { useLanguage } from "../../../../Utils/LanguageContext";
import {
    LinkBrowse,
    LinkContentItem,
    LinkCreate,
    LinkDummy,
} from "../../../Browser";
import { MenuOptionDivider } from "../../../General/SimpleMenu";
import ButtonDialog from "../../Toolbar/ButtonDialog";

import LinkPane from "./EditPane";
import LinkElement from "./LinkElement";
import { LinkElementType } from "./type";

const LinkToolbarButton: React.FC = () => {
    const lang = useLanguage();
    const PickerMenu = [
        LinkBrowse,
        LinkCreate,
        MenuOptionDivider,
        LinkContentItem,
        MenuOptionDivider,
        LinkDummy,
    ];

    return (
        <ButtonDialog
            elementType={LinkElement}
            icon={<LinkIcon />}
            pickerMenu={PickerMenu}
            EditPane={LinkPane}
            itemToElementMappers={{
                "link.dummy": (item: Item) => {
                    const content = findContent(item, lang);
                    if (content?.links.length) {
                        return {
                            type: "link",
                            url: content?.links[0].url,
                            children: [{ text: content?.title }],
                            linkType: "external",
                        } as LinkElementType;
                    }
                    return undefined;
                },
                "contentitem.browse": (item: Item) => {
                    const content = findContent(item, lang);
                    return {
                        type: "link",
                        url: `/${lang || "en"}/item/${item.id}:${
                            content?.slug || "_"
                        }`,
                        linkType: "internal-item",
                        dataId: `${item.id}`,
                        dataType: "link-internal",
                        children: [{ text: content?.title }],
                    } as LinkElementType;
                },
                link: (item: Item) => {
                    const content = findContent(item, lang);
                    if (content?.links.length) {
                        return {
                            type: "link",
                            url: content?.links[0].url,
                            dataId: `${item.id}`,
                            dataType: "link",
                            linkType: "resource",
                            children: [{ text: content?.title }],
                        } as LinkElementType;
                    }
                    return undefined;
                },
                "link.browse": (item: Item) => {
                    const content = findContent(item, lang);
                    if (content?.links.length) {
                        return {
                            type: "link",
                            url: content?.links[0].url,
                            dataId: `${item.id}`,
                            dataType: "link",
                            linkType: "resource",
                            children: [{ text: content?.title }],
                        } as LinkElementType;
                    }
                    return undefined;
                },
            }}
        />
    );
};

export default LinkToolbarButton;
