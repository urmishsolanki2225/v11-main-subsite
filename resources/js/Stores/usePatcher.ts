import { useCallback } from "react";

import { useDispatch } from "./DispatchProvider";

const usePatcher = () => {
    const dispatch = useDispatch();
    const patcher = useCallback(
        (field: string, value: any) => {
            dispatch({ type: "patch", field, value });
        },
        [dispatch]
    );
    return patcher;
};

export default usePatcher;
