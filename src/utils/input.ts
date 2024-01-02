import { useText } from "@/db/docs/read";
import { RootState } from "@/store";
import { Trigger } from "@/types";
import { ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";

export function handleChange(
    setValue: (value: any) => void,
    callback?: Trigger
) {
    return (event: ChangeEvent) => {
        if (
            event.target instanceof HTMLTextAreaElement || 
            event.target instanceof HTMLInputElement
        ) {
            const val = event.target.value;
            setValue(val);

            if (callback) callback();
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

export function useKeyDown(callback: Trigger, key: string) {
    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === key) {
            event.preventDefault();
            callback();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        }
    }, [onKeyDown]);
}