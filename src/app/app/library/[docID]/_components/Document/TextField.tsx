import Skeleton from "@/components/Skeleton";
import { useAutoSaveDoc, useDocText } from "@/db/docs";
import { RootState } from "@/store";
import { ResourceStatus } from "@/store/types";
import { handleChange, useAutoSizeTextArea } from "@/utils/input";
import { useRef } from "react";
import { useSelector } from "react-redux";

export default function TextField() {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useDocText();
    const status = useSelector<RootState, ResourceStatus>(
        state => state.doc.status
    );

    useAutoSizeTextArea(textareaRef.current, text);

    const saveDoc = useAutoSaveDoc(text);

    return status === "succeeded" ? (
        <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => {
                handleChange(setText)(e);
                saveDoc();
            }}
            placeholder="Paste some interesting text here..."
            className="placeholder:text-slate-400/90 mt-6 w-full resize-none bg-transparent focus:outline-none text-slate-700"
        />
    ) : (
        <Skeleton className="mt-6 w-full">Loading...</Skeleton>
    )
}