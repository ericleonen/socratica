"use client"

import CurrTitleContext from "@/app/app/_components/CurrTitleContext";
import { handleChange, useAutoSizeTextArea } from "@/utils/input";
import { KeyboardEvent, useContext, useRef, useState } from "react"

export default function TitleField() {
    const { currTitle, setCurrTitle } = useContext(CurrTitleContext);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useAutoSizeTextArea(textareaRef.current, currTitle);

    const preventEnter = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    }

    return (
        <textarea
            ref={textareaRef}
            value={currTitle}
            onChange={handleChange(setCurrTitle)}
            onKeyDown={preventEnter}
            placeholder="Untitled"
            className="h-[42px] w-full resize-none text-4xl bg-transparent focus:outline-none font-bold text-theme-black"
        />
    )
}