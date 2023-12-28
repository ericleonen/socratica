import { useDeleteDoc } from "@/db/docs/delete";
import { useTitle } from "@/db/docs/read";
import PrimaryButton from "@/theme/PrimaryButton";
import SecondaryButton from "@/theme/SecondaryButton";
import Modal from "./Modal";
import { useContext } from "react";
import { modalContexts } from "./ModalProviders";
import { useRouter } from "next/navigation";
import { AlertContext } from "@/components/AlertProvider";

export default function DeleteWarningModal() {
    const title = useTitle();

    const deleteDoc = useDeleteDoc();
    const router = useRouter();
    const setAlert = useContext(AlertContext);

    const deleteAndClose = async () => {
        await deleteDoc();
        setAlert("deletion", "Document deleted");
        router.push("/app");
        close();
    }

    const { close } = useContext(modalContexts["delete"]);

    return (
        <Modal 
            close={close}
            className="py-5 px-7"
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