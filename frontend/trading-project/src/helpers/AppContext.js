import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const searchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(searchParams.entries());

    //States to be held within the context
    const [sidebarTab, setSidebarTab] = useState(
        params.tab ? params.tab : "Dashboard"
    );

    const contextValues = {
        sidebarTab,
        setSidebarTab,
    };

    return (
        <AppContext.Provider value={contextValues}>
            {children}
        </AppContext.Provider>
    );
};