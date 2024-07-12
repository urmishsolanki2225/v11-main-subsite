import { Collection } from "../Models";
import jsondiff from "../Utils/jsondiff";

import { CollectionAction } from "./actions";

const collectionReducer = (
    collection: Collection,
    action: CollectionAction
): Collection => {
    let result = undefined;
    if (action.type === "patch") {
        result = { ...collection, [action.field]: action.value };
    } else if (action.type === "patch_meta") {
        result = {
            ...collection,
            meta: { ...collection.meta, [action.meta_field]: action.value },
        };
    } else if (action.type === "collection_reset") {
        result = action.collection;
    } else {
        console.warn("invalid reducer action", action);
        result = collection;
    }
    // check for changes
    return jsondiff.diff(result, collection) ? result : collection;
};

export default collectionReducer;
