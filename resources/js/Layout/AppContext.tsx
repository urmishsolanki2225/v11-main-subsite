import React, { createContext, useContext, useState } from "react";

import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import Themed from "./Themed";

dayjs.extend(utc);

interface IAppContext {
    needSave: boolean;
    setNeedSave: (needSave: boolean) => void;
}

// interface IAppContextProvider {}
export const AppProvider: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    const [needSave, setNeedSave] = useState(false);
    return (
        <AppContext.Provider value={{ needSave, setNeedSave }}>
            <Themed>
                <StyledEngineProvider injectFirst>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {children}
                    </LocalizationProvider>
                </StyledEngineProvider>
            </Themed>
        </AppContext.Provider>
    );
};

export const AppContext = createContext<IAppContext | undefined>(undefined);
export const useAppContext = () => useContext(AppContext)!;

export default AppContext;
