import { useAutoSave, useEditableAnswer, useSaveQuestion } from "@/db/docs/update";
import { autoResize, handleChange } from "@/utils/input";
import { useQuestionStatus, useQuestionType } from "@/db/docs/read";
import React from "react";
import { questionTheme } from "@/theme/questions";
import { QuestionType } from "@/db/schemas";

type AnswerFieldProps = {
    ID: string,
    editMode: boolean,
    type: QuestionType
}

export default function AnswerField({ ID, editMode, type }: AnswerFieldProps) {
    const [answer, setAnswer] = useEditableAnswer(ID);
    const disabled = useQuestionStatus(ID) === "deleting" || editMode;

    const saveAnswer = useSaveQuestion(ID);
    const allowSaves = useAutoSave(saveAnswer, answer);

    return (
        <textarea 
            disabled={disabled}
            ref={elem => autoResize(elem)}
            value={answer}
            onChange={handleChange(setAnswer, allowSaves)}
            placeholder="Your answer here"
            className={`
                disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 placeholder:text-slate-400 placeholder:dark:text-slate-600 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded font-medium px-3 py-2 border-2 w-full focus:outline-none focus:shadow-[0_0_0_4px] resize-none overflow-hidden
                ${questionTheme[type].focus}   
            `}
        />
    )
}