import { usePathDocID } from "@/utils/routing";
import { useUserID } from "../user";
import { RootState, useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { docActions } from "@/store/docSlice";
import { docsMetadatasActions } from "@/store/docsMetadatasSlice";

export function useDeleteDoc() {
    const userID = useUserID();
    const docID = usePathDocID() as string;
    
    const dispatch = useAppDispatch();
    const router = useRouter();

    return async () => {
        try {
            dispatch(docActions.setSavingStatus("deleting"));

            const docRef = doc(db, "users", userID, "docs", docID);
            await deleteDoc(docRef);

            const docMetadataRef = doc(db, "users", userID, "docsMetadatas", docID);
            await deleteDoc(docMetadataRef);

            dispatch(docsMetadatasActions.remove(docID));

            router.push("/app");
        } catch (err) {
            const error = err as Error;
            dispatch(docActions.setSavingStatus("failed"));
            dispatch(docActions.setError(error.message));
        }
    }
}

export function useThreateningDelete() {
    const threateningDelete = useSelector<RootState, boolean>(
        state => state.doc.threateningDelete
    );

    return threateningDelete;
}