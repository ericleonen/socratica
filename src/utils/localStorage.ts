import { useEffect, useState } from "react";

function parse<T>(value: string, isString: boolean) {
    if (isString)
        return value.substring(1, value.length - 1) as T;
    else
        return JSON.parse(value) as T;
}

export function useLocalStorage<T>(key: string, initialValue: T): [
    T, (newValue: T) => void
] {
    const isString = typeof initialValue === "string";

    if (key in localStorage) {
        initialValue = parse<T>(localStorage[key], isString);
    } else {
        localStorage[key] = JSON.stringify(initialValue);
    }
    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        const updateValue = () => {
            setValue(parse<T>(localStorage[key], isString));
        };

        document.addEventListener(`localStorage_${key}`, updateValue);

        return () => document.removeEventListener(`localStorage_${key}`, updateValue);
    }, [key]);

    return [
        value,
        (newValue: T) => {
            localStorage[key] = JSON.stringify(newValue);
            document.dispatchEvent(new Event(`localStorage_${key}`));
        }
    ]
}