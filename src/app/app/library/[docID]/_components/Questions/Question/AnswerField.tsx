import { useAutoSave, useEditableAnswer, useSaveQuestion } from "@/db/docs/update";
import { autoResize, handleChange } from "@/utils/input";
import { useQuestionStatus, useQuestionType, useQuestionsGeneratingStatus } from "@/db/docs/read";
import { QuestionIDProp } from ".";
import { useState } from "react";

export default function AnswerField({ ID }: QuestionIDProp) {
    const [answer, setAnswer] = useEditableAnswer(ID);
    const disabled = useQuestionStatus(ID) === "deleting";

    const saveAnswer = useSaveQuestion(ID);
    const allowSaves = useAutoSave(saveAnswer, answer);

    const [focused, setFocused] = useState(false);

    return (
        <div className={`transition-colors p-1 pb-0 h-min ${focused && "bg-amber-200 dark:bg-amber-300/10"}`}>
            <textarea 
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                disabled={disabled}
                ref={elem => autoResize(elem)}
                value={answer}
                onChange={(e) => {
                    handleChange(setAnswer)(e);
                    allowSaves();
                }}
                placeholder="Your answer here"
                className="bg-transparent flex-grow w-full h-min resize-none rounded-md focus:outline-none pl-6 pr-5 py-2 text-slate-700 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-400/80"
            />
        </div>
    )
}