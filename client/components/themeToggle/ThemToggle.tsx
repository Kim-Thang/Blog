"use client"

import Image from "next/image";
import styles from "./ThemeToggle.module.css";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { THEME } from "@/constants/theme.constant";


export const ThemeToggle = () => {
    const {theme, toggle} = useContext(ThemeContext);

    return (    
        <div
            className={styles.container}
            onClick={toggle}
            style={
                theme === THEME.DARK
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "#0f172a" }
            }
        >
            <Image src="/moon.png" alt="" width={14} height={14} />
            <div
                className={styles.ball}
                style={
                    theme === THEME.DARK
                        ? { left: 1, background: "#0f172a" }
                        : { right: 1, background: "white" }
                }
            ></div>
            <Image src="/sun.png" alt="" width={14} height={14} />
        </div>
    );
};
