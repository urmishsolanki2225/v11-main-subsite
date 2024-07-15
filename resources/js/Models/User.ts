export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: boolean;
    created_at: string;
    updated_at: string;
    //Added by Cyblance for Subsite section start
    subsite_id: number;
    role: "editor" | "admin" | "subsiteadmin";
    //Added by Cyblance for Subsite section end
    //Added By Cyblance for delete functionality start
    deleted_at: string;
    //Added By Cyblance for delete functionality end
}
