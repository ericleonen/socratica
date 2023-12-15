import { useQuestion } from "@/db/docs";
import { QuestionProps } from ".";
import { useRef, useState } from "react";
import { handleChange, useAutoSizeTextArea } from "@/utils/input";
import { useHyperFocus } from "../HyperFocusedContext";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import TooltipProvider from "@/components/TooltipProvider";

export default function QuestionField({ index }: QuestionProps) {
    const [question, setQuestion, revertQuestion, saveQuestion] = useQuestion(index);
    const [editMode, setEditMode] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useAutoSizeTextArea(textareaRef.current, question);

    const [focus, blur] = useHyperFocus(index);
    const focused = useSelector<RootState, boolean>(
        state => state.doc.focusQuestion === index
    );

    return (
        <div className={`relative group transition-colors flex ${focused ? "bg-slate-300" : "bg-slate-200"} border-2 rounded-t-md ${focused ? "border-slate-400" : "border-slate-300"} p-3`}>
            {
                editMode ? <div className="flex flex-col font-medium w-full shadow-md p-4 rounded-md bg-theme-white-lighter border-2 border-slate-300 text-theme-black">
                    <textarea 
                        autoFocus
                        onFocus={focus}
                        onBlur={blur}
                        ref={textareaRef}
                        value={question}
                        onChange={handleChange(setQuestion)}
                        className="bg-transparent resize-none focus:outline-none w-full"
                    />
                    <div className="flex mt-3">
                        <button
                            onClick={() => {
                                setEditMode(false);
                                revertQuestion();
                            }}
                            className="px-2 py-1 rounded-md hover:bg-gray-200 ml-auto mr-2 text-slate-400"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={question.length === 0}
                            onClick={() => {
                                setEditMode(false);
                                saveQuestion();
                            }}
                            className="px-2 py-1 rounded-md hover:bg-gray-200"
                        >
                            Save
                        </button>
                    </div>
                </div> : <>
                    <p className="font-medium pl-2">{question}</p>
                    <div className={`flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:transition-opacity absolute top-0 right-0 h-full px-2 py-3 ${focused ? "bg-slate-300 border-l-slate-400" : "bg-slate-200 border-l-slate-300"} border-l-2 rounded-tr-md`}>
                        <TooltipProvider
                            text="Edit question"
                            className="top-[-0.25rem] right-0 translate-y-[-100%]"
                        >
                            <button
                                className=" text-slate-400 hover:bg-slate-400/25 p-1 h-min rounded-md"
                                onClick={() => setEditMode(true)}
                            >
                                <PencilSquareIcon className="h-5 w-5"/>
                            </button>
                        </TooltipProvider>
                    </div>
                </>
            }
        </div>
    )
}