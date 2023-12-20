import QuestionField from "./QuestionField"
import AnswerField from "./AnswerField"
import { useQuestionsStatus } from "@/db/docs/read"
import PopUp from "@/components/PopUp"

export type QuestionProps = {
    section: number,
    index: number
}

export default function Question({ section, index }: QuestionProps) {
    const generating = useQuestionsStatus() === "loading";

    return !generating ? (
        <div className="shrink-0 flex flex-col border-2 border-b-4 border-slate-700 rounded-md overflow-hidden mb-8">
            <QuestionField {...{section, index}} />
            <AnswerField {...{section, index}} />
        </div>
    ) : (
        <PopUp className="shrink-0 flex flex-col border-2 border-b-4 border-slate-700 rounded-md overflow-hidden mb-8">
            <QuestionField {...{section, index}} />
            <AnswerField {...{section, index}} />
        </PopUp>
    )
}