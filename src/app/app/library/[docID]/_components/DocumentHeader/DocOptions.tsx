import OptionsProvider, { Option } from "@/app/app/_components/OptionsProvider";
import { useModalContext } from "@/app/app/_components/modals/ModalContext";
import { AlertContext } from "@/components/AlertProvider";
import TooltipProvider from "@/components/TooltipProvider";
import Icon from "@/theme/Icon";
import SecondaryButton from "@/theme/SecondaryButton";
import { useCopyText } from "@/utils/input";
import { Copy, Delete, More } from "@icon-park/react";
import { useContext } from "react";

export default function DocOptions() {
    const copyText = useCopyText();
    
    const { setDeleteModal } = useModalContext();
    const setAlert = useContext(AlertContext);

    const options: Option[] = [
        {
            icon: Copy,
            text: "Copy document",
            onClick: () => {
                copyText();
                setAlert("copied", "Document copied");
            },
        },
        {
            icon: Delete,
            text: "Delete document",
            onClick: () => setDeleteModal(true),
            theme: "danger"
        }
    ];

    return (
        <OptionsProvider
            options={options}
            className="shadow-sm"
        >
            <TooltipProvider 
                text="Document options"
                className="right-0 translate-y-1"
            >
                <SecondaryButton
                    onClick={() => {}}
                    weight="light"
                    size="sm"
                >
                    <Icon type={More} className="text-2xl"/>
                </SecondaryButton>
                
            </TooltipProvider>
        </OptionsProvider>
    )
}