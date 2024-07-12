import { User } from "../../Models/User";

export interface AuditEntry {
    id: number;
    user_id: number;
    event: string;
    old_values: Record<string, string>;
    new_values: Record<string, string>;
    created_at: string;
    updated_at: string;
    user: User;
    lang?: string;
}

export interface AuditLog {
    main: AuditEntry[];
    contents: { lang: string; audits: AuditEntry[] }[];
}
