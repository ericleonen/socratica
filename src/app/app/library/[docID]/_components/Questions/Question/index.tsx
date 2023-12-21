import QuestionField from "./QuestionField"
import AnswerField from "./AnswerField"
import { useQuestionType } from "@/db/docs/read"
import PopUp from "@/components/PopUp"

export type QuestionProps = {
    sectionIndex: number,
    questionIndex: number,
    setHeight?: (height: number | null) => void
}

export default function Question({ sectionIndex, questionIndex, setHeight }: QuestionProps) {
    const loading = useQuestionType(sectionIndex, questionIndex) === "loading";

    const adjustHeight = (elem: HTMLDivElement | null) => {
        if (elem && setHeight) {
            setHeight(elem.offsetTop + elem.offsetHeight + 32)
        }
    }

    return !loading ? (
        <div 
            ref={adjustHeight}
            className="shrink-0 flex flex-col border-2 border-b-4 border-slate-700 rounded-md overflow-hidden mb-8"
        >
            <QuestionField {...{sectionIndex, questionIndex}} />
            <AnswerField {...{sectionIndex, questionIndex}} />
        </div>
    ) : (
        <div ref={adjustHeight}>
            <PopUp className="shrink-0 flex flex-col border-2 border-b-4 border-slate-700 rounded-md overflow-hidden mb-8">
                <QuestionField {...{sectionIndex, questionIndex}} />
                <AnswerField {...{sectionIndex, questionIndex}} />
            </PopUp>
        </div>
    )
}