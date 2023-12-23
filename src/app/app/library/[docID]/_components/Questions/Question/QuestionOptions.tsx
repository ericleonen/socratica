import TooltipProvider from "@/components/TooltipProvider";
import { QuestionProps } from ".";
import SecondaryButton from "@/theme/SecondaryButton";
import Icon from "@/theme/Icon";
import { Delete, Edit, More } from "@icon-park/react";
import OptionsProvider, { Option } from "@/app/app/_components/OptionsProvider";
import { useDeleteQuestion } from "@/db/docs/delete";

export default function QuestionOptions({ sectionIndex, questionIndex }: QuestionProps) {
    const deleteQuestion = useDeleteQuestion(sectionIndex, questionIndex);

    const options: Option[] = [
        {
            icon: Edit,
            text: "Edit question",
            onClick: () => {}
        },
        {
            icon: Delete,
            text: "Delete question",
            onClick: deleteQuestion,
            theme: "danger"
        }
    ]

    return (
        <OptionsProvider options={options}>
            <TooltipProvider
                text="Question options"
                className="right-0 translate-y-1"
            >
                <SecondaryButton 
                    onClick={() => {}}
                    size="small"
                    weight="light"
                    className="invisible group-hover:visible"
                >
                    <Icon type={More} className="text-2xl"/>
                </SecondaryButton>
            </TooltipProvider>
        </OptionsProvider>
    )
}