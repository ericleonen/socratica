import { handleChange, useAutoSizeTextArea } from "@/utils/input";
import { useRef, useState } from "react";

type TextFieldProps = {
    text: string,
    setText: (text: string) => void
}

export default function TextField({ text, setText }: TextFieldProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useAutoSizeTextArea(textareaRef.current, text);

    return (
        <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange(setText)}
            placeholder="Paste some interesting text here..."
            className="mt-6 w-full resize-none bg-transparent focus:outline-none text-theme-black"
        />
    )
}