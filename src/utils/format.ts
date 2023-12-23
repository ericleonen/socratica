import { useDocsMetadatas, useLastSaved } from "@/db/docs/read";
import { usePathDocID } from "./routing";
import { Timestamp } from "firebase/firestore";

/**
 * Converts a seconds number to a date
 * @param seconds 
 * @returns a Date object
 */
function secondsToDate (seconds: number) {
    return new Date(seconds * 1000);
}

/**
 * Checks if two dates are on the same day
 * @param date1 
 * @param date2 
 * @returns a boolean
 */
function isSameDay(date1: Date, date2: Date) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
}

const MONTHS = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October",
    "November",
    "December"
];

/**
 * Hook that provides a formatted description of how long ago a doc was saved
 * @returns a string that gives a relative date
 */
export function useFormattedLastSaved() {
    const lastSaved = useLastSaved();
    
    if (lastSaved) {
        const lastSavedDate = secondsToDate(lastSaved.seconds);
        const nowDate = new Date();

        if (isSameDay(lastSavedDate, nowDate)) {
            const secondsDiff = (nowDate.getTime() - lastSavedDate.getTime()) / 1000;

            if (secondsDiff < 60) {
                return "Saved just now";
            } else if (secondsDiff < 3600) {
                const minutesDiff = Math.floor(secondsDiff / 60);
                return `Last saved ${minutesDiff} minute${minutesDiff === 1 ? "" : "s"} ago`;
            } else {
                const hoursDiff = Math.floor(secondsDiff / 3600);
                return `Last saved ${hoursDiff} hour${hoursDiff === 1 ? "" : "s"} ago`;
            }
        } else {
            const month = MONTHS[lastSavedDate.getMonth()];
            const day = lastSavedDate.getDate();
            const year = lastSavedDate.getFullYear();

            if (year === nowDate.getFullYear()) {
                return `Last saved ${month} ${day}`
            } else {
                return `Last saved ${month} ${day}, ${year}`;
            }
        }
    }
}

/**
 * Converts a Timestamp to an absolute date
 * @param timestamp 
 * @returns the formatted version of the given date
 */
export function formatAbsoluteDate(timestamp: Timestamp) {
    const date = secondsToDate(timestamp.seconds);
    const now = new Date();

    if (isSameDay(date, now)) {
        const hours = date.getHours();
        let minutes = `${date.getMinutes()}`;
        minutes = minutes.length === 1 ? `0${minutes}` : minutes;

        if (hours > 12) {
            return `${hours - 12}:${minutes} PM`;
        } else {
            return `${hours}:${minutes} AM`;
        }
    } else {
        const month = MONTHS[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        if (year === now.getFullYear()) {
            return `${month} ${day}`;
        } else {
            return `${month} ${day}, ${year}`;
        }
    }
}

export function sentencify(text: string, locale: string = "en"): string[] {
    const segmenter = new Intl.Segmenter(locale, { granularity: "sentence" });
    const sentences = Array.from(
        segmenter.segment(text)).map(({ segment }) => segment
    );

    return sentences;
}

export function overwriteClasses(className: string | undefined) {
    return className ? className.split(" ").map(x => `!${x}`).join(" ") : "";
}