import { usePathDocID } from "@/utils/routing";
import { useUserID } from "../user";
import { useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { docActions } from "@/store/docSlice";
import { docsMetadatasActions } from "@/store/docsMetadatasSlice";
import { Trigger } from "@/types";
import { questionsActions } from "@/store/questionsSlice";
import { useSaveQuestions } from "./update";

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
            dispatch(docActions.clear());
            dispatch(questionsActions.clear());

            router.push("/app");
        } catch (err) {
            const error = err as Error;
            dispatch(docActions.setSavingStatus("failed"));
            dispatch(docActions.setError(error.message));
        }
    }
}

export function useDeleteQuestion(ID: string): Trigger {
    const dispatch = useAppDispatch();
    const saveQuestions = useSaveQuestions();

    return () => {
        dispatch(questionsActions.setQuestion({
            ID,
            type: "deleting"
        }));

        setTimeout(() => {
            dispatch(questionsActions.delete({
                ID
            }));
            //saveQuestions();
        }, 300);
    }
}