import { handleChange, useAutoSizeTextArea } from "@/utils/input";
import { useRef, useState } from "react"
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { Question, Question as QuestionType } from "@/db/schemas";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAutoSaveDoc } from "@/db/docs";
import { Transition } from "@headlessui/react";

type QuestionProps = {
    index: number,
    hyperFocus: () => void,
    hyperBlur: () => void
    focus: () => void,
    blur: () => void,
    setAnswer: (answer: string) => void
}

export default function Question(
    { index, hyperFocus, hyperBlur, focus, blur, setAnswer }: QuestionProps
) {
    const { question, answer } = useSelector<RootState, Question>(
        state => state.doc.questions[index]
    );
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useAutoSizeTextArea(textareaRef.current, answer);

    const saveDoc = useAutoSaveDoc(answer);
    const focused = useSelector<RootState, boolean>(
        state => state.doc.focusQuestion === index
    );

    return (
        <Transition 
            show={true}
            appear={true}
            enter="transition-opacity duration-20"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            onMouseOver={focus}
            onMouseLeave={blur}
            className="text-theme-black w-full flex flex-col shadow-md bg-theme-white rounded-md mb-10 last:mb-0"
        >
            <div className={`transition-colors flex ${focused ? "bg-slate-300" : "bg-slate-200"} border-2 rounded-t-md ${focused ? "border-slate-400" : "border-slate-300"} pl-5 pr-3 py-3`}>
                <p className="font-medium">{question}</p>
            </div>
            <textarea
                onFocus={hyperFocus}
                onBlur={hyperBlur}
                ref={textareaRef}
                value={answer}
                onChange={(e) => {
                    handleChange(setAnswer)(e);
                    saveDoc();
                }}
                placeholder="Your answer here"
                className={`transition-colors h-[48px] rounded-b-md w-full placeholder:text-slate-400/90 bg-theme-white-lighter focus:outline-none resize-none px-5 py-3 overflow-hidden ${focused ? "border-slate-400" : "border-slate-300"} border-b-2 border-x-2`}
            />
        </Transition>
    )
}