import { db } from "@/firebase";
import { RootState, useAppDispatch } from "@/store";
import { docsMetadatasActions } from "@/store/docsMetadatasSlice";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHasQuestions, useText } from "./read";
import { MIN_SECTION_LENGTH } from "@/config";
import { questionsActions } from "@/store/questionsSlice";
import { docActions } from "@/store/docSlice";
import { useSaveQuestions } from "./update";
import { Question } from "../schemas";

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
                questions: {},
                questionIDs: {}
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
    const hasQuestions = useHasQuestions();
    
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
            let sectionIndex = 0;
            let questionIndex = 0;

            const loadingID = crypto.randomUUID();

            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    dispatch(questionsActions.delete({
                        ID: loadingID
                    }));
                    dispatch(questionsActions.setGeneratingStatus("succeeded"));
                    break;
                };

                let chunks = new TextDecoder('utf-8').decode(value);
                const update = JSON.parse(chunks);
                
                switch (update.type) {
                    case "textSections":
                        const sections = update.data as string[];
                        const numSections = sections.length;

                        dispatch(questionsActions.scaffoldSections(numSections));
                        dispatch(docActions.setText(sections));

                        dispatch(questionsActions.add({
                            sectionIndex: 0,
                            type: "loading",
                            ID: loadingID
                        }));
                        break;
                    case "newQuestion":
                        const { type, question, ID, last } = update.data;

                        dispatch(questionsActions.add({
                            questionIndex,
                            sectionIndex,
                            type,
                            question,
                            ID,
                            replace: last
                        }));

                        questionIndex++;

                        if (last) {
                            sectionIndex++;
                            questionIndex = 0;

                            dispatch(questionsActions.add({
                                sectionIndex,
                                type: "loading",
                                ID: loadingID
                            }));
                        }
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