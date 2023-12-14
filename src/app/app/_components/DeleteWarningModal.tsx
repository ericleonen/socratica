import Shadow from "@/components/Shadow";
import { useDeleteDoc } from "@/db/docs";
import { RootState, useAppDispatch } from "@/store";
import { updateThreatenDelete } from "@/store/docSlice";
import { Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

export default function DeleteWarningModal() {
    const docID = useSelector<RootState, string>(
        state => state.doc.threatenDelete
    )
    const deleteDoc = useDeleteDoc(docID);
    const dispatch = useAppDispatch();

    const close = () => dispatch(updateThreatenDelete(""));

    const title = useSelector<RootState, string>(
        state => state.docsMetadatas.map[docID].title
    );

    return (
        <Shadow 
            onClick={close}
        >
            <Transition
                show={true}
                appear={true}
                enter="transition-opacity transition-transform"
                enterFrom="opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                className="absolute w-[30rem] font-medium text-theme-black bg-theme-white shadow-lg border-2 border-slate-300 rounded-md flex flex-col py-5 px-7 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                <div>{
                    title ? <>
                        Delete the document <span className="font-bold">"{title}"</span> forever?
                    </> :
                    "Delete the untitled document forever?"
                }</div>
                <div className="flex justify-end mt-5">
                    <button 
                        className="px-2 py-1 rounded-md hover:bg-gray-200 mr-2 text-slate-400"
                        onClick={close}
                    >
                        Cancel
                    </button>
                    <button 
                        className="transition-colors px-2 py-1 rounded-md bg-red-500 hover:bg-red-600 text-theme-white"
                        onClick={() => {
                            deleteDoc();
                            close();
                        }}
                    >
                        Yes, delete
                    </button>
                </div>
            </Transition>
        </Shadow>
    )
}