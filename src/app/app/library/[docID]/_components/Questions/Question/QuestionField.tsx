import Icon from "@/theme/Icon";
import { BookOne, World, ThinkingProblem, LoadingFour, Down } from "@icon-park/react";
import { QuestionIDProp } from ".";
import { useEditableQuestionDraft } from "@/db/docs/update";
import Skeleton from "@/components/Skeleton";
import { useQuestion } from "@/db/docs/read";
import QuestionOptions from "./QuestionOptions";
import { useCallback, useEffect, useRef, useState } from "react";
import { autoResize, handleChange } from "@/utils/input";
import SecondaryButton from "@/theme/SecondaryButton";
import OptionsProvider, { Option } from "@/app/app/_components/OptionsProvider";

export default function QuestionField({ ID }: QuestionIDProp) {
    const [
        questionDraft, typeDraft, 
        setQuestionDraft, setTypeDraft,
        writeQuestion
    ] = useEditableQuestionDraft(ID);
    const { question, type } = useQuestion(ID);

    const [editMode, setEditMode] = useState(false);
    const cancelEdit = () => {
        setEditMode(false);
        setQuestionDraft(question);
    }
    const saveEdit = () => {
        setEditMode(false);
        writeQuestion();
    }

    const themes = {
        "comprehension": {
            background: "bg-sky-100",
            labelText: "text-sky-500",
            save: "!text-sky-500 hover:!bg-sky-200",
            icon: BookOne
        },
        "research": {
            background: "bg-emerald-100",
            labelText: "text-emerald-500",
            save: "!text-emerald-500 hover:!bg-emerald-200",
            icon: ThinkingProblem
        },
        "big idea": {
            background: "bg-violet-100",
            labelText: "text-violet-500",
            save: "!text-violet-500 hover:!bg-violet-200",
            icon: World
        },
        "loading": {
            background: "bg-gray-100",
            labelText: "text-gray-500",
            save: "",
            icon: LoadingFour
        },
        "deleting": {
            background: "bg-gray-100",
            labelText: "text-gray-500",
            save: "",
            icon: LoadingFour
        }
    }

    const questionTypeOptions: Option[] = [
        {
            icon: BookOne,
            text: "comprehension",
            onClick: () => setTypeDraft("comprehension"),
            theme: "comprehension"
        },
        {
            icon: ThinkingProblem,
            text: "research",
            onClick: () => setTypeDraft("research"),
            theme: "research"
        },
        {
            icon: World,
            text: "big idea",
            onClick: () => setTypeDraft("big idea"),
            theme: "big idea"
        }
    ]

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        autoResize(textarea);

        if (editMode && textarea) {
            textarea.focus();
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        }
    }, [editMode, questionDraft, question]);

    return (
        <div className={`group flex flex-col font-bold pl-6 pr-3 py-3 border-b-2 border-slate-700 ${themes[editMode ? typeDraft : type].background}`}>
            <div className="flex items-center">
                <OptionsProvider 
                    options={questionTypeOptions}
                    disabled={!editMode}
                    align="left"
                >
                    <div className={`text-xs flex items-center p-1 rounded-md ${themes[editMode ? typeDraft : type].labelText} ${editMode ? themes[editMode ? typeDraft : type].save : "pointer-events-none"}`}>
                        <Icon type={themes[editMode ? typeDraft : type].icon} className={`mr-2 text-base ${["loading", "deleting"].includes(type) && "animate-spin"}`}/>
                        <span className="tracking-wide uppercase mr-2">{editMode ? typeDraft : type}</span>
                        { editMode && <Icon type={Down} className="text-base"/> }
                    </div>
                </OptionsProvider>
                <div className="ml-auto">
                    <QuestionOptions {...{ID, editMode, setEditMode}} />
                </div>
            </div>
            { 
                ["loading", "deleting"].includes(type) ?
                <Skeleton className="mt-1">...</Skeleton> : <>
                    <textarea 
                        disabled={!editMode}
                        ref={textareaRef}
                        value={editMode ? questionDraft: question}
                        onChange={handleChange(setQuestionDraft)}
                        className="text-slate-700 mt-1 pl-1 pr-3 focus:outline-none resize-none bg-transparent"
                    />
                    {
                        editMode &&
                        <div className="flex mt-3 justify-end pr-3">
                            <SecondaryButton
                                onClick={cancelEdit}
                                weight="light"
                                size="lg"
                            >
                                Cancel
                            </SecondaryButton>
                            <SecondaryButton 
                                onClick={saveEdit}
                                weight="light"
                                size="lg"
                                className={`ml-2 ${themes[editMode ? typeDraft : type].save}`}
                            >
                                Save
                            </SecondaryButton>
                        </div>
                    }
                </>
            }
        </div>
    )
}