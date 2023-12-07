import { useDeleteDoc } from "@/db/docs";
import { DocOptionButton } from "./DocOptionButton";
import { ClipboardDocumentIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";

export default function DocOptionsModal() {
    const deleteDoc = useDeleteDoc();

    return (
        <Transition
            show={true}
            appear={true}
            enter="transition-opacity duration-15"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            className="bg-theme-white rounded-md p-2 w-[12rem] fixed right-4 top-16 shadow-2xl border-2"
        >
            <DocOptionButton
                icon={<TrashIcon className="w-5 h-5"/>}
                onClick={deleteDoc}
            >
                Delete
            </DocOptionButton>
            <DocOptionButton
                icon={<ClipboardDocumentIcon className="w-5 h-5"/>}
                onClick={() => {}}
            >
                Copy doc
            </DocOptionButton>
        </Transition>
    );
}