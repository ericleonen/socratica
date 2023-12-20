import { useAutoSaveDoc, useEditableAnswer } from "@/db/docs/update";
import { QuestionProps } from ".";
import { handleChange, useAutoSizeTextArea } from "@/utils/input";
import { useRef } from "react";

export default function AnswerField({ section, index }: QuestionProps) {
    const [answer, setAnswer] = useEditableAnswer(section, index);
    const allowSave = useAutoSaveDoc(answer);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useAutoSizeTextArea(textareaRef.current, answer);

    return (
        <textarea 
            ref={textareaRef}
            value={answer}
            onChange={(e) => {
                handleChange(setAnswer)(e);
                allowSave();
            }}
            placeholder="Your answer here"
            className="bg-white flex-grow w-full resize-none focus:outline-none px-6 py-3 text-slate-700 placeholder:text-slate-700/70"
        />
    )
}