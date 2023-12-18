"use client"

import DocumentHeader from "./_components/DocumentHeader";
import Document from "./_components/Document";
import { useDoc } from "@/db/docs";
import Questions from "./_components/Questions/index_";

export default function DocPage() {
    useDoc();

    return (
        <div className="flex flex-col w-full h-full bg-yellow-50">
            <DocumentHeader />
            <div className="flex-grow flex overflow-hidden">
                <Document />
                <Questions />
            </div>
        </div>
    );
}