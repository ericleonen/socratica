import QuestionField from "./QuestionField"
import AnswerField from "./AnswerField"
import { useEffect, useRef, useState } from "react"
import { useQuestionType } from "@/db/docs/read";

export type QuestionIDProp = { ID: string };

export default function Question({ ID }: QuestionIDProp) {
    const divRef = useRef<HTMLDivElement>(null);
    const deleting = useQuestionType(ID) === "deleting";

    const [isHeightSet, setIsHeightSet] = useState(false);

    useEffect(() => {
        const div = divRef.current;
        if (!div || !deleting) return;

        if (!isHeightSet) {
            div.style.height = "0px";
            div.style.height = `${div.scrollHeight}px`;
            div.style.opacity = "0";

            setIsHeightSet(true);
        } else {
            div.style.height = "0px";
        }
    }, [deleting, isHeightSet]);

    return (
        <div 
            ref={divRef}
            className={`${deleting && isHeightSet ? "border-0 mb-0 transition-deleting duration-300" : "border-2 mb-8"} shrink-0 flex flex-col border-slate-700 shadow-sm rounded-md overflow-hidden`}
        >
            <QuestionField {...{ID}} />
            <AnswerField {...{ID}} />
        </div>
    )
}