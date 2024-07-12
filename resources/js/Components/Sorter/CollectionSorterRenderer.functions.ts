import { Collection, findTitle } from "../../Models";

export const getTitleWithParent = (collection: Collection) => {
    const title = findTitle(collection);
    if (collection.type === "dossier_sub") {
        const parentDossier = collection.parent_collections?.find(
            ({ type }) => type === "dossier"
        );
        if (parentDossier) {
            const parentTitle = findTitle(parentDossier);
            return `${parentTitle} – ${title}`;
        }
    }
    return title;
};
