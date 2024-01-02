import OptionsProvider, { Option } from "@/app/app/_components/OptionsProvider";
import { modalContexts } from "@/app/app/_components/modals/ModalProviders";
import { AlertContext } from "@/components/AlertProvider";
import TooltipProvider from "@/components/TooltipProvider";
import Icon from "@/theme/Icon";
import SecondaryButton from "@/theme/SecondaryButton";
import { useCopyText } from "@/utils/input";
import { Copy, Delete, More, Printer } from "@icon-park/react";
import { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Worksheet from "../Worksheet";

export default function DocOptions() {
    const copyText = useCopyText();

    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => printRef.current
    });
    
    const deleteModal = useContext(modalContexts["delete"]);
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
            icon: Printer,
            text: "Print worksheet",
            onClick: handlePrint
        },
        {
            icon: Delete,
            text: "Delete document",
            onClick: deleteModal.open,
            theme: "danger"
        }
    ];

    return <>
        <div className="hidden">
            <Worksheet ref={printRef} />
        </div>
        <OptionsProvider
            options={options}
            absolute
        >
            <TooltipProvider 
                text="Document options"
                className="right-0 translate-y-1"
            >
                <SecondaryButton
                    onClick={() => {}}
                    size="md"
                >
                    <Icon type={More} className="text-2xl"/>
                </SecondaryButton>
                
            </TooltipProvider>
        </OptionsProvider>
    </>
}