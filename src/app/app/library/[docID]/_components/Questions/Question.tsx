import { handleChange, useAutoSizeTextArea } from "@/utils/input";
import { useRef, useState } from "react"
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";

export default function Question() {
    const [answer, setAnswer] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useAutoSizeTextArea(textareaRef.current, answer);

    return (
        <div className="text-theme-black w-full flex flex-col shadow-md p-5 rounded-md border-2 border-slate-300 bg-slate-200">
            <div className="flex">
                <p className="font-medium">This is an interesting question. Uh-oh it seems to be too long!</p>
                    <button
                        className="p-1 h-min rounded-md hover:bg-gray-300 text-slate-400"
                    >
                        <EllipsisHorizontalIcon className="h-5 w-5 text-slate-400"/>
                    </button>
            </div>
            <textarea
                    ref={textareaRef}
                    value={answer}
                    onChange={handleChange(setAnswer)}
                    placeholder="Your answer here"
                    className="h-[40px] placeholder:text-slate-400/90 bg-theme-white-lighter focus:outline-none mt-2 resize-none border-2 border-slate-300 rounded-md p-2 overflow-hidden"
                />
        </div>
    )
}