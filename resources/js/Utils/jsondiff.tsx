import { DiffPatcher } from "jsondiffpatch";

const jsondiff = new DiffPatcher({
    objectHash: (item, index) => {
        if (item.id) {
            return `${item.id}`;
        } else {
            return `${index}`;
        }
    },
    textDiff: {
        minLength: Number.MAX_SAFE_INTEGER,
    },
    propertyFilter: (name, context) => {
        if (context?.parent?.childName === "collections") {
            // item collections, only look at the id property
            return name === "id";
        }
        return !["pivot", "items_count"].includes(name);
    },
});

export default jsondiff;
