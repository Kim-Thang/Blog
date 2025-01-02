"use client";

export const saveToStorage = (key: string, value: string) => {
    localStorage.removeItem(key);
    localStorage.setItem(key, value);
};

export const removeFromStorage = (key: string) => {
    localStorage.removeItem(key);
};

export const retrieveFromStorage = (key: string) => {
    if (typeof localStorage !== "undefined") {
        localStorage?.getItem(key);
    }
};
