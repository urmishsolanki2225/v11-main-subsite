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

const drawerWidth = 240;

interface IProps {
    errors?: Message;
    flash?: Message;
    children?: React.ReactNode;
}
export const AdminLayout: React.FC<IProps> = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useLocalStorage("drawerOpen", true);
    const theme = useTheme();

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
                                        Ei-iE
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
