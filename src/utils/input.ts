import { ChangeEvent, useEffect } from "react";

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

export function useAutoSizeTextArea(textAreaRef: HTMLTextAreaElement | null, value: string) {
    useEffect(() => {
        if (textAreaRef) {
            textAreaRef.style.height = "0px";
            textAreaRef.style.height = `${textAreaRef.scrollHeight}px`;
        }
    }, [textAreaRef, value]);
}