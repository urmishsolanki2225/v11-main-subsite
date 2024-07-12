export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: boolean;
    created_at: string;
    updated_at: string;
    role: "editor" | "admin";
    //Added By Cyblance for delete functionality start
    deleted_at: string;
    //Added By Cyblance for delete functionality end
}
