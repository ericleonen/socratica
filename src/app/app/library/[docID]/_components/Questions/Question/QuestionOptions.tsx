import TooltipProvider from "@/components/TooltipProvider";
import SecondaryButton from "@/theme/SecondaryButton";
import Icon from "@/theme/Icon";
import { Delete, Edit, More } from "@icon-park/react";
import OptionsProvider, { Option } from "@/app/app/_components/OptionsProvider";
import { useDeleteQuestion } from "@/db/docs/delete";
import React, { useMemo } from "react";
import { useQuestionType } from "@/db/docs/read";

type QuestionOptionsProps = {
    ID: string,
    editMode: boolean,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function QuestionOptions({ ID, editMode, setEditMode }: QuestionOptionsProps) {
    const deleteQuestion = useDeleteQuestion(ID);
    const type = useQuestionType(ID);

    const notAvailable = useMemo(() => {
        return ["loading", "deleting"].includes(type) || editMode;
    }, [type, editMode]);

    const options: Option[] = [
        {
            icon: Edit,
            text: "Edit question",
            onClick: () => setEditMode(true)
        },
        {
            icon: Delete,
            text: "Delete question",
            onClick: deleteQuestion,
            theme: "danger"
        }
    ]

    return (
        <OptionsProvider 
            options={options}
            disabled={notAvailable}
            className="shadow-sm"
        >
            <TooltipProvider
                disabled={notAvailable}
                text="Question options"
                className="right-0 translate-y-1"
            >
                <SecondaryButton 
                    onClick={() => {}}
                    weight="light"
                    size="sm"
                    className={`invisible ${!notAvailable && "group-hover:visible"}`}
                >
                    <Icon type={More} className="text-2xl"/>
                </SecondaryButton>
            </TooltipProvider>
        </OptionsProvider>
    )
}