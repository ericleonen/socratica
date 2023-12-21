"use client"

import HorizontalLayout from "@/components/HorizontalLayout";
import { LayoutProps } from "@/types";
import NavSideBar from "./_components/NavSideBar";
import { useLoadDocsMetadatas } from "@/db/docs/read";
import { useUser } from "@/db/user";
import DeleteWarningModal from "./_components/DeleteWarningModal";
import { useThreateningDelete } from "@/db/docs/delete";

export default function AppLayout({ children }: LayoutProps) {
    useUser();
    useLoadDocsMetadatas();

    const threateningDelete = useThreateningDelete();

    return (
        <HorizontalLayout screenWidth>
            <NavSideBar />
            {children}
            { threateningDelete && <DeleteWarningModal /> }
        </HorizontalLayout>
    )
}