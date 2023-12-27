import QuestionField from "./QuestionField"
import AnswerField from "./AnswerField"
import { useEffect, useRef, } from "react"
import { useQuestionStatus } from "@/db/docs/read";
import AddQuestionButton from "../AddQuestionButton";
import { Transition } from "@headlessui/react";
import { useAppDispatch } from "@/store";
import { questionsActions } from "@/store/questionsSlice";

export type QuestionIDProp = { ID: string };

type QuestionProps = {
    ID: string,
    sectionIndex: number,
    questionIndex: number
}

export default function Question({ ID, sectionIndex, questionIndex }: QuestionProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const status = useQuestionStatus(ID);

    const dispatch = useAppDispatch();

    const makeReady = () => {
        if (status !== "generating") return;
        dispatch(questionsActions.setQuestionStatus({
            ID,
            status: "ready"
        }));
}

    useEffect(() => {
        const container = divRef.current;

        if (!container) return;
        else if (status === "adding") {
            container.style.height = `${container.scrollHeight}px`;

            const timeout = setTimeout(() => {
                container.style.height = "auto";
                container.style.opacity = "100";
            }, 300);

            return () => clearTimeout(timeout);
        } else if (status === "deleting") {
            container.style.height = `${container.getBoundingClientRect().height}px`;
            container.style.opacity = "0";

            const timeout = setTimeout(() => {
                container.style.height = "0px";
            }, 0);

            return () => clearTimeout(timeout);
        }
    }, [status]);
    
    return (
        <Transition 
            show={true}
            appear={true}
            enter={status === "generating" ? "transition-opacity" : ""}
            enterFrom={"opacity-0"}
            enterTo="opacity-100"
            afterEnter={makeReady}
            className="w-full"
        >
            <div
                ref={divRef}
                className={`
                    shrink-0 flex flex-col w-full pb-1 duration-300
                    ${ status === "adding" && "transition-[height] h-0 opacity-0 overflow-hidden" }
                    ${ status === "deleting" && "transition-[height] overflow-hidden" }
                `}
            >
                <AddQuestionButton
                    {...{sectionIndex, questionIndex}}
                    hidden
                    className={`text-lg mb-1 ${status === "deleting" && "pointer-events-none"}`}
                >
                    +
                </AddQuestionButton>
                <div className="flex flex-col border-slate-700 border-2 shadow-sm rounded-md overflow-hidden shrink-0 w-full">
                    <QuestionField {...{ID}} />
                    <AnswerField {...{ID}} />
                </div>
            </div>
        </Transition>
    )
}