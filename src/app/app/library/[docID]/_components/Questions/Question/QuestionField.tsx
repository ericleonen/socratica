import Icon from "@/theme/Icon";
import { BookOne, World, ThinkingProblem, LoadingFour, More } from "@icon-park/react";
import { QuestionProps } from ".";
import { useEditableQuestionDraft } from "@/db/docs/update";
import Skeleton from "@/components/Skeleton";
import { useQuestion, useQuestionType } from "@/db/docs/read";
import SecondaryButton from "@/theme/SecondaryButton";
import TooltipProvider from "@/components/TooltipProvider";
import QuestionOptions from "./QuestionOptions";

export default function QuestionField({ sectionIndex, questionIndex }: QuestionProps) {
    const [
        questionDraft, typeDraft, 
        setQuestionDraft, setTypeDraft,
        writeQuestion
    ] = useEditableQuestionDraft(sectionIndex, questionIndex);

    const { question, type } = useQuestion(sectionIndex, questionIndex);

    const theme = {
        "comprehension": {
            background: "bg-sky-100",
            labelText: "text-sky-500",
            icon: BookOne
        },
        "research": {
            background: "bg-emerald-100",
            labelText: "text-emerald-500",
            icon: ThinkingProblem
        },
        "big idea": {
            background: "bg-violet-100",
            labelText: "text-violet-500",
            icon: World
        },
        "loading": {
            background: "bg-gray-100",
            labelText: "text-gray-500",
            icon: LoadingFour
        }
    }[type];

    return theme && (
        <div className={`group flex flex-col font-bold pl-6 pr-3 py-3 border-b-2 border-slate-700 ${theme.background}`}>
            <div className={`text-xs flex items-center ${theme.labelText}`}>
                <Icon type={theme.icon} className={`mr-2 text-base ${type === "loading" && "animate-spin"}`}/>
                <p className="tracking-wide uppercase">{type}</p>
                <div className="ml-auto">
                    <QuestionOptions {...{sectionIndex, questionIndex}} />
                </div>
            </div>
            { 
                type === "loading" ?
                <Skeleton className="mt-1">...</Skeleton> :
                <p className="text-slate-700 mt-1 pr-3">{question}</p>
            }
        </div>
    )
}