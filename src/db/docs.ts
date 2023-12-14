import { db } from "@/firebase";
import { Timestamp, addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { DocMetadata, Question } from "./schemas";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "@/store";
import { addMetadata, fetchDocsMetadatas, removeMetadata, updateLastSaved, updateTitle } from "@/store/docsMetadatasSlice";
import { useSelector } from "react-redux";
import { ResourceStatus, SavingStatus } from "@/store/types";
import { usePathDocID } from "@/utils/routing";
import { clearDoc, fetchDoc, addQuestion, updateQuestionsStatus, updateError, updateSavingStatus, updateText } from "@/store/docSlice";
import { useRouter } from "next/navigation";

/**
 * Hook that provides a trigger to create a new doc in Firestore and store as well as open the
 * doc via routing
 * @returns a boolean denoting if a document is in progress and a create trigger that creates a
 *          document with an optional title parameter
 */
export function useCreateDoc(): [boolean, (title?: string) => void] {
    const userID = useSelector<RootState, string>(
        state => state.user.ID
    );
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [inProgress, setInProgress] = useState(false);

    const trigger = async (title: string = "") => {
        try {
            setInProgress(true);
            const docsRef = collection(db, "users", userID, "docs");
            const newDocRef = await addDoc(docsRef, {
                text: "",
                questions: []
            });

            const docID = newDocRef.id;
            const timestamp = Timestamp.now();
    
            const newDocMetadataRef = doc(db, "users", userID, "docsMetadatas", newDocRef.id);
            await setDoc(newDocMetadataRef, {
                title,
                lastSaved: timestamp
            });
    
            dispatch(addMetadata({
                docID,
                title,
                lastSaved: timestamp.toJSON()
            }));

            router.push(`/app/library/${docID}`, { scroll: false });
            
            dispatch(updateSavingStatus("saved"));
            setInProgress(false);

        } catch (err) {
            setInProgress(false);
            dispatch(updateError(err as Error));
        }
    }

    return [inProgress, trigger];
}

/**
 * Hook that loads docs metadatas into store from Firestore
 */
export function useDocsMetadatas() {
    const userID = useSelector<RootState, string>(state => state.user.ID);
    const dispatch = useAppDispatch();
    const status = useSelector<RootState, ResourceStatus>(
        state => state.docsMetadatas.status
    );

    useEffect(() => {
        if (userID && status === "idle") {
            dispatch(fetchDocsMetadatas(userID));
        }
    }, [status, userID]);
}

/**
 * Hook that loads doc into store from Firestore everytime route path docID changes
 */
export function useDoc() {
    const userID = useSelector<RootState, string>(state => state.user.ID);
    const docID = usePathDocID();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userID && docID) {
            dispatch(fetchDoc({
                userID,
                docID
            }));
            dispatch(updateSavingStatus("saved"));
        }
    }, [userID, docID]);
}

/**
 * Text state hook that is linked with doc text in store
 * @returns an array of the current text string and a text setter function
 */
export function useDocText(): [string, (text: string) => void] {
    const text = useSelector<RootState, string>(state => state.doc.text);
    const dispatch = useAppDispatch();

    return [
        text,
        (text: string) => dispatch(updateText(text))
    ];
}

/**
 * Title state hook that is linked with the current doc's metadata title in store
 * @returns an array of the current title string and a title setter function
 */
export function useDocTitle(): [string, (title: string) => void] {
    const docID = usePathDocID();
    const title = docID && useSelector<RootState, string>(
        state => state.docsMetadatas.map[docID]?.title
    );
    const dispatch = useAppDispatch();

    return [
        title as string,
        (title: string) => dispatch(updateTitle({
            docID,
            title
        }))
    ];
}

/**
 * Hook that provides a trigger to save the current doc to Firestore. Updates store saving status
 * @returns a trigger that saves the doc
 */
export function useSaveDoc() {
    const userID = useSelector<RootState, string>(
        state => state.user.ID
    );
    const docID = usePathDocID() as string;
    const docMetadata = useSelector<RootState, DocMetadata>(
        state => state.docsMetadatas.map[docID]
    );
    const text = useSelector<RootState, string>(
        state => state.doc.text
    );
    const questions = useSelector<RootState, Question[]>(
        state => state.doc.questions
    );
    const savingStatus = useSelector<RootState, SavingStatus>(
        state => state.doc.savingStatus
    );

    const dispatch = useAppDispatch();

    return async () => {
        try {
            if (savingStatus !== "unsaved") return;

            dispatch(updateSavingStatus("saving"));

            const docRef = doc(db, "users", userID, "docs", docID);
            await setDoc(docRef, {
                text,
                questions
            });

            const docMetadataRef = doc(db, "users", userID, "docsMetadatas", docID);
            const lastSaved = Timestamp.now();

            await setDoc(docMetadataRef, {
                title: docMetadata.title,
                lastSaved
            });

            dispatch(updateSavingStatus("saved"));
            dispatch(updateLastSaved({
                docID,
                lastSaved: lastSaved.toJSON()
            }));
        } catch (err) {
            dispatch(updateSavingStatus("failed"));
            dispatch(updateError(err as Error));
        }
    }
}

/**
 * Hook that automatically saves the current doc whenever the dependency changes. Updates store
 * saving status
 * @param dependency any value in the doc that, when changed, can trigger a save
 * @returns a trigger that allows a save
 */
export function useAutoSaveDoc(dependency: any) {
    const savingStatus = useSelector<RootState, SavingStatus>(
        state => state.doc.savingStatus
    );
    const saveDoc = useSaveDoc();
    const dispatch = useAppDispatch();

    useEffect(() => {
        let countdown = -1;
        if (savingStatus === "unsaved") {
            countdown = window.setTimeout(saveDoc, 1000);
        }
        return () => clearTimeout(countdown);
    }, [dependency])

    return async () => {
        dispatch(updateSavingStatus("unsaved"));
    }
}

/**
 * Hook that provides a trigger to delete a doc and its metadata from the store and Firestore.
 * Re-routes to main app page if deleting a current doc
 * @param providedDocID string ID of a specific doc
 * @returns a trigger that deletes the doc
 */
export function useDeleteDoc(providedDocID: string) {
    const userID = useSelector<RootState, string>(
        state => state.user.ID
    );
    const docID = providedDocID as string;
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
 * Hook that provides a trigger that generates questions based on text into store and saves
 * to Firestore
 * @returns a trigger that generates questions into store
 */
export function useGenerateQuestions() {
    const dispatch = useAppDispatch();
    const text = useSelector<RootState, string>(
        state => state.doc.text
    );
    const saveDoc = useSaveDoc();
    
    return async () => {
        dispatch(updateQuestionsStatus("loading"));
        const questionsRes = await fetch("/api/questions", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ text })
        });

        if (!questionsRes.body) return;

        const reader = questionsRes.body.getReader();

        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                dispatch(updateQuestionsStatus("idle"));
                dispatch(updateSavingStatus("unsaved"));
                saveDoc();
                break;
            };

            let chunk = new TextDecoder('utf-8').decode(value);
            const question = JSON.parse(chunk);

            dispatch(addQuestion(question));
        }
    }
}