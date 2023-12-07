import { db } from "@/firebase";
import { Timestamp, addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { DocMetadata, Question } from "./schemas";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "@/store";
import { addMetadata, fetchDocsMetadatas, removeMetadata, updateLastSaved, updateTitle } from "@/store/docsMetadatasSlice";
import { useSelector } from "react-redux";
import { ResourceStatus, SavingStatus } from "@/store/types";
import { usePathDocID } from "@/utils/routing";
import { clearDoc, fetchDoc, updateError, updateSavingStatus, updateText } from "@/store/docSlice";
import { useRouter } from "next/navigation";

/**
 * Hook that provides a trigger to create a new doc in Firestore and store as well as open the
 * doc via routing
 * @returns a create trigger that creates a document with an optional title parameter
 */
export function useCreateDoc() {
    const userID = useSelector<RootState, string>(
        state => state.user.ID
    );
    const router = useRouter();
    const dispatch = useAppDispatch();

    return async (title: string = "") => {
        try {
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

        } catch (err) {
            dispatch(updateError(err as Error));
        }
    }
}

/**
 * Hook that loads docs metadatas into store from Firestore
 */
export function useDocsMetadatas() {
    const userID = useSelector<RootState, string>(state => state.user.ID);
    const dispatch = useAppDispatch();
    const docsMetadatasStatus = useSelector<RootState, ResourceStatus>(
        state => state.docsMetadatas.status
    );

    useEffect(() => {
        if (userID && docsMetadatasStatus === "idle") {
            dispatch(fetchDocsMetadatas(userID));
        }
    }, [docsMetadatasStatus, userID]);
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
 * @param metadataOnly optional boolean that makes the trigger only save the metadata
 * @returns a trigger that saves the doc
 */
export function useSaveDoc(metadataOnly?: boolean) {
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
            if (["deleting", "saved"].includes(savingStatus)) return;

            dispatch(updateSavingStatus("saving"));

            if (!metadataOnly) {
                const docRef = doc(db, "users", userID, "docs", docID);
                await setDoc(docRef, {
                    text,
                    questions
                });
            }

            const docMetadataRef = doc(db, "users", userID, "docsMetadatas", docID);
            const lastSaved = Timestamp.now();

            await setDoc(docMetadataRef, {
                title: docMetadata.title,
                lastSaved
            });

            dispatch(updateLastSaved({
                docID,
                lastSaved: lastSaved.toJSON()
            }));

           dispatch(updateSavingStatus("saved"));
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
 * @param metadataOnly optional boolean that flags saves to the metadata only
 * @returns a trigger that allows a save
 */
export function useAutoSaveDoc(dependency: any, metadataOnly?: boolean) {
    const savingStatus = useSelector<RootState, SavingStatus>(
        state => state.doc.savingStatus
    );
    const saveDoc = useSaveDoc(metadataOnly);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (["deleting", "saved"].includes(savingStatus)) return;
        const timeout = setTimeout(saveDoc, 1000);

        return () => clearTimeout(timeout);
    }, [savingStatus, dependency]);

    return () => {
        dispatch(updateSavingStatus("unsaved"));
    }
}

/**
 * Hook that provides a trigger to delete a doc and its metadata from the store and Firestore.
 * Re-routes to main app page if deleting a current doc
 * @param providedDocID optional string ID of a specific doc
 * @returns a trigger that deletes the doc
 */
export function useDeleteDoc(providedDocID?: string) {
    const userID = useSelector<RootState, string>(
        state => state.user.ID
    );
    const docID: string = usePathDocID() || providedDocID as string;
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

            if (!providedDocID) {
                router.push("/app/library");
            }
        } catch (err) {
            dispatch(updateError(err as Error));
        }
    }
}