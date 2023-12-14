"use client"

import HorizontalLayout from "@/components/HorizontalLayout";
import { LayoutType } from "@/types";
import NavSideBar from "./_components/NavSideBar";
import { useDocsMetadatas } from "@/db/docs";
import { useUser } from "@/db/user";

export default function AppLayout({ children }: LayoutType) {
    useUser();
    useDocsMetadatas();

    return (
        <HorizontalLayout screenWidth>
            <NavSideBar />
            {children}
        </HorizontalLayout>
    )
}