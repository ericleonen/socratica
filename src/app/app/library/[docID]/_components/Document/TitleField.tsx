"use client"

import Skeleton from "@/components/Skeleton";
import { useAutoSaveDoc, useDocTitle } from "@/db/docs";
import { RootState } from "@/store";
import { ResourceStatus } from "@/store/types";
import { handleChange, useAutoSizeTextArea } from "@/utils/input";
import { KeyboardEvent, useRef } from "react"
import { useSelector } from "react-redux";

export default function TitleField() {
    const [title, setTitle] = useDocTitle();
    const status = useSelector<RootState, ResourceStatus>(
        state => state.docsMetadatas.status
    );

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useAutoSizeTextArea(textareaRef.current, title);

    const preventEnter = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    }

    const saveDoc = useAutoSaveDoc(title);

    return status === "succeeded" ? (
        <textarea
            ref={textareaRef}
            value={title}
            onChange={(e) => {
                handleChange(setTitle)(e);
                saveDoc();
            }}
            onKeyDown={preventEnter}
            placeholder="Untitled"
            className={`${!title && "h-[42px]"} scrollbar-hide placeholder:text-slate-400/90 w-full resize-none text-4xl bg-transparent focus:outline-none font-bold text-theme-black`}
        />
    ) : (
        <Skeleton className="w-full text-4xl h-[42px]">Title</Skeleton>
    )
}