import { DocOptionButton } from "./DocOptionButton";
import { ClipboardDocumentIcon, PrinterIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCopyText } from "@/utils/input";
import { useAppDispatch } from "@/store";
import { updateThreatenDelete } from "@/store/docSlice";
import { usePathDocID } from "@/utils/routing";
import PopUp from "@/components/PopUp";
import { Trigger } from "@/types";
import { Fragment, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Worksheet from "../../Worksheet";

type DocOptionsModal = {
    close: Trigger
}

export default function DocOptionsModal({ close }: DocOptionsModal) {
    const dispatch = useAppDispatch();
    const docID = usePathDocID();
    const deleteDoc = () => dispatch(updateThreatenDelete(docID));
    const copyText = useCopyText();

    const worksheetRef = useRef(null);
    const printWorksheet = useReactToPrint({
        content: () => worksheetRef.current
    });

    return (<>
        <div className="hidden">
            <Worksheet ref={worksheetRef} />
        </div>
        <PopUp className="duration-75 bg-theme-white-lighter rounded-md p-2 w-[16rem] fixed right-4 top-16 shadow-2xl border-2">
            <DocOptionButton
                icon={<ClipboardDocumentIcon className="w-5 h-5"/>}
                onClick={() => {
                    copyText();
                    close();
                }}
            >
                Copy document text
            </DocOptionButton>
            <DocOptionButton
                icon={<PrinterIcon className="w-5 h-5"/>}
                onClick={() => {
                    printWorksheet();
                    close();
                }}
            >
                Print worksheet
            </DocOptionButton>
            <DocOptionButton
                icon={<TrashIcon className="w-5 h-5 text-red-500"/>}
                onClick={() => {
                    deleteDoc();
                    close();
                }}
            >
                <span className="text-red-500">Delete</span>
            </DocOptionButton>
        </PopUp>
    </>);
}