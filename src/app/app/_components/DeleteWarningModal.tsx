import PopUp from "@/components/PopUp";
import Shadow from "@/components/Shadow";
import { useDeleteDoc } from "@/db/docs";
import { RootState, useAppDispatch } from "@/store";
import { updateThreatenDelete } from "@/store/docSlice";
import PrimaryButton from "@/theme/PrimaryButton";
import SecondaryButton from "@/theme/SecondaryButton";
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

    const deleteAndClose = () => {
        setTimeout(() => {
            deleteDoc();
            close();
        }, 200);
    }

    return (
        <Shadow 
            onClick={close}
        >
            <PopUp
                className="absolute w-[30rem] bg-white border-2 border-b-4 border-slate-700 rounded-md flex flex-col py-5 px-7 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
            >
                <p className="font-medium text-slate-700">{
                    title ? <>
                        Delete the document <span className="font-bold">"{title}"</span> forever?
                    </> : "Delete the untitled document forever?"
                }</p>
                <div className="flex justify-end mt-5">
                    <SecondaryButton 
                        onClick={close}
                        className="mr-3"
                    >
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton 
                        onClick={deleteAndClose}
                        className="bg-red-500/70 hover:bg-red-500/90"
                    >
                        Yes, delete
                    </PrimaryButton>
                </div>
            </PopUp>
        </Shadow>
    )
}