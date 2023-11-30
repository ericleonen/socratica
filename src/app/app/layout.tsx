"use client"

import HorizontalLayout from "@/components/HorizontalLayout";
import { LayoutType } from "@/types";
import NavSideBar from "./_components/NavSideBar";
import { useState } from "react";
import UserDataContext, {nullUserData } from "./_components/UserDataContext";
import CurrTitleContext from "./_components/CurrTitleContext";
import { useAutoSaveDocument, useLoadDocument, useUserData } from "@/utils/store";
import { useCurrentTitle } from "@/utils/input";
import CurrDocContext from "./_components/CurrDocContext";

export default function AppLayout({ children }: LayoutType) {
    const userData = useUserData();
    const [currTitle, setCurrTitle] = useState("");
    const [[text, setText], [questions, setQuestions]] = useLoadDocument();

    const documents = userData ? userData.documents : null;

    useAutoSaveDocument(text, questions, currTitle, documents);
    useCurrentTitle(userData, setCurrTitle);

    return (
        <HorizontalLayout screenWidth>
            <CurrDocContext.Provider value={[[text, setText], [questions, setQuestions]]}>
                <UserDataContext.Provider value={userData ? userData : nullUserData}>
                    <CurrTitleContext.Provider value={{currTitle, setCurrTitle}}>
                        <NavSideBar />
                        {children}
                    </CurrTitleContext.Provider>
                </UserDataContext.Provider>
            </CurrDocContext.Provider>
        </HorizontalLayout>
    )
}