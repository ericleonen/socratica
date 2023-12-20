import Icon from "@/theme/Icon";
import { BookOne, World, ThinkingProblem } from "@icon-park/react";
import { QuestionProps } from ".";
import { useEditableQuestion } from "@/db/docs/update";

export default function QuestionField({ section, index }: QuestionProps) {
    const [
        question, type, 
        setQuestion, setType, 
        resetQuestion, saveQuestion
    ] = useEditableQuestion(section, index);

    const typeTheme = {
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
        }
    }[type];

    return (
        <div className={`flex flex-col font-bold p-6 py-3 border-b-2 border-slate-700 ${typeTheme.background}`}>
            <div className={`text-xs flex items-center tracking-wide uppercase ${typeTheme.labelText}`}>
                <Icon type={typeTheme.icon} className="mr-2 text-base"/>
                {type}
            </div>
            <p className="text-slate-700 mt-1">{question}</p>
        </div>
    )
}