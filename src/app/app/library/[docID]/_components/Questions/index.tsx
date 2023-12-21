"use client"

import { useEffect, useState } from "react";
import PanelResizer from "./PanelResizer";
import QuestionsNavigation from "./QuestionsNavigation";
import GenerateQuestions from "./GenerateQuestions";
import { useDocLoadingStatus, useQuestions, useQuestionsGeneratingStatus } from "@/db/docs/read";
import { useEditableFocusSection, useSaveQuestions, useSaveText } from "@/db/docs/update";
import { useAppDispatch } from "@/store";
import Question from "./Question";
import { questionsActions } from "@/store/questionsSlice";

export default function Questions() {
    const [width, setWidth] = useState(384); // in px
    const [height, setHeight] = useState<number | null>(null);
    const [section, setSection] = useEditableFocusSection();
    const status = useDocLoadingStatus();
    const questions = useQuestions();
    const questionsStatus = useQuestionsGeneratingStatus();

    const dispatch = useAppDispatch();
    const saveQuestions = useSaveQuestions();
    const saveText = useSaveText();

    useEffect(() => {
        if (questionsStatus === "succeeded") {
            saveQuestions();
            saveText();
            dispatch(questionsActions.setGeneratingStatus("idle"));
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
                            marginLeft: `-${width * section}px`,
                            height: height ? `${height}px` : "auto"
                        }}
                        className="shrink-0 flex overflow-hidden transition-all"
                    >
                        {
                            questions.map((_, sectionIndex) =>
                                <div 
                                    key={`questionSection_${sectionIndex}`}
                                    style={{ width: `${width}px` }}
                                    className="px-4 shrink-0 relative"
                                >{
                                    questions[sectionIndex].map((_, questionIndex) =>
                                        <Question 
                                            key={`question_${sectionIndex}_${questionIndex}`}
                                            {...{sectionIndex, questionIndex}}
                                            setHeight={
                                                sectionIndex === section && 
                                                questionIndex === questions[sectionIndex].length - 1 ?
                                                setHeight : undefined
                                            }
                                        />
                                    )
                                }</div>
                            )
                        }
                    </div>
                </>
            }</> : <>
            
            </>
        }
        </div>
    </>)
}