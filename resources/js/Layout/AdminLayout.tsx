import React from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLocalStorage } from "react-use";

import { Message } from "../Models/Inertia";

import { AppProvider } from "./AppContext";
import FlashMessages from "./FlashMessages";
import PrimaryNavigation from "./PrimaryNavigation";
import SessionLifetime from "./SessionLifetimeAlert";

//Added by Cyblance for Subsite section start
import { Page, GetSubsite } from "../Models";
import { usePage } from "@inertiajs/inertia-react";
//Added by Cyblance for Subsite section end

const drawerWidth = 240;

interface IProps {
    errors?: Message;
    flash?: Message;
    children?: React.ReactNode;
}
export const AdminLayout: React.FC<IProps> = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useLocalStorage("drawerOpen", true);
    const theme = useTheme();

    //Added by Cyblance for Subsite section start
    const { subsite } = usePage<Page<GetSubsite>>().props;
    let name = "";
    if (subsite != null && subsite.aliase_name != null) {
        name = subsite.aliase_name;
    }
    let string_add = '';
    if (name.length > 9) {
        string_add = '...';
    }
    //Added by Cyblance for Subsite section end

    return (
        <AppProvider>
            <Box display="flex">
                <CssBaseline />
                <FlashMessages />
                <SessionLifetime />
                <Drawer
                    variant="permanent"
                    open={drawerOpen}
                    PaperProps={{
                        sx: {
                            position: "relative",
                            whiteSpace: "nowrap",
                            borderRight: "1px solid rgba(0, 0, 0, .5)",
                            width: drawerOpen ? drawerWidth : theme.spacing(9),
                            transition: theme.transitions.create("width", {
                                easing: theme.transitions.easing.sharp,
                                duration:
                                    theme.transitions.duration.enteringScreen,
                            }),
                            overflowX: drawerOpen ? "hidden" : undefined,
                        },
                    }}
                >
                    <AppBar
                        position="absolute"
                        sx={{ zIndex: theme.zIndex.drawer + 1 }}
                    >
                        <Toolbar>
                            {drawerOpen ? (
                                <>
                                    <IconButton
                                        aria-label="close drawer"
                                        edge="start"
                                        onClick={() => setDrawerOpen(false)}
                                        size="large"
                                    >
                                        <ChevronLeftIcon />
                                    </IconButton>
                                    <Typography
                                        variant="h6"
                                        sx={{ flexGrow: 1 }}
                                    >
                                        {/* Added by Cyblance for Subsite section start */}
                                        {name == ''  ? `Ei-iE` : `${name.charAt(0).toUpperCase() + name.slice(1).substring(0, 9) + string_add}`}
                                        {/* Added by Cyblance for Subsite section end */}
                                    </Typography>
                                </>
                            ) : (
                                <IconButton
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={() => setDrawerOpen(true)}
                                    size="large"
                                >
                                    <MenuIcon />
                                </IconButton>
                            )}
                        </Toolbar>
                    </AppBar>
                    <Box
                        sx={{
                            position: "absolute",
                            top: theme.mixins.toolbar.minHeight,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            overflowY: "scroll",
                        }}
                    >
                        <Divider />
                        <PrimaryNavigation />
                    </Box>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box sx={{ flexGrow: 1, position: "relative" }}>
                        {children}
                    </Box>
                </Box>
            </Box>
        </AppProvider>
    );
};

export default AdminLayout;
