import { useAutoSaveAnswer, useEditableAnswer } from "@/db/docs/update";
import { QuestionProps } from ".";
import { autoResize, handleChange } from "@/utils/input";
import { useQuestionType } from "@/db/docs/read";

export default function AnswerField({ sectionIndex, questionIndex }: QuestionProps) {
    const [answer, setAnswer] = useEditableAnswer(sectionIndex, questionIndex);
    const disabled = useQuestionType(sectionIndex, questionIndex) === "loading";

    const allowSave = useAutoSaveAnswer(sectionIndex, questionIndex);

    return (
        <textarea 
            disabled={disabled}
            ref={elem => autoResize(elem)}
            value={answer}
            onChange={(e) => {
                handleChange(setAnswer)(e);
                allowSave();
            }}
            placeholder="Your answer here"
            className="bg-white flex-grow w-full h-min resize-none focus:outline-none px-6 py-3 text-slate-700 placeholder:text-slate-700/70"
        />
    )
}