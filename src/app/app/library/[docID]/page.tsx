"use client"

import DocumentHeader from "./_components/DocumentHeader";
import Document from "./_components/Document";
import { useDoc } from "@/db/docs";
import Questions from "./_components/Questions";

export default function DocPage() {
    useDoc();

    return (<>
        <DocumentHeader />
        <div className="flex flex-grow w-full px-20">
            <Document />
            <Questions />
        </div>
    </>);
}