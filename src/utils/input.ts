// utilities for handling input

import { ChangeEvent, useEffect } from "react";
import { UserDataType, getPathDocID } from "./store";
import { usePathname } from "next/navigation";

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

export function useCurrentTitle(userData: UserDataType | undefined, setCurrTitle: (title: string) => void) {
    const path = usePathname();

    useEffect(() => {
        const currDocID = getPathDocID(path);

        if (userData?.documents && currDocID) {
            userData.documents.forEach(({ id, title }) => {
                if (id === currDocID) setCurrTitle(title);
            });
        }
    }, [userData, path]);
}