"use client"

import HorizontalLayout from "@/components/HorizontalLayout";
import { LayoutType } from "@/types";
import NavSideBar from "./_components/NavSideBar";
import { useEffect, useState } from "react";
import UserDataContext, { CurrTitleContext, nullUserData } from "./_components/UserDataContext";
import { useUserData } from "@/utils/store";
import { usePathname } from "next/navigation";
import { useCurrentTitle } from "@/utils/input";

export default function AppLayout({ children }: LayoutType) {
    const userData = useUserData();
    const [currTitle, setCurrTitle] = useState("");
    const path = usePathname();

    useCurrentTitle(userData, setCurrTitle);

    return (
        <HorizontalLayout screenWidth>
            <UserDataContext.Provider value={userData ? userData : nullUserData}>
                <CurrTitleContext.Provider value={{currTitle, setCurrTitle}}>
                    <NavSideBar />
                    {children}
                </CurrTitleContext.Provider>
            </UserDataContext.Provider>
        </HorizontalLayout>
    )
}