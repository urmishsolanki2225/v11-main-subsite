import React, { useEffect, useState } from "react";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import {
    PageViewsPerPathChart,
    SessionsByDateChart,
    SessionsBySourceChart,
    TableChart,
    ViewSelector,
} from "react-analytics-charts";
import {
    useAnalyticsApi,
    useAuthorize,
    useData,
} from "react-use-analytics-api";

import { AppBarHeader, ContentScroll } from "../Layout";

interface IProps {
    access_token: string;
    analytics_view_id: string;
}
const Home: React.FC<IProps> = ({ access_token, analytics_view_id }) => {
    const [viewId, setViewId] = useState(analytics_view_id);
    const [days, setDays] = useState(28);
    const { gapi, authorized, error } = useAnalyticsApi();
    const authorize = useAuthorize(gapi, {
        serverAuth: {
            access_token,
        },
    });
    const [totals, setTotals] = useState({ sessions: [0], pageviews: [0] });
    const execute = useData(
        gapi,
        {
            ids: viewId,
            "start-date": `${2 * days}daysAgo`,
            "end-date": "yesterday",
            metrics: "ga:sessions,ga:pageviews",
            dimensions: "ga:date",
        },
        (response) => {
            const mid = Math.floor(response.rows.length / 2);
            const firstHalf = response.rows.slice(0, mid);
            const secondHalf = response.rows.slice(mid);
            const sumup =
                (idx: number) =>
                (total: number, values: any): number =>
                    total + parseInt(values[idx]);
            setTotals({
                sessions: [
                    firstHalf.reduce(sumup(1), 0),
                    secondHalf.reduce(sumup(1), 0),
                ],
                pageviews: [
                    firstHalf.reduce(sumup(2), 0),
                    secondHalf.reduce(sumup(2), 0),
                ],
            });
        }
    );

    useEffect(() => {
        access_token && !authorized && authorize && authorize();
    }, [authorize, authorized, access_token]);

    useEffect(() => {
        const timer = setTimeout(() => execute(), 1000);
        return () => clearTimeout(timer);
    }, [execute, days]);

    useEffect(() => {
        error && console.log("error", error);
    }, [error]);

    return (
        <>
            <AppBarHeader title="Dashboard" />
            <ContentScroll>
                <Paper sx={{ m: 1, p: 1 }}>
                    {!access_token && (
                        <Typography variant="body1" color="warning">
                            No valid analytics access found.
                        </Typography>
                    )}
                    {authorized && (
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <ViewSelector
                                        gapi={gapi}
                                        onChange={(viewId) => setViewId(viewId)}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl
                                        component="fieldset"
                                        margin="dense"
                                    >
                                        <FormLabel component="legend">
                                            Period
                                        </FormLabel>
                                        <RadioGroup
                                            value={days}
                                            onChange={(_evt, value) =>
                                                setDays(parseInt(value))
                                            }
                                        >
                                            <FormControlLabel
                                                value={7}
                                                control={<Radio />}
                                                label="7 days"
                                            />
                                            <FormControlLabel
                                                value={28}
                                                control={<Radio />}
                                                label="28 days"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl
                                        component="fieldset"
                                        margin="dense"
                                    >
                                        <FormLabel component="legend">
                                            Totals
                                        </FormLabel>
                                        <div>
                                            Sessions: {totals.sessions[0]} to{" "}
                                            {totals.sessions[1]}
                                        </div>
                                    </FormControl>
                                    {/* <ColumnChart
                                        gapi={gapi}
                                        query={{
                                            ids: viewId,
                                            "start-date": `${4 * days}daysAgo`,
                                            "end-date": "today",
                                            dimensions: "ga:week",
                                            metrics: "ga:sessions,ga:pageviews",
                                        }}
                                        container="sessions-per-week-chart"
                                        options={{
                                            title: "Sessions per calendar week",
                                        }}
                                    /> */}
                                </Grid>
                                <Grid item xs={6}>
                                    <SessionsByDateChart
                                        gapi={gapi}
                                        viewId={viewId}
                                        days={days}
                                        showPageViews
                                        options={{
                                            title: `Sessions and pageviews`,
                                        }}
                                    />
                                    <SessionsBySourceChart
                                        gapi={gapi}
                                        viewId={viewId}
                                        days={days}
                                        options={{
                                            title: `Sessions by source`,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TableChart
                                        gapi={gapi}
                                        query={{
                                            ids: viewId,
                                            "start-date": `${
                                                days ?? 28
                                            }daysAgo`,
                                            "end-date": "today",
                                            metrics: "ga:sessions,ga:pageviews",
                                            dimensions: "ga:country",
                                        }}
                                        container="sessions-per-country-chart"
                                        options={{
                                            sortAscending: false,
                                            sortColumn: 1,
                                            width: "100%",
                                            pageSize: 10,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <PageViewsPerPathChart
                                        gapi={gapi}
                                        viewId={viewId}
                                        days={days}
                                        options={{ width: "100%" }}
                                    />
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Paper>
            </ContentScroll>
        </>
    );
};

export default Home;
