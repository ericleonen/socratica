"use client"

import DocumentHeader from "./_components/DocumentHeader";
import Document from "./_components/Document";
import { useContext } from "react";
import CurrDocContext from "../../_components/CurrDocContext";

export default function DocPage() {
    const [[text, setText], [questions, setQuestions]] = useContext(CurrDocContext);

    return typeof text === "string" && (<>
        <DocumentHeader />
        <div className="flex flex-grow w-full px-20">
            <Document {...{text, setText}} />
        </div>
    </>);
}