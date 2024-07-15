export interface Subsite {
    id: number;
    region_id: number;
    name: string;
    aliase_name: string;
    address: string;
    phone: string;
    fax: string;
    email: string;
    map_url: string;
    primary_color: string;
    secondary_color: string;
    is_active: "active" | "in-active";
    tracking_code: string;
    view_id: string;
    languages:any;
    created_at: string;
    updated_at: string;
}
export default Subsite;

export interface SubsiteContactUsDetails {
    id:number;
    subsite_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}