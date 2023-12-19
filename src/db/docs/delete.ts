import { usePathDocID } from "@/utils/routing";
import { useUserID } from "../user";
import { useAppDispatch } from "@/store";
import { useRouter } from "next/router";
import { db } from "@/firebase";
import { updateSavingStatus, clearDoc, updateError } from "@/store/docSlice";
import { removeMetadata } from "@/store/docsMetadatasSlice";
import { doc, deleteDoc } from "firebase/firestore";

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