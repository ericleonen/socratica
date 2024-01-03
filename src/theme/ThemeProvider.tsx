"use client"

import { LayoutProps } from "@/types";
import { useLocalStorage } from "@/utils/localStorage";
import { useEffect } from "react";

export default function ThemeProvider({ children }: LayoutProps) {
    const theme = useLocalStorage<"light" | "dark">("theme", "light")[0];

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
    }, [theme]);

    return children;
}