import { DocOptionButton } from "./DocOptionButton";
import { ClipboardDocumentIcon, PrinterIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCopyText } from "@/utils/input";
import { useAppDispatch } from "@/store";
import { updateThreatenDelete } from "@/store/docSlice";
import { usePathDocID } from "@/utils/routing";
import PopUp from "@/components/PopUp";
import { Trigger } from "@/types";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Worksheet from "../../Worksheet";
import { useDocTitle } from "@/db/docs";
import { CopyOne, Delete, PrinterOne } from "@icon-park/react";

type DocOptionsModal = {
    close: Trigger
}

export default function DocOptionsModal({ close }: DocOptionsModal) {
    const dispatch = useAppDispatch();
    const docID = usePathDocID();
    const deleteDoc = () => dispatch(updateThreatenDelete(docID));
    const copyText = useCopyText();
    const title = useDocTitle()[0];

    const worksheetRef = useRef(null);
    const printWorksheet = useReactToPrint({
        content: () => worksheetRef.current,
        documentTitle: `${title} Worksheet by Highlights`
    });

    return (<>
        <div className="hidden">
            <Worksheet ref={worksheetRef} />
        </div>
        <PopUp className="duration-75 bg-white rounded-md p-2 w-[16rem] fixed right-4 top-16 border-2 border-b-4 border-slate-700">
            <DocOptionButton
                icon={CopyOne}
                onClick={() => {
                    copyText();
                    close();
                }}
            >
                Copy document text
            </DocOptionButton>
            <DocOptionButton
                icon={PrinterOne}
                onClick={() => {
                    printWorksheet();
                    close();
                }}
            >
                Print worksheet
            </DocOptionButton>
            <DocOptionButton
                icon={Delete}
                onClick={() => {
                    deleteDoc();
                    close();
                }}
                color="text-red-500"
            >
                Delete
            </DocOptionButton>
        </PopUp>
    </>);
}