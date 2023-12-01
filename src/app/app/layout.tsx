"use client"

import HorizontalLayout from "@/components/HorizontalLayout";
import { LayoutType } from "@/types";
import NavSideBar from "./_components/NavSideBar";
import { useState } from "react";
import UserDataContext, {nullUserData } from "./_components/UserDataContext";
import CurrTitleContext from "./_components/CurrTitleContext";
import { getPathDocID, saveDocument, useAutoSaveDocument, useLoadDocument, useUserData } from "@/utils/store";
import { useCurrentTitle } from "@/utils/input";
import CurrDocContext from "./_components/CurrDocContext";
import SaveDocContext from "./_components/SaveDocContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: LayoutType) {
    const userData = useUserData();
    const [currTitle, setCurrTitle] = useState("");
    const [[text, setText], [questions, setQuestions]] = useLoadDocument();
    const authUser = useAuthState(auth)[0];

    const documents = userData ? userData.documents : null;
    const docID = getPathDocID(usePathname());
    
    useAutoSaveDocument(text, questions, currTitle, documents);
    useCurrentTitle(userData, setCurrTitle);

    const forceSaveDocument = () => {
        saveDocument(
            authUser?.uid, 
            text, 
            questions, 
            currTitle, 
            documents, 
            docID
        ).then(success => {
            if (success) console.log("Force save suceeded");
            else console.log("Force save failed");
        })
    }

    return (
        <HorizontalLayout screenWidth>
            <CurrDocContext.Provider value={[[text, setText], [questions, setQuestions]]}>
                <UserDataContext.Provider value={userData ? userData : nullUserData}>
                    <CurrTitleContext.Provider value={{currTitle, setCurrTitle}}>
                        <SaveDocContext.Provider value={forceSaveDocument}>
                            <NavSideBar />
                        </SaveDocContext.Provider>
                        {children}
                    </CurrTitleContext.Provider>
                </UserDataContext.Provider>
            </CurrDocContext.Provider>
        </HorizontalLayout>
    )
}