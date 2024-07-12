import Item from "./Item";

export interface DCProject {
    contact_person_name?: string;
    started_at?: string;
    ended_at?: string;
    description?: string;
    goals?: string;
    activity_type?: string;
    results?: string;
    funding?: string;
    budget?: string;
    url?: string;
    host_organisations: Item[];
    cooperating_organisations: Item[];

    host_orgs_str?: string;
    coop_orgs_str?: string;
    countries_str?: string;
    topics_str?: string;
}
