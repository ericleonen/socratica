import { useAnswer, useAutoSaveDoc } from "@/db/docs";
import { handleChange, useAutoSizeTextArea } from "@/utils/input";
import { useRef } from "react";
import { useHyperFocus } from "../HyperFocusedContext";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type AnswerFieldProps = {
    index: number
}

export default function AnswerField({ index }: AnswerFieldProps) {
    const [answer, setAnswer] = useAnswer(index);
    const saveDoc = useAutoSaveDoc(answer);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useAutoSizeTextArea(textareaRef.current, answer);
    
    const [focus, blur] = useHyperFocus(index);
    const focused = useSelector<RootState, boolean>(
        state => state.doc.focusQuestion === index
    );

    return (
        <textarea
            onFocus={focus}
            onBlur={blur}
            ref={textareaRef}
            value={answer}
            onChange={(e) => {
                handleChange(setAnswer)(e);
                saveDoc();
            }}
            placeholder="Your answer here"
            className={`transition-colors h-[48px] rounded-b-md w-full placeholder:text-slate-400/90 bg-theme-white-lighter focus:outline-none resize-none px-5 py-3 overflow-hidden ${focused ? "border-slate-400" : "border-slate-300"} border-b-2 border-x-2`}
        />
    )
}