import { useSelector } from "react-redux";
import GenerateQuestions from "./GenerateQuestions";
import Question from "./Question";
import { RootState, useAppDispatch } from "@/store";
import { useGenerateQuestions } from "@/db/docs";
import { ResourceStatus } from "@/store/types";
import { LayoutProps } from "@/types";
import Skeleton from "@/components/Skeleton";
import { Fragment, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { HyperFocusedContext } from "./HyperFocusedContext";

const Container = ({ children }: LayoutProps) => <div className="rounded-lg border-2 border-slate-400 bg-stone-100 h-full px-10 py-16 overflow-y-scroll w-[30rem]">{children}</div>

export default function Questions() {
    const status = useSelector<RootState, ResourceStatus>(
        state => state.doc.status
    );
    const numQuestions = useSelector<RootState, number>(
        state => state.doc.questions.length
    );
    const questionsStatus = useSelector<RootState, ResourceStatus>(
        state => state.doc.questionsStatus
    );
    const generateQuestions = useGenerateQuestions();
    const dispatch = useAppDispatch();

    const hyperFocusedState = useState(false);

    return status === "succeeded" ? (
        <Container>
            <HyperFocusedContext.Provider value={hyperFocusedState}>{
                numQuestions > 0 ? 
                <>{
                    Array.from(Array(numQuestions)).map((_, i) =>
                    <Question 
                        index={i}
                        key={`question_${i}`}
                    />
                    )
                }{
                    questionsStatus === "loading" &&
                    <div className="flex text-slate-400 items-center w-full justify-center"><ArrowPathIcon className="animate-spin h-4 w-4 mr-2"/> Generating more questions</div>
                }</> : (
                    <GenerateQuestions onClick={generateQuestions}/>
                )
            }</HyperFocusedContext.Provider>
        </Container>
    ) : (
        <Container>{
            Array.from(Array(3)).map((_, i) => <Fragment key={`question_loading_${i}`}>
                <Skeleton className="w-full py-2 mt-2">Question loading...</Skeleton>
                <Skeleton className="w-full mt-5 mb-[3.75rem]">Answer loading...</Skeleton>
            </Fragment>)
        }</Container>
    )
}