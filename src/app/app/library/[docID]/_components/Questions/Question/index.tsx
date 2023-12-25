import QuestionField from "./QuestionField"
import AnswerField from "./AnswerField"
import { useQuestions } from "@/db/docs/read"
import { useContext, useEffect, useRef } from "react"
import { HeightStateContext } from "../DimensionsContext"

type QuestionProps = {
    ID: string,
    isBottom: boolean
}

export type QuestionIDProp = { ID: string };

export default function Question({ ID, isBottom }: QuestionProps) {
    const questions = useQuestions();

    const { setHeight } = useContext(HeightStateContext);

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const div = divRef.current;
        if (div && isBottom) {
            setHeight(div.offsetTop + div.offsetHeight + 32)
        };
    }, [ID, isBottom, JSON.stringify(questions)]);

    return (
        <div 
            ref={divRef}
        >
            <div className="shrink-0 flex flex-col border-2 border-slate-700 shadow-sm rounded-md overflow-hidden mb-8">
                <QuestionField {...{ID}} />
                <AnswerField {...{ID}} />
            </div>
        </div>
    )
}