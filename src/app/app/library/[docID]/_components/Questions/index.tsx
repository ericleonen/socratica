"use client"

import { useContext, useEffect, useState } from "react";
import PanelResizer from "./PanelResizer";
import QuestionsNavigation from "./QuestionsNavigation";
import GenerateQuestions from "./GenerateQuestions";
import { useDocLoadingStatus, useHasQuestions, useNumQuestions, useQuestionsGeneratingStatus, useQuestionsSavingStatus } from "@/db/docs/read";
import { WidthStateContext } from "./DimensionsContext";
import QuestionSlider from "./QuestionSlider";
import SkeletonList from "@/components/SkeletonList";
import Skeleton from "@/components/Skeleton";
import { useAppDispatch } from "@/store";
import { useSaveQuestions, useSaveText } from "@/db/docs/update";
import { questionsActions } from "@/store/questionsSlice";
import { AlertContext } from "@/components/AlertProvider";

export default function Questions() {
    const [width, setWidth] = useState(384);

    const status = useDocLoadingStatus();
    const hasQuestions = useHasQuestions();
    const generatingStatus = useQuestionsGeneratingStatus();
    const deleting = useQuestionsSavingStatus() === "deleting";

    const dispatch = useAppDispatch();
    const saveQuestions = useSaveQuestions();
    const saveText = useSaveText();
    const setAlert = useContext(AlertContext);

    useEffect(() => {
        if (generatingStatus === "succeeded") {
            (async () => {
                await saveText();
                await saveQuestions();

                setAlert("success", "Questions generated")

                dispatch(questionsActions.setGeneratingStatus("idle"));
            })();
        }
    }, [generatingStatus]);

    useEffect(() => {
        if (deleting) {
            saveQuestions();

            setAlert("deletion", "Question deleted")
        }
    }, [deleting]);

    return (
        <WidthStateContext.Provider value={{ width, setWidth }}>
            <PanelResizer />
            <div 
                style={{ width: `${width}px` }}
                className="h-full flex flex-col overflow-y-scroll overflow-x-hidden shrink-0"
            >{
                status !== "succeeded" ? (
                    <div className="flex flex-col w-full p-3 items-center">
                        <Skeleton className="h-6 my-3 w-1/2"></Skeleton>
                        <SkeletonList 
                            count={3}
                            className="h-32 w-full mb-3"
                        />
                    </div>
                ) : hasQuestions ? (
                    <div className="flex-grow">
                        <QuestionsNavigation />
                        <QuestionSlider />
                    </div>
                ) : (
                    <GenerateQuestions />
                )
            }
            </div>
        </WidthStateContext.Provider>
    )
}