import Icon from "@/theme/Icon";
import { BookOne, World, ThinkingProblem, Down } from "@icon-park/react";
import { useEditableQuestion, useSaveQuestions } from "@/db/docs/update";
import QuestionOptions from "./QuestionOptions";
import { useEffect, useRef, useState } from "react";
import { autoResize, handleChange } from "@/utils/input";
import SecondaryButton from "@/theme/SecondaryButton";
import OptionsProvider, { Option } from "@/app/app/_components/OptionsProvider";
import { useQuestionStatus } from "@/db/docs/read";
import { useAppDispatch } from "@/store";
import { questionsActions } from "@/store/questionsSlice";
import { useDeleteQuestion } from "@/db/docs/delete";
import { Transition } from "@headlessui/react";
import { QuestionType } from "@/db/schemas";
import { questionTheme } from "@/theme/questions";

const themes = {
    "comprehension": {
        background: "bg-sky-100 dark:bg-sky-400/10",
        labelText: "text-sky-500",
        darkText: "dark:text-sky-500",
        save: "!text-sky-500 hover:!bg-sky-200",
        icon: BookOne
    },
    "research": {
        background: "bg-emerald-100 dark:bg-emerald-400/10",
        labelText: "text-emerald-500",
        darkText: "dark:text-emerald-500",
        save: "!text-emerald-500 hover:!bg-emerald-200",
        icon: ThinkingProblem
    },
    "big idea": {
        background: "bg-violet-100 dark:bg-violet-400/10",
        labelText: "text-violet-500",
        darkText: "dark:text-violet-500",
        save: "!text-violet-500 hover:!bg-violet-200",
        icon: World
    }
}

type QuestionFieldProps = {
    ID: string,
    editMode: boolean,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
    typeDraft: QuestionType,
    setTypeDraft: React.Dispatch<React.SetStateAction<QuestionType>>
}

export default function QuestionField({ ID, editMode, setEditMode, typeDraft, setTypeDraft }: QuestionFieldProps) {
    const [question, type, setQuestion] = useEditableQuestion(ID);
    const [questionDraft, setQuestionDraft] = useState(question);

    useEffect(() => {
        setTypeDraft(type);
    }, []);

    const isAdding = useQuestionStatus(ID) === "adding";

    const saveQuestions = useSaveQuestions();
    const deleteQuestion = useDeleteQuestion(ID, true);
    const dispatch = useAppDispatch();
    
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
            setQuestionDraft(question);
            setTypeDraft(type);
            setEditMode(false);
        }
    }
    const saveEdit = () => {
        setQuestion(questionDraft, typeDraft);
        dispatch(questionsActions.setQuestionStatus({
            ID,
            status: "ready"
        }));
        saveQuestions();
        setEditMode(false);
    }

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
        <>
            <div className="flex items-center">
                <OptionsProvider
                    options={questionTypeOptions}
                    disabled={!editMode}
                    align="left"
                    absolute
                >
                    <div className={`
                        text-xs flex items-center p-1 rounded-md
                        ${editMode && "hover:bg-sky-500/20"}
                        ${questionTheme[typeDraft].text}
                    `}>
                        <Icon type={questionTheme[typeDraft].icon} className="mr-2 text-base" />
                        <span className="font-bold uppercase tracking-wider mr-2">{typeDraft}</span>
                        {
                            editMode && <Icon type={Down} className="text-base"/>
                        }
                    </div>
                </OptionsProvider>
                <div className="ml-auto">
                    <QuestionOptions {...{ID, editMode, setEditMode}} />
                </div>
            </div>
            <textarea 
                disabled={!editMode}
                ref={textareaRef}
                value={questionDraft}
                placeholder="A question here"
                onChange={handleChange(setQuestionDraft)}
                className={`
                    transition-[margin,padding] border-2 mb-3 w-full py-2 px-1 rounded-md font-bold
                    resize-none focus:outline-none overflow-hidden placeholder:text-slate-400 placeholder:dark:text-slate-600
                    ${ 
                        editMode ? 
                        "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:shadow-[0_0_0_4px] mt-2 px-3" : 
                        "border-transparent bg-transparent px-1 text-base"
                    }
                    ${ editMode && questionTheme[typeDraft].focus }
                    ${questionTheme[typeDraft].text}
                `}
            />
            <Transition
                show={editMode}
                enter="transition-[height,margin] invisible"
                enterFrom="h-0 mb-0"
                enterTo="h-[32px] mb-3"
                leave="transition-[height,margin] invisible"
                leaveFrom="h-[32px] mb-3"
                leaveTo="h-0 mb-0"
                className="overflow-hidden flex w-full mb-3"
            >
                <SecondaryButton
                    size="lg"
                    weight="light"
                    onClick={cancelEdit}
                    className="ml-auto mr-2"
                >
                    Cancel
                </SecondaryButton>
                <button
                    onClick={saveEdit}
                    className={`
                        px-2 py-1
                        rounded-md font-medium focus:outline-none
                        ${questionTheme[typeDraft].text}
                        ${questionTheme[typeDraft].save}
                    `}
                >
                    Save
                </button>
            </Transition>
        </>
    )
}