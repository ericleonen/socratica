"use client"

import DocumentHeader from "./_components/DocumentHeader";
import Document from "./_components/Document";
import { useLoadDoc } from "@/db/docs/read";
import Questions from "./_components/Questions";

export default function DocPage() {
    useLoadDoc();

    return (
        <div className="transition-all duration-75 flex flex-col w-full h-full bg-white">
            <DocumentHeader />
            <div className="flex-grow flex overflow-hidden">
                <Document />
                <Questions />
            </div>
        </div>
    );
}