"use client"

import HorizontalLayout from "@/components/HorizontalLayout";
import { LayoutProps } from "@/types";
import NavSideBar from "./_components/NavSideBar";
import { useLoadDocsMetadatas } from "@/db/docs/read";
import { useUser } from "@/db/user";
import AlertProvider from "@/components/AlertProvider";
import ModalProviders from "./_components/modals/ModalProviders";
import { useEffect } from "react";
import { useLocalStorage } from "@/utils/localStorage";

export default function AppLayout({ children }: LayoutProps) {
    useUser();
    useLoadDocsMetadatas();

    const theme = useLocalStorage<"light" | "dark">("theme", "light")[0];

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
    }, [theme]);

    return (
        <AlertProvider>
            <ModalProviders>
                <HorizontalLayout screenWidth>
                    <NavSideBar />
                    {children}
                </HorizontalLayout>
            </ModalProviders>
        </AlertProvider>
    )
}