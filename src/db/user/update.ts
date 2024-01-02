import { useAppDispatch } from "@/store";
import { useUserID, useUserName } from "./read";
import { userActions } from "@/store/userSlice";
import { useCallback } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useSave } from "../docs/update";

export function useEditableUserName(): [
    string, (newName: string) => void
] {
    const name = useUserName();
    
    const dispatch = useAppDispatch();

    return [
        name,
        (newName: string) => dispatch(userActions.setName(newName))
    ]
}

export function useSaveUserName() {
    const userID = useUserID();
    const name = useUserName();

    const dispatch = useAppDispatch();

    const saveCallback = useCallback(async () => {
        try {
            dispatch(userActions.setSavingStatus("saving"));

            const userRef = doc(db, "users", userID);
            await updateDoc(userRef, {
                name
            });

            dispatch(userActions.setSavingStatus("saved"));
        } catch (err) {
            const error = (err as Error).message;

            dispatch(userActions.setSavingStatus("failed"));
            dispatch(userActions.setError(error));
        }
    }, [userID, name]);
    const saveName = useSave(saveCallback);

    return saveName;
}