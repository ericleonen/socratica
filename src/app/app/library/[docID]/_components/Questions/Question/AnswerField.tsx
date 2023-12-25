import { useAutoSave, useEditableAnswer, useSaveQuestion } from "@/db/docs/update";
import { autoResize, handleChange } from "@/utils/input";
import { useQuestionType } from "@/db/docs/read";
import { QuestionIDProp } from ".";

export default function AnswerField({ ID }: QuestionIDProp) {
    const [answer, setAnswer] = useEditableAnswer(ID);
    const disabled = useQuestionType(ID) === "loading";

    const saveAnswer = useSaveQuestion(ID);
    const allowSaves = useAutoSave(saveAnswer, answer);

    return (
        <textarea 
            disabled={disabled}
            ref={elem => autoResize(elem)}
            value={answer}
            onChange={(e) => {
                handleChange(setAnswer)(e);
                allowSaves();
            }}
            placeholder="Your answer here"
            className="bg-white flex-grow w-full h-min resize-none focus:outline-none px-6 py-3 text-slate-700 placeholder:text-slate-700/70"
        />
    )
}