"use client"

import DocumentHeader from "./_components/DocumentHeader";
import Document from "./_components/Document";
import { useDoc } from "@/db/docs";
import Questions from "./_components/Questions";

export default function DocPage() {
    useDoc();

    return (
        <div className="flex flex-col w-full h-screen">
            <DocumentHeader />
            <div className="flex-grow flex overflow-hidden">
                <Document />
                <Questions />
            </div>
        </div>
    );
}