import React from "react";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

import { AppBarHeader, ContentScroll } from "../../Layout";

interface IProps {
    accounts: {
        name: string;
        status: "ok" | "invalid" | "expired";
        token_expires_at?: string;
        authorize_url: string;
    }[];
}
export const SocialMediaAccounts: React.FC<IProps> = ({ accounts = [] }) => {
    return (
        <>
            <AppBarHeader title="Social Sharing Accounts Status" />
            <ContentScroll>
                <Paper sx={{ m: 2, p: 2 }}>
                    <Typography>
                        The social media accounts need to be set up correctly
                        for the item sharing to function. Someone who has access
                        to the correct accounts should use the{" "}
                        <strong>Authorize</strong> buttons, making sure to login
                        to the correct social media account.
                    </Typography>
                    <Table sx={{ my: 2, mx: -2 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Account</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Expires at</TableCell>
                                <TableCell>Authorize</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accounts.map((account) => (
                                <TableRow key={account.name}>
                                    <TableCell>{account.name}</TableCell>
                                    <TableCell>{account.status}</TableCell>
                                    <TableCell>
                                        {account.token_expires_at
                                            ? dayjs(
                                                  account.token_expires_at
                                              ).format("YYYY-MM-DD HH:mm:ss")
                                            : account.status === "ok"
                                            ? "never"
                                            : ""}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            href={account.authorize_url}
                                        >
                                            Authorize
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </ContentScroll>
        </>
    );
};

export default SocialMediaAccounts;
