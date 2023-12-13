import Skeleton from "@/components/Skeleton";
import { RootState } from "@/store";
import { ResourceStatus } from "@/store/types";
import { segmentTextIntoSentences } from "@/utils/format";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const selectHighlightInterval = createSelector(
    [
        (state) => state.doc.focusQuestion,
        (state) => state.doc.questions
    ], (focus, questions) => {
        if (focus >= 0 && focus < questions.length) {
            return questions[focus].contextInterval
        } else {
            return [-1, -1];
        }
    }
);

const selectSentences = createSelector((state) => state.doc.text, (text) => {
    return segmentTextIntoSentences(text as string);
})

export default function TextDisplay() {
    const sentences = useSelector(selectSentences);
    const highlightInterval = useSelector(selectHighlightInterval);

    const highlight = (i: number) => {
        return (highlightInterval[0] <= i && i <= highlightInterval[1]) ? 
            `bg-yellow-200 transition-colors 
                ${i === highlightInterval[0] && "rounded-l-full"} 
                ${i === highlightInterval[1] && "rounded-r-full"}` 
            : 
            `bg-transparent transition-colors`;
    }

    const status = useSelector<RootState, ResourceStatus>(
        state => state.doc.status
    );

    return status === "succeeded" ? (
        <div className="mt-6 w-full bg-transparent text-theme-black">{
            sentences.map((sentence, i) => {
                if (sentence == "\n") {
                    return <div key={`sentence_${i}`} className="opacity-0 select-none">&nbsp; </div>
                }
                else if (sentence.includes("\n")) {
                    return sentence.split("\n").map((part, j) =>
                        part.trim().length === 0 ? 
                        <div key={`sentence_${i}_${j}`} /> : 
                        <mark className={highlight(i)} key={`sentence_${i}_${j}`}>{part}</mark>
                    );
                } else {
                    return <mark className={highlight(i)} key={`sentence_${i}`}>{sentence}</mark>
                }
            })
        }</div>
    ) : (
        <Skeleton className="mt-6 w-full">Loading...</Skeleton>
    )
}