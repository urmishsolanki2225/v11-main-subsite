import Collection from "./Collection";
import Item from "./Item";

export interface DevCoopProject {
    year_start: number;
    year_end: number;
    description: string;
    objectives: string;
    activities: string;
    outcomes: string;
    url: string;
    public_email: string;
    contact_name: string;
    contact_email: string;
    funding: string;
    budget_currency: string;
    budget_amount: number;
    remark_internal: string;
    is_reviewed: boolean;
    partners: DevCoopProjectPartner[];
    regional?: boolean;
}

export interface DevCoopProjectPartner {
    id?: number;
    role: "benefitting" | "dev_coop";
    affiliate_item_id?: Item["id"];
    country_collection_id?: Collection["id"];
    country_name?: string;
    country?: Collection;
    name: string;
    acronym?: string;
}
