"use client"

import HorizontalLayout from "@/components/HorizontalLayout";
import { LayoutProps } from "@/types";
import NavSideBar from "./_components/NavSideBar";
import { useLoadDocsMetadatas } from "@/db/docs/read";
import { useUser } from "@/db/user";
import DeleteModal from "./_components/modals/DeleteModal";
import ModalContext, { useInitModalContext } from "./_components/modals/ModalContext";
import SearchModal from "./_components/modals/SearchModal/index";
import AlertProvider from "@/components/AlertProvider";

export default function AppLayout({ children }: LayoutProps) {
    useUser();
    useLoadDocsMetadatas();

    const [modals, setModals] = useInitModalContext();

    return (
        <ModalContext.Provider value={setModals}>
            <AlertProvider>
                <HorizontalLayout screenWidth>
                    <NavSideBar />
                    {children}
                    { modals.deleteModal && <DeleteModal /> }
                    { modals.searchModal && <SearchModal /> }
                </HorizontalLayout>
            </AlertProvider>
        </ModalContext.Provider>
    )
}