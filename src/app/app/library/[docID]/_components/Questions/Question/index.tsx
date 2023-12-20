import QuestionField from "./QuestionField"
import AnswerField from "./AnswerField"
import { useQuestionsStatus } from "@/db/docs/read"
import PopUp from "@/components/PopUp"

export type QuestionProps = {
    section: number,
    index: number,
    setHeight?: (height: number | null) => void
}

export default function Question({ section, index, setHeight }: QuestionProps) {
    const generating = useQuestionsStatus() === "loading";

    const adjustHeight = (elem: HTMLDivElement | null) => {
        if (elem && setHeight) {
            setHeight(elem.offsetTop + elem.offsetHeight + 32)
        }
    }

    return !generating ? (
        <div 
            ref={adjustHeight}
            className="shrink-0 flex flex-col border-2 border-b-4 border-slate-700 rounded-md overflow-hidden mb-8"
        >
            <QuestionField {...{section, index}} />
            <AnswerField {...{section, index}} />
        </div>
    ) : (
        <PopUp>
            <QuestionField {...{section, index}} />
            <AnswerField {...{section, index}} />
        </PopUp>
    )
}