//

import { Item } from ".";

export interface ImageResource {
    path: string;
}

export interface VideoResource {
    provider: string;
    provider_id: string;
}

export interface LinkResource {
    url: string;
    order: number;
    checked_at: Date;
    label: string;
    // pretext: string;
    // posttext: string;
}

export interface FileResource {
    id: number;
    path: string;
    order: number;
    label: string;
    original_filename: string;
    // checked_at: Date;
    // pretext: string;
    // posttext: string;
}

export interface EmbedResource {
    post_url: string;
}

export const isImageResource = (item?: Item): boolean => {
    if (!item) return false;
    return (
        item.subtype === "image" ||
        item.subtype === "image.icon" ||
        item.subtype === "image.portrait" ||
        item.subtype === "image.square"
    );
};
