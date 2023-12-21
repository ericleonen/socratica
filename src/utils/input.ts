import { useText } from "@/db/docs/read";
import { RootState } from "@/store";
import { ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";

export function handleChange(setValue: (value: any) => void, parseAsInt: boolean = false) {
    return (event: ChangeEvent) => {
        if (
            event.target instanceof HTMLTextAreaElement || 
            event.target instanceof HTMLInputElement
        ) {
            const val = event.target.value;

            if (parseAsInt) {
                setValue(parseInt(val));
            } else {
                setValue(val)
            }
        }
    };
}

export function autoResize(textarea: HTMLTextAreaElement | null) {
    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = `${textarea.scrollHeight}px`;
}

export function useCopyText() {
    const text = useText().join("");

    return () => {
        navigator.clipboard.writeText(text);
    }
}