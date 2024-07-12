import React from "react";

import AddLinkIcon from "@mui/icons-material/AddLink";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
// import FileIcon from "@mui/icons-material/InsertDriveFile";
import LinkIcon from "@mui/icons-material/Link";
import VideoIcon from "@mui/icons-material/OndemandVideo";
import NewVideoIcon from "@mui/icons-material/PersonalVideo";
import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import XIcon from "@mui/icons-material/X";
import { GridColDef, GridValueFormatterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

import { ItemSubtype } from "../../Config";
import { findTitle } from "../../Models/Content";
import Item from "../../Models/Item";
import { makeDateColumn, LangColumn } from "../../Utils/DataGridUtils";
import PublishStatusIcon from "../General/PublishStatusIcon";
import { IMenuOption, MenuOptionDivider } from "../General/SimpleMenu";
import { ResourceDetail } from "../Resources";
//Added by Cyblance for Annual-Reports section start
//Added by Cyblance for Annual-Reports section end
export type MenuType =
    | "image.browse"
    | "file.browse"
    | "link.browse"
    | "video.browse"
    | "resource.browse"
    | "contentitem.browse"
    | "dcproject.browse"
    | "link.dummy"
    | ItemSubtype;

type MenuOption = IMenuOption<MenuType>;
type Menu = MenuOption[];

export const ImageBrowse: MenuOption = {
    value: "image.browse",
    label: "Find existing image",
    icon: <ImageSearchIcon />,
};
export const ImageUpload: MenuOption = {
    value: "image",
    label: "Upload image",
    icon: <CloudUploadIcon />,
};
export const ImageMenu: Menu = [ImageBrowse, MenuOptionDivider, ImageUpload];

export const VideoBrowse: MenuOption = {
    value: "video.browse",
    label: "Find existing video",
    icon: <VideoIcon />,
};
export const VideoCreate: MenuOption = {
    value: "video",
    label: "Create video resource",
    icon: <NewVideoIcon />,
};
export const VideoMenu: Menu = [VideoBrowse, MenuOptionDivider, VideoCreate];

export const LinkBrowse: MenuOption = {
    value: "link.browse",
    label: "Find existing link",
    icon: <LinkIcon />,
};
export const LinkCreate: MenuOption = {
    value: "link",
    label: "Create link resource",
    icon: <AddLinkIcon />,
};
export const LinkDummy: MenuOption = {
    value: "link.dummy",
    label: "Link without resource",
    icon: <LinkIcon />,
};
export const LinkMenu: Menu = [LinkBrowse, MenuOptionDivider, LinkCreate];

export const LinkContentItem: MenuOption = {
    value: "contentitem.browse",
    label: "Link internal item",
    icon: <EventNoteIcon />,
};

export const AddContentItem: MenuOption = {
    value: "contentitem.browse",
    label: "Find existing content item",
    icon: <EventNoteIcon />,
};

export const FileBrowse: MenuOption = {
    value: "file.browse",
    label: "Find existing file",
    icon: <SearchIcon />,
};
export const FileCreate: MenuOption = {
    value: "file",
    label: "Create file resource",
    icon: <UploadFileIcon />,
};

export const DCProjectBrowse: MenuOption = {
    value: "dcproject.browse",
    label: "Find existing DC Project",
    icon: <SearchIcon />,
};
export const EmbedCreate: MenuOption = {
    value: "embed",
    label: "Embed social",
    icon: <XIcon />,
};
export const ResourcesMenu: Menu = [VideoCreate, FileCreate, EmbedCreate];
export const CollectionAddItemMenu: Menu = [
    AddContentItem,
    DCProjectBrowse,
    MenuOptionDivider,
    ImageBrowse,
    VideoBrowse,
    FileBrowse,
];
export const AttachmentMenu: Menu = [
    {
        value: "resource.browse",
        label: "Find existing resource",
        icon: <SearchIcon />,
    },
    MenuOptionDivider,
    LinkCreate,
    VideoCreate,
    FileCreate,
    MenuOptionDivider,
    AddContentItem,
    DCProjectBrowse,
];

export const AttachmentColumns: GridColDef[] = [
    {
        field: "id",
        renderCell: (cell) => (
            <>
                {cell.row.id} <PublishStatusIcon item={cell.row as Item} />
            </>
        ),
    },
    {
        field: "title",
        valueGetter: (params) => findTitle(params.row as Item) || "-untitled-",
        flex: 2,
    },
    LangColumn,
    {
        field: "created_at",
        flex: 1,
        valueFormatter: (params: GridValueFormatterParams) =>
            dayjs(params.value as string).format("YYYY-MM-DD HH:mm"),
    },
    {
        field: "resource",
        headerName: "Resource",
        sortable: false,
        renderCell: (cell) => {
            const item = cell.row as Item;
            switch (item.subtype) {
                case "link":
                case "video":
                case "file":
                    return <ResourceDetail item={item} />;
            }
            if (item.type !== "resource") {
                return <span>{item.type}</span>;
            }
            return (
                <span>
                    {"unknown resource type"} {item.subtype}
                </span>
            );
        },
        flex: 3,
        align: "right",
    },
    { field: "subtype" },
];

export const ContentItemBrowseColumns: GridColDef[] = [
    {
        field: "id",
        renderCell: (cell) => (
            <>
                {cell.row.id} <PublishStatusIcon item={cell.row as Item} />
            </>
        ),
    },
    {
        field: "title",
        valueGetter: (params) => findTitle(params.row as Item) || "-untitled-",
        flex: 2,
    },
    makeDateColumn("created_at"),
    LangColumn,
];
