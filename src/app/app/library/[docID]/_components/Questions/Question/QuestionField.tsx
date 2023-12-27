import Icon from "@/theme/Icon";
import { BookOne, World, ThinkingProblem, LoadingFour, Down } from "@icon-park/react";
import { QuestionIDProp } from ".";
import { useEditableQuestionDraft, useSaveQuestion, useSaveQuestions } from "@/db/docs/update";
import Skeleton from "@/components/Skeleton";
import QuestionOptions from "./QuestionOptions";
import { useEffect, useRef, useState } from "react";
import { autoResize, handleChange } from "@/utils/input";
import SecondaryButton from "@/theme/SecondaryButton";
import OptionsProvider, { Option } from "@/app/app/_components/OptionsProvider";
import { useQuestionStatus } from "@/db/docs/read";
import { useAppDispatch } from "@/store";
import { questionsActions } from "@/store/questionsSlice";
import { useDeleteQuestion } from "@/db/docs/delete";

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
    }
}

export default function QuestionField({ ID }: QuestionIDProp) {
    const [
        questionDraft, typeDraft,
        setQuestionDraft, setTypeDraft,
        writeQuestion, resetQuestion
    ] = useEditableQuestionDraft(ID);
    const isAdding = useQuestionStatus(ID) === "adding";

    const saveQuestions = useSaveQuestions();
    const deleteQuestion = useDeleteQuestion(ID, true);
    const dispatch = useAppDispatch();

    const [editMode, setEditMode] = useState(isAdding);
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

    const cancelEdit = () => {
        if (isAdding) {
            deleteQuestion();
        } else {
            resetQuestion();
            setEditMode(false);
        }
    }
    const saveEdit = () => {
        writeQuestion();
        dispatch(questionsActions.setQuestionStatus({
            ID,
            status: "ready"
        }));
        setEditMode(false);
        saveQuestions();
    }

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        autoResize(textarea);

        if (editMode && textarea) {
            textarea.focus();
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        }
    }, [editMode, questionDraft]);

    const [focused, setFocused] = useState(false);

    return (
        <div className={`group flex flex-col font-bold pl-6 pr-3 py-3 border-b-2 border-slate-700 ${themes[typeDraft].background}`}>
            <div className="flex items-center">
                <OptionsProvider 
                    options={questionTypeOptions}
                    disabled={!editMode}
                    align="left"
                >
                    <div className={`
                        text-xs flex items-center p-1 rounded-md 
                        ${themes[typeDraft].labelText} 
                        ${editMode ? themes[typeDraft].save : "pointer-events-none"}
                    `}>
                        <Icon type={themes[typeDraft].icon} className="mr-2 text-base"/>
                        <span className="tracking-wide uppercase mr-2">{typeDraft}</span>
                        { editMode && <Icon type={Down} className="text-base"/> }
                    </div>
                </OptionsProvider>
                <div className="ml-auto">
                    <QuestionOptions {...{ID, editMode, setEditMode}} />
                </div>
            </div>
            <div className={`transition-colors p-1 pb-0 mt-1 rounded-md ${focused && "bg-amber-200"}`}>
                <textarea 
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    disabled={!editMode}
                    ref={textareaRef}
                    value={questionDraft}
                    placeholder="A question here"
                    onChange={handleChange(setQuestionDraft)}
                    className={`text-slate-700 px-[2px] w-full h-full focus:outline-none rounded-md resize-none placeholder:text-slate-400 bg-transparent`}
                />
            </div>
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
                        className={`ml-2 ${themes[typeDraft].save}`}
                    >
                        Save
                    </SecondaryButton>
                </div>
            }
        </div>
    )
}