import React, { createContext, useContext } from "react";

import { GridRowModel } from "@mui/x-data-grid";

interface IListingContext {
    onSelect: (row: GridRowModel) => void;
    onCancel: () => void;
}

interface IListingProvider {
    onSelect: (row: GridRowModel) => void;
    onCancel: () => void;
    children?: React.ReactNode;
}
export const ListingProvider: React.FC<IListingProvider> = ({
    onSelect,
    onCancel,
    children,
}) => {
    return (
        <ListingContext.Provider value={{ onSelect, onCancel }}>
            {children}
        </ListingContext.Provider>
    );
};

const ListingContext = createContext<IListingContext | undefined>(undefined);

export default ListingContext;

export const useListingContext = () => useContext(ListingContext)!;
