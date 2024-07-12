import React, { useEffect, useState } from "react";

import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    List,
    ListItemText,
    Paper,
    Tooltip,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import dayjs from "dayjs";
import route from "ziggy-js";

import { Confirm } from "../Components/General/Confirm";

interface IProps {
    annualreport: any;
    status: number;
    year: number;
    showTrashed: number;
}
const AnnualreportHighlight: React.FC<IProps> = ({
    annualreport,
    // status,
    year,
    showTrashed,
}) => {
    const iconStyle = { cursor: "pointer" };
    const theme = useTheme();
    const [annualreports, setannualreports] = useState<any>(annualreport);

    const months = Array.from({ length: 12 }, (_, index) => ({
        value: (index + 1).toString(),
        label: new Date(0, index).toLocaleString("en", { month: "long" }),
    }));

    const handleAddHighlightClick = (year: any, month: any) => {
        const type = "highlight";
        const params: any = { month, year, type };
        Inertia.get(route("admin.annualreport.create").toString(), params);
    };

    const onRestore = (id: any) => {
        Inertia.post(route("admin.annualreport.restore", { id: id }));
    };
    const onDestroy = (id: any) => {
        Inertia.delete(
            route("admin.annualreport.destroyreport", { id: id, code: 1 })
        );
    };

    const handleHighlightRemove = (annualreportId: any) => {
        Inertia.post(route("admin.annualreport.trash", annualreportId));
    };

    const [draggedItem, setDraggedItem] = useState<any>(null);

    useEffect(() => {
        if (annualreport) {
            const sortedData = [...annualreport].sort(
                (a, b) => a.order_index - b.order_index
            );
            setannualreports(sortedData);
        }
    }, [annualreport]);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData("text/plain", id);
        setDraggedItem(id);
    };

    const handleDragOver = (e: React.DragEvent, id: string) => {
        e.preventDefault();
        if (draggedItem !== id) {
            const newAnnualreports = [...annualreports]; // Use the local state
            const draggedIndex = newAnnualreports.findIndex(
                (item) => item.id === draggedItem
            );
            const targetIndex = newAnnualreports.findIndex(
                (item) => item.id === id
            );

            const temp = newAnnualreports[draggedIndex];
            newAnnualreports[draggedIndex] = newAnnualreports[targetIndex];
            newAnnualreports[targetIndex] = temp;
            // Update your state with the new order
            setannualreports(newAnnualreports);
        }
    };
    const handleDragEnd = (month: any) => {
        setDraggedItem(null);
        const orderUpdates = annualreports.map(
            (annualreport: any, index: any) => ({
                id: annualreport.id,
                orderIndex: index,
                month: month,
            })
        );
        console.log("Sending request", { orderUpdates });
        axios
            .post(route("admin.updateOrder"), { orderUpdates })
            .then((response) => {
                console.log("Response:", response);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    return (
        <>
            <Paper sx={{ m: 0, p: 1, backgroundColor: "rgb(0 0 0 / 10%)" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1.5}>
                        {months.map((month: any) => (
                            <React.Fragment key={month.value}>
                                <Grid item xs={4}>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                        sx={{ textAlign: "center" }}
                                    >
                                        {month.label}
                                    </Typography>
                                    <Card
                                        sx={{
                                            mb: 2,
                                            mt: 1,
                                            boxShadow: 1,
                                            borderRadius: 2,
                                        }}
                                        style={{
                                            minHeight: "465px",
                                            position: "relative",
                                        }}
                                    >
                                        <CardContent>
                                            {annualreports.some(
                                                (annualreport: any) => {
                                                    return (
                                                        annualreport.month ==
                                                        month.value
                                                    );
                                                }
                                            ) ? (
                                                <List
                                                    style={{
                                                        maxHeight: "400px  ",
                                                        overflowY: "auto",
                                                    }}
                                                >
                                                    {annualreports.map(
                                                        (
                                                            annualreport: any,
                                                            key: any
                                                        ) => {
                                                            if (
                                                                annualreport.month ==
                                                                month.value
                                                            ) {
                                                                return (
                                                                    <React.Fragment
                                                                        key={
                                                                            key
                                                                        }
                                                                    >
                                                                        <div
                                                                            key={
                                                                                key
                                                                            }
                                                                            draggable
                                                                            onDragStart={(
                                                                                e
                                                                            ) =>
                                                                                handleDragStart(
                                                                                    e,
                                                                                    annualreport.id
                                                                                )
                                                                            }
                                                                            onDragOver={(
                                                                                e
                                                                            ) =>
                                                                                handleDragOver(
                                                                                    e,
                                                                                    annualreport.id
                                                                                )
                                                                            }
                                                                            onDragEnd={() =>
                                                                                handleDragEnd(
                                                                                    annualreport.month
                                                                                )
                                                                            }
                                                                            style={{
                                                                                border: "1px solid #ccc",
                                                                                marginBottom:
                                                                                    "3px",
                                                                                padding:
                                                                                    "10px",
                                                                            }}
                                                                        >
                                                                            <div
                                                                                style={{
                                                                                    display:
                                                                                        "flex",
                                                                                    alignItems:
                                                                                        "center",
                                                                                    justifyContent:
                                                                                        "space-between",
                                                                                }}
                                                                            >
                                                                                <div
                                                                                    style={{
                                                                                        display:
                                                                                            "flex",
                                                                                        alignItems:
                                                                                            "center",
                                                                                    }}
                                                                                >
                                                                                    <DragIndicatorIcon
                                                                                        style={
                                                                                            iconStyle
                                                                                        }
                                                                                    />
                                                                                    <InertiaLink
                                                                                        href={route(
                                                                                            "admin.annualreport.edit",
                                                                                            {
                                                                                                id: annualreport.id,
                                                                                            }
                                                                                        ).toString()}
                                                                                    >
                                                                                        <ListItemText
                                                                                            primary={
                                                                                                annualreport
                                                                                                    .content
                                                                                                    ?.title
                                                                                                    ? annualreport
                                                                                                          .content
                                                                                                          .title
                                                                                                    : "- No title -"
                                                                                            }
                                                                                            onClick={() =>
                                                                                                handleAddHighlightClick(
                                                                                                    year,
                                                                                                    month.value
                                                                                                )
                                                                                            }
                                                                                            style={{
                                                                                                fontFamily:
                                                                                                    "revert-layer",
                                                                                                marginLeft:
                                                                                                    "10px",
                                                                                            }}
                                                                                        />
                                                                                    </InertiaLink>
                                                                                    {annualreport.status ==
                                                                                        "published" &&
                                                                                    (!annualreport.publish_at ||
                                                                                        dayjs(
                                                                                            annualreport.publish_at
                                                                                        ).isBefore(
                                                                                            dayjs()
                                                                                        )) ? (
                                                                                        ""
                                                                                    ) : (
                                                                                        <Tooltip title="Unpublished">
                                                                                            <div>
                                                                                                <PublicOffIcon
                                                                                                    sx={{
                                                                                                        fontSize:
                                                                                                            theme
                                                                                                                .typography
                                                                                                                .fontSize,
                                                                                                        color: "text.secondary",
                                                                                                        marginLeft: 0.5,
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        </Tooltip>
                                                                                    )}
                                                                                </div>
                                                                                <div
                                                                                    style={{
                                                                                        display:
                                                                                            "flex",
                                                                                    }}
                                                                                >
                                                                                    {showTrashed ===
                                                                                    0 ? (
                                                                                        <Tooltip title="Remove">
                                                                                            <div>
                                                                                                <Confirm
                                                                                                    onConfirm={() =>
                                                                                                        handleHighlightRemove(
                                                                                                            annualreport.id
                                                                                                        )
                                                                                                    }
                                                                                                >
                                                                                                    <div>
                                                                                                        <RemoveCircleIcon
                                                                                                            color="secondary"
                                                                                                            fontSize="small"
                                                                                                            style={
                                                                                                                iconStyle
                                                                                                            }
                                                                                                        />
                                                                                                    </div>
                                                                                                </Confirm>
                                                                                            </div>
                                                                                        </Tooltip>
                                                                                    ) : (
                                                                                        <>
                                                                                            <Tooltip title="Restore">
                                                                                                <div>
                                                                                                    <Confirm
                                                                                                        onConfirm={() =>
                                                                                                            onRestore(
                                                                                                                annualreport.id
                                                                                                            )
                                                                                                        }
                                                                                                    >
                                                                                                        <div>
                                                                                                            <RestartAltIcon
                                                                                                                color="primary"
                                                                                                                fontSize="small"
                                                                                                                style={
                                                                                                                    iconStyle
                                                                                                                }
                                                                                                            />
                                                                                                        </div>
                                                                                                    </Confirm>
                                                                                                </div>
                                                                                            </Tooltip>
                                                                                            <Tooltip title="Permanently Delete">
                                                                                                <div>
                                                                                                    <Confirm
                                                                                                        onConfirm={() =>
                                                                                                            onDestroy(
                                                                                                                annualreport.id
                                                                                                            )
                                                                                                        }
                                                                                                    >
                                                                                                        <div>
                                                                                                            <DeleteForeverIcon
                                                                                                                color="error"
                                                                                                                fontSize="small"
                                                                                                                style={
                                                                                                                    iconStyle
                                                                                                                }
                                                                                                            />
                                                                                                        </div>
                                                                                                    </Confirm>
                                                                                                </div>
                                                                                            </Tooltip>
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                style={{
                                                                                    textAlign:
                                                                                        "right",
                                                                                    marginBottom:
                                                                                        "-7px",
                                                                                }}
                                                                            >
                                                                                <Typography
                                                                                    style={{
                                                                                        fontSize:
                                                                                            "10px",
                                                                                    }}
                                                                                >
                                                                                    Published
                                                                                    at:&nbsp;
                                                                                    {annualreport.publish_at
                                                                                        ? dayjs(
                                                                                              annualreport.publish_at
                                                                                          ).format(
                                                                                              "YYYY-MM-DD HH:mm"
                                                                                          )
                                                                                        : dayjs().format(
                                                                                              "YYYY-MM-DD HH:mm"
                                                                                          ) // Display current date if publish_at is undefined
                                                                                    }
                                                                                </Typography>
                                                                            </div>
                                                                        </div>
                                                                    </React.Fragment>
                                                                );
                                                            } else {
                                                                return null; // If the month doesn't match, return null to skip rendering
                                                            }
                                                        }
                                                    )}
                                                </List>
                                            ) : (
                                                <Typography
                                                    variant="body1"
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                        marginTop: "200px",
                                                    }}
                                                >
                                                    <DoNotDisturbIcon /> No Data
                                                    Found.
                                                </Typography>
                                            )}
                                            <Button
                                                size="small"
                                                onClick={() =>
                                                    handleAddHighlightClick(
                                                        year,
                                                        month.value
                                                    )
                                                }
                                                color="secondary"
                                                style={{
                                                    position: "absolute",
                                                    bottom: "10px",
                                                    background: "white",
                                                    width: "100%",
                                                    justifyContent: "start",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <AddCircleIcon
                                                    color="secondary"
                                                    fontSize="small"
                                                />{" "}
                                                Add
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Box>
            </Paper>
        </>
    );
};
export default AnnualreportHighlight;
