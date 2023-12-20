"use client"

import Skeleton from "@/components/Skeleton";
import { useDocsMetadatasStatus } from "@/db/docs/read";
import { useAutoSaveDoc, useEditableTitle } from "@/db/docs/update";
import { handleChange, useAutoSizeTextArea } from "@/utils/input";
import { KeyboardEvent, useRef } from "react"

export default function TitleField() {
    const [title, setTitle] = useEditableTitle();
    const status = useDocsMetadatasStatus();

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useAutoSizeTextArea(textareaRef.current, title);

    const preventEnter = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    }

    const allowSave = useAutoSaveDoc(title);

    return status === "succeeded" ? (
        <textarea
            ref={textareaRef}
            value={title}
            onChange={(e) => {
                handleChange(setTitle)(e);
                allowSave();
            }}
            onKeyDown={preventEnter}
            placeholder="Untitled"
            className={`overflow-hidden h-[42px] placeholder:text-slate-700/70 w-full resize-none text-4xl bg-transparent focus:outline-none font-bold text-slate-700`}
        />
    ) : (
        <Skeleton className="w-full text-4xl h-[42px]">Title</Skeleton>
    )
}