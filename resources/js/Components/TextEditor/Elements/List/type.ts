import { Text } from "slate";

export type ListVariantAttribute = "variant-a" | "variant-b";
export type ListVariantAttributes = {
    variant?: ListVariantAttribute;
};

export const typeOrderedList = "ordered-list";
export const typeUnorderedList = "unordered-list";

export type ListItemElementType = {
    type: "list-item";
    children: Text[];
};

export type OrderedListElementType = ListVariantAttributes & {
    type: "ordered-list";
    children: ListItemElementType[];
};

export type UnorderedListElementType = ListVariantAttributes & {
    type: "unordered-list";
    children: ListItemElementType[];
};
