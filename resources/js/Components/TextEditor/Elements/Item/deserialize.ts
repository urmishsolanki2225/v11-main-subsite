import { CanDeserializeFunction, DeserializeFunction } from "../types";

export const canDeserializeItem: CanDeserializeFunction = () => {
    return false;
};
const deserializeItem: DeserializeFunction = () => {
    return;
};

export default deserializeItem;
