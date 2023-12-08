import { handleChange, useAutoSizeTextArea } from "@/utils/input";
import { useRef, useState } from "react"
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";

type QuestionProps = {
    question: string
}

export default function Question({ question }: QuestionProps) {
    const [answer, setAnswer] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useAutoSizeTextArea(textareaRef.current, answer);

    return (
        <div className="text-theme-black w-full flex flex-col shadow-md bg-theme-white rounded-md mb-10 last:mb-0">
            <div className="flex bg-slate-200 border-2 rounded-t-md border-slate-300 pl-5 pr-3 py-3">
                <p className="font-medium">{question}</p>
                    <button
                        className="p-1 h-min rounded-md hover:bg-gray-300 text-slate-400 ml-1"
                    >
                        <EllipsisHorizontalIcon className="h-5 w-5 text-slate-400"/>
                    </button>
            </div>
            <textarea
                    ref={textareaRef}
                    value={answer}
                    onChange={handleChange(setAnswer)}
                    placeholder="Your answer here"
                    className="rounded-b-md w-full placeholder:text-slate-400/90 bg-theme-white-lighter focus:outline-none resize-none px-5 py-3 overflow-hidden border-slate-300 border-b-2 border-x-2"
                />
        </div>
    )
}