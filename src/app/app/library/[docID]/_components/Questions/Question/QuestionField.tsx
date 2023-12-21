import Icon from "@/theme/Icon";
import { BookOne, World, ThinkingProblem, LoadingFour } from "@icon-park/react";
import { QuestionProps } from ".";
import { useEditableQuestionDraft } from "@/db/docs/update";
import Skeleton from "@/components/Skeleton";
import { useQuestion, useQuestionType } from "@/db/docs/read";

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
        <div className={`flex flex-col font-bold p-6 py-3 border-b-2 border-slate-700 ${theme.background}`}>
            <div className={`text-xs flex items-center tracking-wide uppercase ${theme.labelText}`}>
                <Icon type={theme.icon} className={`mr-2 text-base ${type === "loading" && "animate-spin"}`}/>
                {type}
            </div>
            { 
                type === "loading" ?
                <Skeleton className="mt-1">...</Skeleton> :
                <p className="text-slate-700 mt-1">{question}</p>
            }
        </div>
    )
}