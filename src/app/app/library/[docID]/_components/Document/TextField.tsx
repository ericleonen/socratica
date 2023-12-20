import Skeleton from "@/components/Skeleton";
import { useDocStatus } from "@/db/docs/read";
import { useAutoSaveDoc, useEditableText } from "@/db/docs/update";
import { handleChange, useAutoSizeTextArea } from "@/utils/input";
import { useRef } from "react";

export default function TextField() {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useEditableText();
    const status = useDocStatus();

    useAutoSizeTextArea(textareaRef.current, text);

    const allowSave = useAutoSaveDoc(text);

    return status === "succeeded" ? (
        <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => {
                handleChange(setText)(e);
                allowSave();
            }}
            placeholder="Paste some interesting text here..."
            className="placeholder:text-slate-700/70 h-min mt-6 w-full resize-none bg-transparent focus:outline-none text-slate-700"
        />
    ) : (
        <Skeleton className="mt-6 w-full">Loading...</Skeleton>
    )
}