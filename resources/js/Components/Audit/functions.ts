import { AuditLog } from "./types";

export const flatAuditLog = (audits: AuditLog) => {
    return [
        ...audits.main,
        ...audits.contents.flatMap(({ lang, audits }) =>
            audits.map((entry) => ({ ...entry, lang }))
        ),
    ].sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
};
