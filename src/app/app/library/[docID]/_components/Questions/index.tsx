"use client"

import { useState } from "react";
import PanelResizer from "./PanelResizer";
import QuestionsNavigation from "./QuestionsNavigation";
import GenerateQuestions from "./GenerateQuestions";
import { useDocLoadingStatus, useHasQuestions } from "@/db/docs/read";
import { WidthStateContext } from "./DimensionsContext";
import QuestionSlider from "./QuestionSlider";
import SkeletonList from "@/components/SkeletonList";
import Skeleton from "@/components/Skeleton";

export default function Questions() {
    const [width, setWidth] = useState(384);

    const status = useDocLoadingStatus();
    const hasQuestions = useHasQuestions();

    return (
        <WidthStateContext.Provider value={{ width, setWidth }}>
            <PanelResizer />
            <div 
                style={{ width: `${width}px` }}
                className="h-full border-slate-400 border-l-2 flex flex-col overflow-y-scroll overflow-x-hidden"
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