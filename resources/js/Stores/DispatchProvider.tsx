import React, { createContext, Dispatch, useContext } from "react";

// Added by Cyblance for Annual-Reports section start
import { CollectionAction, ItemAction, AnnualreportAction } from "./actions";

const DispatchContext = createContext<
    | Dispatch<ItemAction>
    | Dispatch<CollectionAction>
    | Dispatch<AnnualreportAction>
    | null
>(null);

interface IProps {
    dispatch:
        | Dispatch<ItemAction>
        | Dispatch<CollectionAction>
        | Dispatch<AnnualreportAction>;
    children?: React.ReactNode;
}

const DispatchProvider: React.FC<IProps> = ({ dispatch, children }) => (
    <DispatchContext.Provider value={dispatch}>
        {children}
    </DispatchContext.Provider>
);
export const useDispatch = () => useContext(DispatchContext)!;
export const useItemDispatch = () =>
    useContext(DispatchContext)! as Dispatch<ItemAction>;

export default DispatchProvider;
