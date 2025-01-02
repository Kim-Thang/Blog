"use client";

import { THEME } from "@/constants/theme.constant";
import { retrieveFromStorage, saveToStorage } from "@/utils/storage.utils";
import { createContext, useState, ReactNode, useEffect } from "react";

interface ThemeContextType {
    theme: string;
    toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: THEME.LIGHT,
    toggle: () => {},
});

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<string>(
        retrieveFromStorage("theme") ?? THEME.LIGHT
    );

    const toggle = (): void => {
        setTheme(THEME.LIGHT === theme ? THEME.DARK : THEME.LIGHT);
    };

    useEffect(() => {
        saveToStorage("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
};
