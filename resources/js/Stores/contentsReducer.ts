import { Reducer } from "react";

import { Content } from "../Models";
import jsondiff from "../Utils/jsondiff";

export interface ContentReset<T extends Content> {
    type: "content_reset";
    contents: T[];
}
export interface ContentUpdate {
    type: "content_update";
    lang: string;
    field: string;
    value: string;
}
export interface ContentRemove {
    type: "content_remove";
    lang: string;
}
export interface ContentAdd<T extends Content> {
    type: "content_add";
    lang: string;
    content?: T;
    fields?: string[];
}

export type ContentAction<T extends Content> =
    | ContentReset<T>
    | ContentUpdate
    | ContentRemove
    | ContentAdd<T>;

const addContent = <T extends Content>(
    contents: T[],
    { lang, content, fields }: ContentAdd<T>
): T[] => {
    const baseContent: any = {};
    if (fields) {
        fields.forEach((field) => {
            baseContent[field] = "";
        });
    }
    const newContent = ({
        ...baseContent,
        ...content,
        lang: lang,
        id: undefined,
    } as any) as T;
    delete newContent.id;
    // shallow clone and remove everything that looks like an id
    for (const [k, v] of Object.entries(newContent)) {
        if (Array.isArray(v)) {
            const vNoId = v.map((obj) => {
                const newObj = { ...obj };
                delete newObj.id;
                delete newObj.content_id;
                delete newObj.item_content_id;
                return newObj;
            });
            (newContent as any)[k] = vNoId;
        }
    }
    return [...contents, newContent];
};

const pickWithFalsy = (original: any, newValue: any) => {
    if (newValue) {
        return newValue;
    }
    if (!original) {
        return original;
    }
    return newValue;
};

const contentsReducer = <T extends Content>(): Reducer<
    T[],
    ContentAction<T>
> => (contents: T[], action: ContentAction<T>): T[] => {
    let result: T[] = [];
    if (action.type === "content_reset") {
        result = action.contents;
    } else if (action.type === "content_add") {
        result = addContent(contents, action);
    } else if (action.type === "content_remove") {
        result = contents.filter(({ lang }) => lang !== action.lang);
    } else if (action.type === "content_update") {
        result = contents.map((content) =>
            content.lang !== action.lang
                ? content
                : {
                      ...content,
                      [action.field]: pickWithFalsy(
                          (content as any)[action.field],
                          action.value
                      ),
                  }
        );
    }
    // console.log("reducer", action, jsondiff.diff(result, contents));
    return jsondiff.diff(result, contents) ? result : contents;
};

export default contentsReducer;
