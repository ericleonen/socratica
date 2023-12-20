"use client"

import DocumentHeader from "./_components/DocumentHeader";
import Document from "./_components/Document";
import { useDoc } from "@/db/docs/read";
import Questions from "./_components/Questions";

export default function DocPage() {
    useDoc();

    return (
        <div className="transition-all duration-75 flex flex-col w-full h-full bg-yellow-50">
            <DocumentHeader />
            <div className="flex-grow flex overflow-hidden">
                <Document />
                <Questions />
            </div>
        </div>
    );
}