import { Page as InertiaPage, PageProps } from "@inertiajs/inertia";

import { QueryParams } from "../Components/General/LinkQuery";

import Collection from "./Collection";
import Item from "./Item";
import { User } from "./User";

export type AuthCanRules = Record<string, Record<string, boolean>>;

export const ALERT_TYPES = ["success", "info", "warning", "error"] as const;
export type AlertType = (typeof ALERT_TYPES)[number];
export type Message = { type: AlertType; message: string };
export type MessageBag = Record<string, string>;
export interface IErrors {
    [key: string]: string;
}

export interface IFilterProps extends QueryParams {
    filter: {
        search?: string;
        type?: string;
        subtype?: string;
        missing_translations?: string;
        missing_files?: string;
        missing_workarea?: string;
        status?: string;
        "collection.id"?: number;
        trashed?: "only";
        published_before?: string;
        published_after?: string;
    };
}
export interface IListingPageProps {
    filter?: IFilterProps;
    sort?: string;
    page?: number;
}
export interface ICollectionPageProps {
    collection: Collection;
    layouts?: Record<string, string>;
    items?: Item[];
}

export interface AuthPageProps {
    can?: AuthCanRules;
}

export type ErrorKeys = string;
export interface ErrorPageProps {
    errors?: Record<ErrorKeys, string>;
}
export interface FlashInfoPageProps {
    flash?: MessageBag;
}
export interface UserPageProps {
    user?: User;
}
export interface AllowPageProps {
    allow?: {
        membership: {
            collection_types: string[];
            collection_ids?: number[];
        };
    };
}

export interface SessionPageProps extends PageProps {
    session_lifetime: number;
}

export type Page<T> = InertiaPage & {
    props: T;
};
