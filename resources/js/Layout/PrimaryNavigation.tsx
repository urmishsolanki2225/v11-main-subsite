import React from "react";

import { Inertia } from "@inertiajs/inertia";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import DescriptionIcon from "@mui/icons-material/Description";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import ImageIcon from "@mui/icons-material/Image";
import FileIcon from "@mui/icons-material/InsertDriveFile";
import LanguageIcon from "@mui/icons-material/Language";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LinkIcon from "@mui/icons-material/Link";
import ListIcon from "@mui/icons-material/ListAlt";
import TagIcon from "@mui/icons-material/LocalOffer";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MapIcon from "@mui/icons-material/Map";
import VideoIcon from "@mui/icons-material/OndemandVideo";
import PeopleIcon from "@mui/icons-material/People";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CountryIcon from "@mui/icons-material/Public";
import ShareIcon from "@mui/icons-material/Share";
import SourceIcon from "@mui/icons-material/Source";
import SummarizeIcon from "@mui/icons-material/Summarize";
import TimelineIcon from "@mui/icons-material/Timeline";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import XIcon from "@mui/icons-material/X";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { useLocalStorage } from "react-use";
import route from "ziggy-js";

//Added by Cyblance for Subsite section start
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import UpdateIcon from '@mui/icons-material/Update';
import WebIcon from '@mui/icons-material/Web';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { AuthPageProps, UserPageProps, Page, GetSubsite } from "../Models";
//Added by Cyblance for Subsite section end

import { LOCALSTORAGE_KEYS } from "@/Config";

const MENU_ITEMS = {
    items: [
        {
            filter: { type: "article" },
            label: "Articles",
            Icon: EventNoteIcon,
            tooltip: "News, opinion and blog series",
        },
        { filter: { type: "static" }, label: "Pages", Icon: DescriptionIcon },
        {
            filter: { type: "person,contact" },
            label: "Persons & Contacts",
            Icon: ContactPhoneIcon,
            tooltip: "Executive board, staff and office addresses",
        },
        {
            filter: { type: "dev_coop_project" },
            label: "DC Projects",
            Icon: GroupWorkIcon,
            tooltip: "Development Cooperation projects",
        },
        {
            filter: { type: "library" },
            label: "Library documents",
            Icon: LibraryBooksIcon,
            tooltip: "Resolutions, constitution, policy briefs",
        },
        {
            filter: { type: "resource", subtype: "file" },
            label: "Files",
            Icon: FileIcon,
        },
        {
            filter: { type: "resource", subtype: "link" },
            label: "Links",
            Icon: LinkIcon,
        },
        {
            filter: { type: "resource", subtype: "video" },
            label: "Videos",
            Icon: VideoIcon,
        },
        {
            filter: { type: "resource", subtype: "embed" },
            label: "Social embeds",
            Icon: XIcon,
        },
        {
            filter: {
                type: "resource",
                subtype: "image,image.portrait,image.icon,image.square",
            },
            label: "Images",
            Icon: ImageIcon,
        },
        { filter: {}, label: "All items" },
    ],
    collections: [
        {
            filter: { type: "articles" },
            label: "Article lists",
            Icon: AnnouncementIcon,
            tooltip: "News, opinion and blog series",
        },
        {
            filter: { type: "sdi_group,workarea" },
            label: "Priorities",
            Icon: PriorityHighIcon,
            tooltip: "Strategic Directions and work areas",
        },
        {
            filter: { type: "dossier,dossier_sub" },
            label: "Dossiers",
            Icon: AssignmentIcon,
            tooltip: "Spotlights and campaigns",
        },
        {
            filter: { type: "structure,listing" },
            label: "Structure",
            Icon: ListIcon,
            tooltip: "Structural collections",
        },
        {
            filter: { type: "library" },
            label: "Libraries",
            Icon: LibraryBooksIcon,
            tooltip: "Resolutions, constitution, policy briefs",
        },
        {
            filter: { type: "persons,contacts" },
            label: "Contact lists",
            Icon: ContactPhoneIcon,
            tooltip: "Executive board, staff and unit lists, offices",
        },
        // { filter: { type: "contacts" }, label: "Contacts", Icon: PeopleIcon },
        { filter: { type: "author" }, label: "Authors", Icon: PeopleIcon },
        { filter: { type: "country" }, label: "Countries", Icon: CountryIcon },
        {
            filter: { layout: "region" },
            label: "Regions",
            Icon: LanguageIcon,
        },
        {
            filter: { type: "tag,theme" },
            label: "Tags & Themes",
            Icon: TagIcon,
            tooltip: "Should not be used anymore",
        },
        { filter: {}, label: "All collections" },
    ],
};

