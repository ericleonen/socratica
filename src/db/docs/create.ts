import { db } from "@/firebase";
import { RootState, useAppDispatch } from "@/store";
import { docsMetadatasActions } from "@/store/docsMetadatasSlice";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useQuestions, useText } from "./read";
import { MIN_SECTION_LENGTH } from "@/config";
import { questionsActions } from "@/store/questionsSlice";
import { docActions } from "@/store/docSlice";

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
                questions: {}
            });

            const docID = newDocRef.id;
            const timestamp = Timestamp.now();

            const newDocMetadataRef = doc(db, "users", userID, "docsMetadatas", newDocRef.id);
            await setDoc(newDocMetadataRef, {
                title,
                lastSaved: timestamp
            });

            dispatch(docsMetadatasActions.add({
                docID,
                title,
                lastSaved: timestamp.toJSON()
            }));

            router.push(`/app/library/${docID}`, { scroll: false });

            setInProgress(false);
        } catch (err) {
            const error = err as Error;

            setInProgress(false);
            dispatch(docsMetadatasActions.setError(error.message));
        }
    }

    return [inProgress, createDoc];
}

/**
 * Hook that provides a function to generate questions about the current doc
 * @returns a Trigger to generate questions about the current doc
 */
export function useGenerateQuestions() {
    const text = useText().join("");
    const hasQuestions = useQuestions().length > 0;
    
    const dispatch = useAppDispatch();

    return async () => {
        try {
            if (text.length < MIN_SECTION_LENGTH) {
                throw new Error("Text is too short to generate questions");
            } else if (hasQuestions) {
                throw new Error("Questions have already been generated");
            }

            dispatch(questionsActions.setGeneratingStatus("loading"));
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
                    dispatch(questionsActions.setGeneratingStatus("succeeded"));
                    break;
                };

                let chunk = new TextDecoder('utf-8').decode(value);
                const update = JSON.parse(chunk);
                
                switch (update.type) {
                    case "sectionIntervals":
                    const intervals = update.data;

                        dispatch(questionsActions.scaffoldSections(intervals.length));
                        dispatch(docActions.sectionifyText(intervals));
                        break;
                    case "numQuestions":
                        dispatch(questionsActions.scaffoldQuestions(update.data));
                        break;
                    case "newQuestion":
                        dispatch(questionsActions.setQuestion(update.data));
                        break;
                    default:
                        throw new Error(`Invalid update received: ${update.type}`);
                }
            }
        } catch (err) {
            const error = err as Error;

            dispatch(questionsActions.setGeneratingStatus("failed"));
            dispatch(questionsActions.setError(error.message));
        }
    }
}