import { useSelector } from "react-redux";
import { usePathDocID } from "./routing";
import { RootState } from "@/store";
import { Timestamp } from "firebase/firestore";
import { Paragraph } from "@/types";
import { matrix, multiply, transpose, Matrix, zeros, index, dotDivide, add, map, exp } from "mathjs";
import { linspace } from "./math";

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
    const docID = usePathDocID() as string;
    const lastSaved = useSelector<RootState, Timestamp>(
        state => state.docsMetadatas.map[docID]?.lastSaved
    );
    
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
    } else {
        return "";
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

/**
 * Converts a body of text into sentences
 * @param text string to split into sentences
 * @param locale optional string denoting the text's language (default english)
 * @returns a string array of sentences
 */
export function segmentTextIntoSentences(text: string, locale: string = "en") {
    const segmenter = new Intl.Segmenter(locale, { granularity: "sentence" });
    const sentences = Array.from(segmenter.segment(text)).map(({ segment }) => segment);

    return sentences;
}

/**
 * Creates a similarity matrix of sentences
 * @param sentences a string array of sentences
 * @returns a similarity matrix of sentences
 */
export async function generateSentenceSimilarities(model: any, sentences: string[]) {
    const embeddings = (await model(sentences, {
        pooling: "mean",
        normalize: true
    })).tolist();

    const m = matrix(embeddings);
    const similarities = multiply(m , transpose(m));

    return similarities;
}

/**
 * Generates a list of paragraphs
 * @param sentences a string array of sentences
 * @param similarities a similarity matrix
 * @returns an array of Paragraphs where each content is at least MIN_PARAGRAPH_LENGTH 
 *          (if possible)
 */
export function generateParagraphs(sentences: string[], similarities: Matrix, MIN_PARAGRAPH_LENGTH: number) {
    const x = matrix(zeros(similarities.size()));
    const N = sentences.length;

    for (let i = 0; i < N - 1; i++) {
        const replacement = similarities.subset(index(i, [i + 1, N - 1]));
        x.subset(index(i, [0, N - 2 - i]), replacement)
    }

    const weights = dotDivide(1, add(1, map(linspace(-10, 10, N), exp)) as Matrix);
    const weightedSimilarities = multiply(x, transpose(weights));
    const babyParagraphs: Paragraph[] = [];
    let currStart = 0;

    for (let i = 1; i < N - 1; i++) {
        const left = weightedSimilarities.get([i - 1]);
        const curr = weightedSimilarities.get([i]);
        const right = weightedSimilarities.get([i + 1]);

        if (curr < Math.min(left, right)) {

            babyParagraphs.push({ 
                start: currStart,
                end: i, 
                content: sentences.slice(currStart, i + 1).join("")
            });

            currStart = i + 1;
        }
    }

    if (currStart <= N - 1) {
        babyParagraphs.push({
            start: currStart,
            end: N - 1,
            content: sentences.slice(currStart, N).join("")
        });
    }

    const paragraphs: Paragraph[] = [];

    for (let i = 0; i < babyParagraphs.length; i++) {
        if (babyParagraphs[i].content.length < MIN_PARAGRAPH_LENGTH) {
            let content = babyParagraphs[i].content;
            let start = babyParagraphs[i].start;
            let end = babyParagraphs[i].end;

            const leftSimilarity = start > 0 ? similarities.get([start, start - 1]) : null;
            const rightSimilarity = end < N - 1 ? similarities.get([end, end + 1]) : null;
            
            if (i === 0 || (end < N - 1 && rightSimilarity > leftSimilarity)) {
                // merge continuously right
                while (i < babyParagraphs.length - 1 && content.length < MIN_PARAGRAPH_LENGTH) {
                    i++;
                    content += babyParagraphs[i].content;
                    end = babyParagraphs[i].end;
                }

                paragraphs.push({
                    start,
                    end,
                    content
                });
            } else {
                // merge with previous paragraph (if there is one)
                paragraphs[paragraphs.length - 1].content += content;
                paragraphs[paragraphs.length - 1].end = end;
            }
        } else {
            paragraphs.push(babyParagraphs[i]);
        }
    }

    return paragraphs;
}