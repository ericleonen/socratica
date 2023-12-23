import OptionsProvider, { Option } from "@/app/app/_components/OptionsProvider";
import { useModalContext } from "@/app/app/_components/modals/ModalContext";
import TooltipProvider from "@/components/TooltipProvider";
import Icon from "@/theme/Icon";
import SecondaryButton from "@/theme/SecondaryButton";
import { useCopyText } from "@/utils/input";
import { Copy, Delete, More } from "@icon-park/react";

export default function DocOptions() {
    const copyText = useCopyText();
    
    const { setDeleteModal } = useModalContext();

    const options: Option[] = [
        {
            icon: Copy,
            text: "Copy document",
            onClick: copyText,
        },
        {
            icon: Delete,
            text: "Delete document",
            onClick: () => setDeleteModal(true),
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
                    size="mid"
                    weight="light"
                >
                    <Icon type={More} className="text-2xl"/>
                </SecondaryButton>
                
            </TooltipProvider>
        </OptionsProvider>
    )
}