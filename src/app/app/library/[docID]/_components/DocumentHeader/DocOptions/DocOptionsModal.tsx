import { useDeleteDoc } from "@/db/docs";
import { DocOptionButton } from "./DocOptionButton";
import { ClipboardDocumentIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { useCopyText } from "@/utils/input";

export default function DocOptionsModal() {
    const deleteDoc = useDeleteDoc();
    const copyText = useCopyText();

    return (
        <Transition
            show={true}
            appear={true}
            enter="transition-opacity duration-15"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            className="bg-theme-white-lighter rounded-md p-2 w-[16rem] fixed right-4 top-16 shadow-2xl border-2"
        >
            <DocOptionButton
                icon={<ClipboardDocumentIcon className="w-5 h-5"/>}
                onClick={copyText}
            >
                Copy document text
            </DocOptionButton>
            <DocOptionButton
                icon={<TrashIcon className="w-5 h-5 text-red-600"/>}
                onClick={deleteDoc}
            >
                <span className="text-red-600">Delete</span>
            </DocOptionButton>
        </Transition>
    );
}