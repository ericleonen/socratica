"use client"

import { useCreateDoc } from "@/db/docs/create";
import { useDocsMetadatas, useDocsMetadatasLoadingStatus } from "@/db/docs/read";
import Icon from "@/theme/Icon";
import { LoadingFour } from "@icon-park/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function AppPage() {
    const docsMetadatas = useDocsMetadatas();
    const status = useDocsMetadatasLoadingStatus();

    const createdDoc = useRef(false);
    const createDoc = useCreateDoc()[1];
    const router = useRouter();

    useEffect(() => {
        if (status !== "succeeded") return;

        if (Object.keys(docsMetadatas).length > 0) {
            const mostRecentDocID = Object.keys(docsMetadatas).reduce(
                (ID1: string, ID2: string) => {
                    if (docsMetadatas[ID1].lastSaved.seconds > docsMetadatas[ID2].lastSaved.seconds) {
                        return ID1;
                    } else {
                        return ID2;
                    }
                }
            );

            router.push(`/app/library/${mostRecentDocID}`);
        } else if (!createdDoc.current) {
            createDoc(
                "Welcome!",
                `Replace this text to get started or hit "Help" in the sidebar to learn how to use the app`
            );
            createdDoc.current = true;
        }
    }, [status]);

    return (
        <div className="flex items-center justify-center flex-grow h-full bg-white dark:bg-slate-800">
            <Icon type={LoadingFour} className="text-xl animate-spin text-slate-400 dark:text-slate-600" />
        </div>
    );
}