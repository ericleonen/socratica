"use client"

import HorizontalLayout from "@/components/HorizontalLayout";
import { LayoutProps } from "@/types";
import NavSideBar from "./_components/NavSideBar";
import { useDocsMetadatas } from "@/db/docs";
import { useUser } from "@/db/user";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import DeleteWarningModal from "./_components/DeleteWarningModal";

export default function AppLayout({ children }: LayoutProps) {
    useUser();
    useDocsMetadatas();

    const threatenDelete = useSelector<RootState, string>(
        state => state.doc.threatenDelete
    )

    return (
        <HorizontalLayout screenWidth>
            <NavSideBar />
            {children}
            {threatenDelete && <DeleteWarningModal />}
        </HorizontalLayout>
    )
}