const filterToQuery = (filter: { [key: string]: any }) => {
    const result: any = {};
    for (const key in filter) {
        result[`filter[${key}]`] = filter[key];
    }
    return result;
};

export const PrimaryNavigation: React.FC = () => {
    const { can, user } = usePage<Page<AuthPageProps & UserPageProps>>().props;
    const [expandCollections, setExpandCollections] = useLocalStorage(
        "ei_expand_collections",
        true
    );
    const [expandItems, setExpandItems] = useLocalStorage(
        "ei_expand_items",
        true
    );
    const [expandUsers, setExpandUsers] = useLocalStorage(
        "ei_expand_users",
        false
    );
    const [expandGeoData, setExpandGeoData] = useLocalStorage(
        "ei_expand_geodata",
        false
    );
    const [expandAnnualReport, setExpandAnnualReport] = useLocalStorage(
        "ei_expand_annualreport",
        false
    );
    //Added by Cyblance for Subsite section start
    const [expandSubsites, setExpandSubsites] = useLocalStorage(
        "ei_expand_subsites",
        false
    );
    const { subsite } = usePage<Page<GetSubsite>>().props;
    let aliase_name = "";
    if (subsite != null && subsite.aliase_name != null) {
        aliase_name = subsite.aliase_name;
    }
    //Added by Cyblance for Subsite section end
    const needSave = false;

    const [previousAnnualReportYear] = useLocalStorage<number>(
        LOCALSTORAGE_KEYS.ANNUALREPORT_YEAR
    );

    return (
        <List
            sx={{
                "& .MuiListItemIcon-root": {
                    minWidth: 32,
                },
            }}
        >
            <ListItem
                button
                onClick={() => Inertia.get(route("admin.dashboard"))}
            >
                <ListItemIcon>
                    <TimelineIcon />
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
            </ListItem>
            <ListItem button onClick={() => setExpandItems(!expandItems)}>
                <ListItemIcon>
                    <FileCopyIcon />
                </ListItemIcon>
                <ListItemText primary="Items" />
                {expandItems ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expandItems} timeout="auto">
                <List>
                    <ListItem
                        button
                        disabled={needSave}
                        sx={{ pl: 4 }}
                        onClick={() => Inertia.get(route("admin.items.create"))}
                    >
                        <ListItemIcon>
                            <AddCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Create item" />
                    </ListItem>
                    {MENU_ITEMS.items.map(
                        ({ filter, label, Icon, tooltip }, idx) => (
                            <ListItem
                                button
                                disabled={needSave}
                                onClick={() =>
                                    //Added by Cyblance for Subsite section start
                                    {
                                        user?.role != "subsiteadmin" ?
                                            Inertia.get(
                                                route(
                                                    "admin.items.index",
                                                    filterToQuery(filter)
                                                ).toString()
                                            )
                                            :
                                            Inertia.get(
                                                route(
                                                    "admin.items.index",
                                                    filterToQuery({ ...filter, ["subsite.id"]: user?.subsite_id })
                                                ).toString()
                                            )
                                    }
                                    //Added by Cyblance for Subsite section end
                                }
                                sx={{ pl: 4 }}
                                key={idx}
                            >
                                <Tooltip title={tooltip || ""}>
                                    <ListItemIcon>
                                        {Icon ? <Icon /> : ""}
                                    </ListItemIcon>
                                </Tooltip>
                                <ListItemText primary={label} />
                            </ListItem>
                        )
                    )}{" "}
                </List>
            </Collapse>
            <ListItem
                button
                onClick={() => setExpandCollections(!expandCollections)}
            >
                <ListItemIcon>
                    <ViewModuleIcon />
                </ListItemIcon>
                <ListItemText primary="Collections" />
                {expandCollections ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expandCollections} timeout="auto">
                <List>
                    <ListItem
                        button
                        disabled={needSave}
                        sx={{ pl: 4 }}
                        onClick={() =>
                            Inertia.get(route("admin.collections.create"))
                        }
                    >
                        <ListItemIcon>
                            <AddCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Create collection" />
                    </ListItem>
                    {/* Added by Cyblance for Subsite section start */}
                    {MENU_ITEMS.collections.map(({ filter, label, Icon, tooltip }, idx) => {
                        const isAllowed = aliase_name === "" || aliase_name === null || label === "Structure" || label === "Dossiers" || label === "All collections";

                        if (isAllowed) {
                            return (
                                <ListItem
                                    button
                                    disabled={needSave}
                                    onClick={() =>
                                        {
                                            user?.role != "subsiteadmin" ?
                                                Inertia.get(
                                                    route(
                                                        "admin.collections.index",
                                                        filterToQuery(filter)
                                                    ).toString()
                                                )
                                                :
                                                Inertia.get(
                                                    route(
                                                        "admin.collections.index",
                                                        filterToQuery({ ...filter, ["subsite.id"]: user?.subsite_id })
                                                    ).toString()
                                                )
                                        }
                                    }
                                    sx={{ pl: 4 }}
                                    key={idx}
                                >
                                    <ListItemIcon>
                                        <Tooltip title={tooltip || ""}>
                                            {Icon ? <Icon /> : <span></span>}
                                        </Tooltip>
                                    </ListItemIcon>
                                    <ListItemText primary={label} />
                                </ListItem>
                            );
                        }
                        return null;
                    })}
                    {/* Added by Cyblance for Subsite section end */}
                </List>
            </Collapse>
            {can?.subsiteadmin?.canShareAccess && (
                <ListItemButton onClick={() => setExpandGeoData(!expandGeoData)}>
                    <ListItemIcon>
                        <CountryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Geo Data" />
                    {expandGeoData ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            )}
            <Collapse in={expandGeoData} timeout="auto">
                <List sx={{ "& .MuiListItemButton-root": { pl: 4 } }}>
                    <ListItemButton
                        LinkComponent={InertiaLink}
                        href={route("admin.geodata.import.create")}
                    >
                        <ListItemIcon>
                            <DriveFolderUploadIcon />
                        </ListItemIcon>
                        <ListItemText>Import dataset</ListItemText>
                    </ListItemButton>
                    <ListItemButton
                        LinkComponent={InertiaLink}
                        href={route("admin.geodata.dataset.index")}
                    >
                        <ListItemIcon>
                            <SourceIcon />
                        </ListItemIcon>
                        <ListItemText>Datasets</ListItemText>
                    </ListItemButton>
                    <ListItemButton
                        LinkComponent={InertiaLink}
                        href={route("admin.geodata.map.index")}
                    >
                        <ListItemIcon>
                            <MapIcon />
                        </ListItemIcon>
                        <ListItemText>Maps</ListItemText>
                    </ListItemButton>
                </List>
            </Collapse>
           
            {/* Added by Cyblance for Annual-Reports section start */}
            {can?.annualreports?.view && (
                <>
                    <ListItem
                        button
                        onClick={() =>
                            setExpandAnnualReport(!expandAnnualReport)
                        }
                    >
                        <ListItemIcon>
                            <SummarizeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Activity Reports" />
                        {expandAnnualReport ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={expandAnnualReport} timeout="auto">
                        <List>
                            <ListItem
                                button
                                sx={{ pl: 4 }}
                                onClick={() =>
                                    Inertia.get(
                                        route("admin.annualreport.create")
                                    )
                                }
                            >
                                <ListItemIcon>
                                    <AddCircleIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Create" />
                            </ListItem>
                            <ListItem
                                button
                                disabled={needSave}
                                onClick={() =>
                                    Inertia.get(
                                        route("admin.annualreports.tabbing", {
                                            id: "1",
                                            year: previousAnnualReportYear,
                                        })
                                    )
                                }
                                sx={{ pl: 4 }}
                            >
                                <ListItemIcon>
                                    <Tooltip title={""}>
                                        <FeaturedPlayListIcon />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary="Annual Reports" />
                            </ListItem>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                LinkComponent={InertiaLink}
                                href={route(
                                    "admin.worldcongress_reports.index"
                                )}
                            >
                                <ListItemIcon>
                                    <Tooltip title="Reports to World Congress">
                                        <AutoStoriesIcon />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary="Reports to Congress" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </>
            )}
            {/* Added by Cyblance for Subsite section start */}
            {can?.subsiteadmin?.create && (
                <>
                    <ListItem button onClick={() => setExpandSubsites(!expandSubsites)}>
                        <ListItemIcon>
                            <WebIcon />
                        </ListItemIcon>
                        <ListItemText primary="Subsite" />
                        {expandSubsites ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={expandSubsites} timeout="auto">
                        <List>
                            <ListItem
                                button
                                sx={{ pl: 4 }}
                                onClick={() =>
                                    Inertia.get(route("admin.subsites.create"))
                                }
                            >
                                <ListItemIcon>
                                    <AddCircleIcon
                                        color="primary"
                                    />
                                </ListItemIcon>

                                <ListItemText primary="Add Subsite" />
                            </ListItem>
                            <ListItem
                                button
                                disabled={needSave}
                                onClick={() =>
                                    Inertia.get(route("admin.subsites.index"))
                                }
                                sx={{ pl: 4 }}
                            >
                                <ListItemIcon>
                                    <Tooltip title={""}>
                                        <DynamicFeedIcon />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary="All Subsites" />
                            </ListItem>
                        </List>
                    </Collapse>
                </>
            )}
            {/* Added by Cyblance for Subsite section end */}
            <ListItem button onClick={() => setExpandUsers(!expandUsers)}>
                <ListItemIcon>
                    <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Account" />
                {expandUsers ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expandUsers} timeout="auto">
                <List>
                    {can?.users?.create && (
                        <>
                            <ListItem
                                button
                                disabled={needSave || !can?.users?.create}
                                sx={{ pl: 4 }}
                                onClick={() =>
                                    Inertia.get(route("admin.users.create"))
                                }
                            >
                                <ListItemIcon>
                                    <AddCircleIcon
                                        color={
                                            can?.users?.create
                                                ? "primary"
                                                : undefined
                                        }
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Add user" />
                            </ListItem>

                            <ListItem
                                button
                                disabled={needSave}
                                onClick={() =>
                                    Inertia.get(route("admin.users.index"))
                                }
                                sx={{ pl: 4 }}
                            >
                                <ListItemIcon>
                                    <Tooltip title={""}>
                                        <PeopleIcon />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary="All users" />
                            </ListItem>
                        </>
                    )}
                    {user && (
                        <>
                            <ListItem
                                button
                                disabled={needSave}
                                onClick={() =>
                                    Inertia.get(
                                        route("admin.users.edit", { user })
                                    )
                                }
                                sx={{ pl: 4 }}
                            >
                                <ListItemIcon>
                                    <Tooltip title={""}>
                                        <ManageAccountsIcon />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary="My account" />
                            </ListItem>
                            <ListItem
                                button
                                onClick={() => Inertia.post(route("logout"))}
                                sx={{ pl: 4 }}
                            >
                                <ListItemIcon>
                                    <Tooltip title={""}>
                                        <LogoutIcon />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </>
                    )}
                </List>
            </Collapse>
            {can?.subsiteadmin?.canShareAccess && (
            <List>
                <ListItem
                    button
                    onClick={() => Inertia.get(route("admin.share.status"))}
                >
                    <ListItemIcon>
                        <ShareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Share settings" />
                </ListItem>
            </List>
            )}
            {can?.items?.subsiteAdminAccess && (
                <List>
                    <ListItem
                        button
                        onClick={() => window.open(window.location.protocol + '//' + aliase_name + '.' + window.location.hostname)}
                    >
                        <ListItemIcon>
                            <OpenInNewIcon />
                        </ListItemIcon>
                        <ListItemText primary="Go to Mysite" />
                    </ListItem>
                </List>
            )}
            {/* Added by Cyblance for Subsite section end */}
        </List>
    );
};

export default PrimaryNavigation;
