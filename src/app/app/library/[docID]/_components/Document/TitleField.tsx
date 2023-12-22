"use client"

import Skeleton from "@/components/Skeleton";
import { useDocsMetadatasLoadingStatus } from "@/db/docs/read";
import { useAutoSaveTitle, useEditableTitle } from "@/db/docs/update";
import { autoResize, handleChange } from "@/utils/input";
import { KeyboardEvent } from "react"

export default function TitleField() {
    const [title, setTitle] = useEditableTitle();
    const status = useDocsMetadatasLoadingStatus();

    const preventEnter = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    }

    const allowSave = useAutoSaveTitle();

    return status === "succeeded" ? (
        <textarea
            ref={elem => autoResize(elem)}
            value={title}
            onChange={(e) => {
                handleChange(setTitle)(e);
                allowSave();
            }}
            onKeyDown={preventEnter}
            placeholder="Untitled"
            className={`overflow-hidden h-min placeholder:text-slate-700/70 w-full resize-none text-4xl bg-transparent focus:outline-none font-bold text-slate-700`}
        />
    ) : (
        <Skeleton className="text-4xl h-[42px]">Hey mama, I know I act the fool</Skeleton>
    )
}