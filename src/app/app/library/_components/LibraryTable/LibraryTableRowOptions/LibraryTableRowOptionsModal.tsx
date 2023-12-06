import { TrashIcon } from "@heroicons/react/24/outline";
import { LibraryTableRowOptionButton } from "./LibraryTableRowOptionButton";
import { useDeleteDoc } from "@/db/docs";

type LibraryTableRowOptionsModalProps = {
    onClick: () => void,
    docID: string
}

export default function LibraryTableRowOptionsModal(
    { docID, onClick }: LibraryTableRowOptionsModalProps
) {
    const deleteDoc = useDeleteDoc(docID);

    return (
        <div 
            onClick={onClick}
            className="bg-theme-white rounded-md p-2 w-[12rem] absolute shadow-2xl border-2 z-[100] right-0 translate-y-1"
        >
            <LibraryTableRowOptionButton
                icon={<TrashIcon className="w-5 h-5"/>}
                onClick={deleteDoc}
            >
                Delete document
            </LibraryTableRowOptionButton>
        </div>
    )
}