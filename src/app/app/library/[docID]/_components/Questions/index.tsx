"use client"

import { useEffect, useState } from "react";
import PanelResizer from "./PanelResizer";
import QuestionsNavigation from "./QuestionsNavigation";
import GenerateQuestions from "./GenerateQuestions";
import { useDocStatus, useQuestions, useQuestionsStatus } from "@/db/docs/read";
import { useEditableFocusSection, useSaveDoc } from "@/db/docs/update";
import { useAppDispatch } from "@/store";
import { updateQuestionsStatus } from "@/store/docSlice";
import Question from "./Question";

export default function Questions() {
    const [width, setWidth] = useState(384); // in px
    const [section, setSection] = useEditableFocusSection();
    const status = useDocStatus();
    const questions = useQuestions();
    const questionsStatus = useQuestionsStatus();

    const dispatch = useAppDispatch();
    const saveDoc = useSaveDoc();

    useEffect(() => {
        if (questionsStatus === "succeeded") {
            saveDoc();
            dispatch(updateQuestionsStatus("idle"));
        }
    }, [questionsStatus]);

    return (<>
        <PanelResizer setWidth={setWidth} />
        <div 
            style={{ width: `${width}px` }}
            className="h-full border-slate-700 border-l-2 flex flex-col overflow-y-scroll overflow-x-hidden"
        >{
            status === "succeeded" ? <>{
                questions.length === 0 ? <GenerateQuestions /> : <>
                    <QuestionsNavigation
                        numSections={questions.length}
                        {...{section, setSection}} 
                    />
                    <div 
                        style={{ 
                            width: `${width * questions.length}px`,
                            marginLeft: `-${width * section}px`
                        }}
                        className="shrink-0 flex overflow-hidden transition-all"
                    >{
                        questions.map((_, sectionIndex) =>
                            <div 
                                key={`questionSection_${sectionIndex}`}
                                style={{ width: `${width}px` }}
                                className="px-4 shrink-0"
                            >{
                                questions[sectionIndex].map((_, questionIndex) =>
                                    <Question 
                                        key={`question_${sectionIndex}_${questionIndex}`}
                                        section={sectionIndex}
                                        index={questionIndex}
                                    />
                                )
                            }</div>
                        )
                    }</div>
                </>
            }</> : <>
            
            </>
        }
        </div>
    </>)
}