import { CollectionType } from "../Config";

import {
    ArticlesPicker,
    AuthorPicker,
    CollectionBrowserMenu,
    ContactsPicker,
    CountryPicker,
    DossierPicker,
    LibraryPicker,
    PersonsPicker,
    StructurePicker,
    WorkareaPicker,
} from "./Browser";

export interface ICollectionGroup {
    label: string;
    menu: CollectionBrowserMenu;
}
export const CollectionGroups: ICollectionGroup[] = [
    {
        label: "Structure & Articles",
        menu: [...StructurePicker, ...ArticlesPicker],
    },
    {
        label: "Dossier & Priorities",
        menu: [...WorkareaPicker, ...DossierPicker],
    },
    {
        label: "Library",
        menu: [...LibraryPicker],
    },
    {
        label: "People",
        menu: [...AuthorPicker, ...ContactsPicker, ...PersonsPicker],
    },
    {
        label: "Countries & Regions",
        // menu: [...TagPicker, ...CountryPicker],
        menu: [...CountryPicker],
    },
];

export const mapCollectionMenuTypes = (
    groups: ICollectionGroup[]
): CollectionType[][] => {
    // return groups.reduce(({menu}, types) => [...types, ...menu.reduce()]
    return groups.map(
        ({ menu }) =>
            menu.reduce((types: CollectionType[], { value }) => {
                let result = [...types, ...value];
                if (
                    result.includes("dossier") &&
                    !result.includes("dossier_sub")
                ) {
                    result = [...result, "dossier_sub"];
                }
                return result;
            }, [])

        // (types, { value }) => [...types, ...value], [])
    );
    // .reduce((prev, cur, idx) => [...prev, ...cur], []);
};
