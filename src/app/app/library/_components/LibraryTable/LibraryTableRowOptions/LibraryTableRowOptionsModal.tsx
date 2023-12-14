import { TrashIcon } from "@heroicons/react/24/outline";
import { LibraryTableRowOptionButton } from "./LibraryTableRowOptionButton";
import { useDeleteDoc } from "@/db/docs";
import { Transition } from "@headlessui/react";

type LibraryTableRowOptionsModalProps = {
    onClick: () => void,
    docID: string
}

export default function LibraryTableRowOptionsModal(
    { docID, onClick }: LibraryTableRowOptionsModalProps
) {
    const deleteDoc = useDeleteDoc(docID);

    return (
        <Transition
            show={true}
            appear={true}
            enter="transition-opacity duration-15"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            onClick={onClick}
            className="bg-theme-white-lighter rounded-md p-2 w-[12rem] absolute shadow-2xl border-2 z-[100] right-2 top-1/2 translate-y-3"
        >
            <LibraryTableRowOptionButton
                icon={<TrashIcon className="w-5 h-5 text-red-600"/>}
                onClick={deleteDoc}
            >
                <span className="text-red-600">Delete document</span>
            </LibraryTableRowOptionButton>
        </Transition>
    )
}