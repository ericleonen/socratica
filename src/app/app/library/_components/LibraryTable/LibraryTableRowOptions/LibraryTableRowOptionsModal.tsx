import { TrashIcon } from "@heroicons/react/24/outline";
import { LibraryTableRowOptionButton } from "./LibraryTableRowOptionButton";
import { useAppDispatch } from "@/store";
import { updateThreatenDelete } from "@/store/docSlice";
import PopUp from "@/components/PopUp";

type LibraryTableRowOptionsModalProps = {
    onClick: () => void,
    docID: string
}

export default function LibraryTableRowOptionsModal(
    { docID, onClick }: LibraryTableRowOptionsModalProps
) {
    const dispatch = useAppDispatch();
    const deleteDoc = () => dispatch(updateThreatenDelete(docID));

    return (
        <PopUp className="duration-75 bg-theme-white-lighter rounded-md p-2 w-[12rem] absolute shadow-2xl border-2 z-[100] right-2 top-1/2 translate-y-3">
            <LibraryTableRowOptionButton
                icon={<TrashIcon className="w-5 h-5 text-red-500"/>}
                onClick={() => {
                    deleteDoc();
                    onClick();
                }}
            >
                <span className="text-red-500">Delete document</span>
            </LibraryTableRowOptionButton>
        </PopUp>
    )
}