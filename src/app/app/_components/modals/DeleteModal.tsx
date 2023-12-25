import { useDeleteDoc } from "@/db/docs/delete";
import { useTitle } from "@/db/docs/read";
import PrimaryButton from "@/theme/PrimaryButton";
import SecondaryButton from "@/theme/SecondaryButton";
import { useModalContext } from "./ModalContext";
import Modal from "./Modal";

export default function DeleteWarningModal() {
    const title = useTitle();

    const deleteDoc = useDeleteDoc();
    const deleteAndClose = () => {
        setTimeout(() => {
            deleteDoc();
            close();
        }, 200);
    }

    const { setDeleteModal } = useModalContext();
    const close = () => setDeleteModal(false);

    return (
        <Modal 
            close={close}
            className="py-5 px-7 bg-white"
        >
            <p className="font-medium text-slate-700">{
                title ? <>
                    Delete the document <span className="font-bold">"{title}"</span> forever?
                </> : "Delete the untitled document forever?"
            }</p>
            <div className="flex justify-end mt-5">
                <SecondaryButton 
                    onClick={close}
                    size="lg"
                    className="mr-3"
                >
                    Cancel
                </SecondaryButton>
                <PrimaryButton 
                    onClick={deleteAndClose}
                    theme="danger"
                >
                    Yes, delete
                </PrimaryButton>
            </div>
        </Modal>
    )
}