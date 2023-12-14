import { useSelector } from "react-redux";
import GenerateQuestions from "./GenerateQuestions";
import Question from "./Question";
import { RootState, useAppDispatch } from "@/store";
import { Question as QuestionType } from "@/db/schemas";
import { useGenerateQuestions } from "@/db/docs";
import { ResourceStatus } from "@/store/types";
import { LayoutType } from "@/types";
import Skeleton from "@/components/Skeleton";
import { Fragment, useState } from "react";
import { blurQuestionFocus, focusOnQuestion, updateQuestionAnswer } from "@/store/docSlice";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const Container = ({ children }: LayoutType) => <div className="flex-grow h-full px-10 shadow-2xl w-min py-16 overflow-y-scroll">{children}</div>

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

    const [hyperFocused, setHyperFocused] = useState(false);
    const hyperFocus = (i: number) => () => {
        dispatch(focusOnQuestion(i));
        setHyperFocused(true);
    }
    const hyperBlur = () => {
        dispatch(blurQuestionFocus());
        setHyperFocused(false);
    }
    const focus = (i: number) => () => {
        if (hyperFocused) return;
        dispatch(focusOnQuestion(i));
    };
    const blur = () => {
        if (hyperFocused) return;
        dispatch(blurQuestionFocus());
    };

    const handleAnswerChange = (i: number) => (answer: string) => {
        dispatch(updateQuestionAnswer({
            answer,
            index: i
        }));
    }

    return status === "succeeded" ? (
        <Container>{
            numQuestions > 0 ? 
            <>{
                Array.from(Array(numQuestions)).map((_, i) =>
                <Question 
                    index={i}
                    key={`question_${i}`}
                    hyperFocus={hyperFocus(i)}
                    hyperBlur={hyperBlur}
                    focus={focus(i)}
                    blur={blur}
                    setAnswer={handleAnswerChange(i)}
                />
                )
            }{
                questionsStatus === "loading" &&
                <div className="flex text-slate-400 items-center w-full justify-center"><ArrowPathIcon className="animate-spin h-4 w-4 mr-2"/> Generating more questions</div>
            }</> : (
                <GenerateQuestions onClick={generateQuestions}/>
            )
        }</Container>
    ) : (
        <Container>{
            Array.from(Array(3)).map((_, i) => <Fragment key={`question_loading_${i}`}>
                <Skeleton className="w-full py-2 mt-2">Question loading...</Skeleton>
                <Skeleton className="w-full mt-5 mb-[3.75rem]">Answer loading...</Skeleton>
            </Fragment>)
        }</Container>
    )
}