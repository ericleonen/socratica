import { usePathDocID } from "@/utils/routing";
import { useUserID } from "../user";
import { RootState, useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { updateSavingStatus, clearDoc, updateError } from "@/store/docSlice";
import { removeMetadata } from "@/store/docsMetadatasSlice";
import { doc, deleteDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

/**
 * Hook that provides a trigger to delete the current doc
 * @returns a Trigger to delete the current doc
 */
export function useDeleteDoc() {
    const userID = useUserID();
    const docID = usePathDocID() as string;
    
    const dispatch = useAppDispatch();
    const router = useRouter();

    return async () => {
        try {
            dispatch(updateSavingStatus("deleting"));

            const docRef = doc(db, "users", userID, "docs", docID);
            await deleteDoc(docRef);

            const docMetadataRef = doc(db, "users", userID, "docsMetadatas", docID);
            await deleteDoc(docMetadataRef);

            dispatch(removeMetadata(docID));
            dispatch(clearDoc());

            router.push("/app/library");
        } catch (err) {
            dispatch(updateError(err as Error));
        }
    }
}

/**
 * Hook that provides a boolean if the user wants to delete the current doc
 * @returns a boolean that is true if the user wants to delete the current doc
 */
export function useThreateningDelete() {
    const threateningDelete = useSelector<RootState, boolean>(
        state => state.doc.threateningDelete
    );

    return threateningDelete;
}