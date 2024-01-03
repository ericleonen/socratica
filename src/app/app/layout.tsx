"use client"

import HorizontalLayout from "@/components/HorizontalLayout";
import { LayoutProps } from "@/types";
import NavSideBar from "./_components/NavSideBar";
import { useLoadDocsMetadatas } from "@/db/docs/read";
import { useLoadUser } from "@/db/user/read";
import AlertProvider from "@/components/AlertProvider";
import ModalProviders from "./_components/modals/ModalProviders";
import { useAutoLogOut } from "@/auth";

export default function AppLayout({ children }: LayoutProps) {
    useLoadUser();
    useLoadDocsMetadatas();
    useAutoLogOut();

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