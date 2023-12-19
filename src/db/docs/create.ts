import { db } from "@/firebase";
import { RootState, useAppDispatch } from "@/store";
import { addQuestion, addQuestionSections, sectionifyText, updateError, updateQuestionsStatus, updateSavingStatus } from "@/store/docSlice";
import { addMetadata } from "@/store/docsMetadatasSlice";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useQuestions, useText } from "./read";
import { useSaveDoc } from "./update";
import { MIN_SECTION_LENGTH } from "@/config";

/**
 * Hook that provides a function to create a new doc. Opens the doc in the app after creation
 * @retruns a boolean representing whether creation is still in progress and the doc creating
 *          function with an optional title parameter
 */
export function useCreateDoc(): [boolean, (title?: string) => void] {
    const userID = useSelector<RootState, string>(
        state => state.user.ID
    );
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [inProgress, setInProgress] = useState(false);

    const createDoc = async (title: string = "") => {
        try {
            setInProgress(true);

            const docsRef = collection(db, "users", userID, "docs");
            const newDocRef = await addDoc(docsRef, {
                text: [""],
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

    return [inProgress, createDoc];
}

/**
 * Hook that provides a function to generate questions about the current doc
 * @returns a Trigger to generate questions about the current doc
 */
export function useGenerateQuestions() {
    const text = useText();
    const hasQuestions = useQuestions().length > 0;
    
    const saveDoc = useSaveDoc();
    const dispatch = useAppDispatch();

    return async () => {
        try {
            if (text.length < MIN_SECTION_LENGTH) {
                throw new Error("Text is too short to generate questions");
            } else if (hasQuestions) {
                throw new Error("Questions have already been generated");
            }

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
            dispatch(updateSavingStatus("unsaved"));

            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    dispatch(updateQuestionsStatus("idle"));
                    saveDoc();
                    break;
                };

                let chunk = new TextDecoder('utf-8').decode(value);
                const update = JSON.parse(chunk);
                
                switch (update.type) {
                    case "sectionIntervals":
                        dispatch(addQuestionSections(update.data.length));
                        dispatch(sectionifyText(update.data));
                        break;
                    case "newQuestion":
                        dispatch(addQuestion(update.type.data));
                        break;
                    default:
                        throw new Error(`Invalid update received: ${update.type}`);
                        break;
                }
            }
        } catch (err) {
            dispatch(updateQuestionsStatus("failed"));
            dispatch(updateError(err as Error));
        }
    }
}