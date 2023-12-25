"use client"

import { useState } from "react";
import PanelResizer from "./PanelResizer";
import QuestionsNavigation from "./QuestionsNavigation";
import GenerateQuestions from "./GenerateQuestions";
import { useDocLoadingStatus, useHasQuestions } from "@/db/docs/read";
import { HeightStateContext, WidthStateContext } from "./DimensionsContext";
import QuestionSlider from "./QuestionSlider";
import SkeletonList from "@/components/SkeletonList";
import Skeleton from "@/components/Skeleton";

export default function Questions() {
    const [width, setWidth] = useState(384);
    const [height, setHeight] = useState<number>(0);

    const status = useDocLoadingStatus();
    const hasQuestions = useHasQuestions();

    return (
        <WidthStateContext.Provider value={{ width, setWidth }}>
            <HeightStateContext.Provider value={{ height, setHeight }}>
                <PanelResizer />
                <div 
                    style={{ width: `${width}px` }}
                    className="h-full border-slate-700 border-l-2 flex flex-col overflow-y-scroll overflow-x-hidden"
                >{
                    status !== "succeeded" ? (
                        <div className="h-full flex flex-col w-full p-3">
                            <Skeleton className="h-16"/>
                            <SkeletonList 
                                count={3}
                                className="mt-8 h-20"
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
            </HeightStateContext.Provider>
        </WidthStateContext.Provider>
    )
}