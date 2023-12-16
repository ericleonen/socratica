import { useDocTitle } from "@/db/docs";
import { segmentTextIntoSentences } from "@/utils/format";
import { createSelector } from "@reduxjs/toolkit";
import { forwardRef } from "react"
import { useSelector } from "react-redux";
import "./styles.css";
import { RootState } from "@/store";
import { Question } from "@/db/schemas";

const selectSentences = createSelector((state) => state.doc.text, (text) => {
    return segmentTextIntoSentences(text as string).filter(value => value.trim() !== "")
})

const Worksheet = forwardRef((props: any, ref: any) => {
    const title = useDocTitle()[0];
    const sentences = useSelector(selectSentences);
    const questions = useSelector<RootState, Question[]>(
        state => state.doc.questions
    );

    type ParagraphMap = {
        [sentence: number]: number
    };

    const paragraphStarts: ParagraphMap = {};

    questions.forEach(({ contextInterval }, index: number) => {
        paragraphStarts[contextInterval[0]] = index + 1;
    });

    return (
        <div ref={ref} className="">
            <h1 className="font-bold text-4xl">{title} <span className="text-slate-400">Reading</span></h1>
            <div className="mt-8">{
                sentences.map((sentence, i) => <>
                    {
                        paragraphStarts.hasOwnProperty(i) &&
                        <mark className="font-bold mr-1 rounded-md bg-yellow-200">({paragraphStarts[i]})</mark>
                    }
                    {
                        sentence === "\n" ? (
                            <div key={`sentence_${i}`} className="opacity-0 select-none">&nbsp; </div>
                        ) : sentence.includes("\n") ? (
                            sentence.split("\n").map((part, j) =>
                                part.trim().length === 0 ? 
                                <div key={`sentence_${i}_${j}`} /> : 
                                <span key={`sentence_${i}_${j}`}>{part}</span>
                            )
                        ) : <span key={`sentence_${i}`}>{sentence}</span>
                    }
                </>)
            }</div>
            <div className="page-break"/>
            <h1 className="font-bold text-4xl">{title} <span className="text-slate-400">Questions</span></h1>
            <div className="mt-8">{
                questions.map(({ question }, i: number) => <div className="flex mt-14">
                    <span className="mr-2 font-bold">{i + 1}.</span><p className="">{question}</p>
                </div>)
            }</div>
        </div>
    )
})

export default Worksheet;