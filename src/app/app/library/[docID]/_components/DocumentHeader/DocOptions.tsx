import OptionsProvider, { Option } from "@/app/app/_components/OptionsProvider";
import TooltipProvider from "@/components/TooltipProvider";
import { useDeleteDoc } from "@/db/docs/delete";
import Icon from "@/theme/Icon";
import SecondaryButton from "@/theme/SecondaryButton";
import { useCopyText } from "@/utils/input";
import { Copy, Delete, More } from "@icon-park/react";

export default function DocOptions() {
    const copyText = useCopyText();
    const deleteDoc = useDeleteDoc();

    const options: Option[] = [
        {
            icon: Copy,
            text: "Copy document",
            onClick: copyText,
        },
        {
            icon: Delete,
            text: "Delete document",
            onClick: deleteDoc,
            theme: "danger"
        }
    ];

    return (
        <OptionsProvider options={options}>
            <TooltipProvider 
                text="Document options"
                className="right-0 translate-y-1"
            >
                <SecondaryButton
                    onClick={() => {}}
                >
                    <Icon type={More} className="text-2xl"/>
                </SecondaryButton>
                
            </TooltipProvider>
        </OptionsProvider>
    )
}