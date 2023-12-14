import { useDeleteDoc } from "@/db/docs";
import { DocOptionButton } from "./DocOptionButton";
import { ClipboardDocumentIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { useCopyText } from "@/utils/input";
import { useAppDispatch } from "@/store";
import { updateThreatenDelete } from "@/store/docSlice";
import { usePathDocID } from "@/utils/routing";

export default function DocOptionsModal() {
    const dispatch = useAppDispatch();
    const docID = usePathDocID();
    const deleteDoc = () => dispatch(updateThreatenDelete(docID));
    const copyText = useCopyText();

    return (
        <Transition
            show={true}
            appear={true}
            enter="transition-opacity transition-transform"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            className="duration-75 bg-theme-white-lighter rounded-md p-2 w-[16rem] fixed right-4 top-16 shadow-2xl border-2"
        >
            <DocOptionButton
                icon={<ClipboardDocumentIcon className="w-5 h-5"/>}
                onClick={copyText}
            >
                Copy document text
            </DocOptionButton>
            <DocOptionButton
                icon={<TrashIcon className="w-5 h-5 text-red-500"/>}
                onClick={deleteDoc}
            >
                <span className="text-red-500">Delete</span>
            </DocOptionButton>
        </Transition>
    );
}