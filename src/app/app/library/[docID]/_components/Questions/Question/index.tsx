import QuestionField from "./QuestionField"
import AnswerField from "./AnswerField"
import { useEffect, useRef, useState, } from "react"
import { useQuestionStatus } from "@/db/docs/read";
import AddQuestionButton from "../AddQuestionButton";
import { Transition } from "@headlessui/react";
import { QuestionType } from "@/db/schemas";
import { questionTheme } from "@/theme/questions";

type QuestionProps = {
    ID: string,
    sectionIndex: number,
    questionIndex: number
}

function useQuestionAnimations(ID: string) {
    const divRef = useRef<HTMLDivElement>(null);
    const status = useQuestionStatus(ID);

    useEffect(() => {
        const container = divRef.current;

        if (!container) return;
        else if (status === "adding") {
            container.style.height = `${container.scrollHeight}px`;

            const timeout: NodeJS.Timeout = setTimeout(() => {
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

    return { divRef, status };
}

export default function Question({ ID, sectionIndex, questionIndex }: QuestionProps) {
    const { divRef, status } = useQuestionAnimations(ID);
    const isAdding = useQuestionStatus(ID) === "adding";
    const [editMode, setEditMode] = useState(isAdding);
    const [typeDraft, setTypeDraft] = useState<QuestionType>("comprehension");
    
    return (
        <Transition 
            show={true}
            appear={true}
            enter="transition-opacity"
            enterFrom={"opacity-0"}
            enterTo="opacity-100"
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
                <div className={`
                    rounded-md p-3 group
                    flex flex-col
                    ${questionTheme[typeDraft].background}
                `}>
                    <QuestionField {...{ID, editMode, setEditMode, typeDraft, setTypeDraft}} />
                    <AnswerField {...{ID, editMode, setEditMode}} type={typeDraft} />
                </div>
            </div>
        </Transition>
    )
}