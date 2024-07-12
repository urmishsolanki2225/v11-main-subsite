import React from "react";

import { usePage } from "@inertiajs/inertia-react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";

import { Page } from "../../Models";
import Section, { SectionSummary } from "../Section";

import { flatAuditLog } from "./functions";
import { AuditLog } from "./types";

interface AuditPageProps {
    audits?: AuditLog;
}
export const AuditSection: React.FC = () => {
    const { audits } = usePage<Page<AuditPageProps>>().props;
    const log = audits ? flatAuditLog(audits) : [];

    return (
        <Section
            title="Audit"
            summary={
                <SectionSummary
                    contents={[
                        {
                            title: "Recent audits",
                            text: `${log.length || 0} changes recorded`,
                        },
                    ]}
                />
            }
        >
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Event</TableCell>
                            <TableCell>Lang</TableCell>
                            <TableCell>Fields</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {log.map((audit) => (
                            <TableRow key={audit.id}>
                                <TableCell style={{ whiteSpace: "pre" }}>
                                    {dayjs(audit.created_at).format(
                                        "YYYY-MM-DD HH:mm"
                                    )}
                                </TableCell>
                                <TableCell style={{ whiteSpace: "pre" }}>
                                    {audit.user?.name ?? ""}
                                </TableCell>
                                <TableCell>{audit.event}</TableCell>
                                <TableCell>{audit.lang || ""}</TableCell>
                                <TableCell>
                                    {Object.keys(audit.new_values).join(", ")}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Section>
    );
};

export default AuditSection;
