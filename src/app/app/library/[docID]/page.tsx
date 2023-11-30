"use client"

import DocumentHeader from "./_components/DocumentHeader";
import Document from "./_components/Document";
import { useAutoSaveDocument, useLoadDocument } from "@/utils/store";
import { useContext } from "react";
import UserDataContext, { CurrTitleContext } from "../../_components/UserDataContext";

export default function DocPage() {
    const { currTitle, setCurrTitle } = useContext(CurrTitleContext);
    const { documents } = useContext(UserDataContext);
    const {text, setText, questions, setQuestions} = useLoadDocument();

    useAutoSaveDocument({ text, questions }, currTitle, documents);

    return (<>
        <DocumentHeader />
        <div className="flex flex-grow w-full px-20">
            <Document {...{text, setText}} />
        </div>
    </>);
}