import { db } from "@/firebase";
import { RootState, useAppDispatch } from "@/store";
import { docsMetadatasActions } from "@/store/docsMetadatasSlice";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHasQuestions, useText } from "./read";
import { questionsActions } from "@/store/questionsSlice";
import { docActions } from "@/store/docSlice";
import { Trigger } from "@/types";
import { useLocalStorage } from "@/utils/localStorage";
import { words2Chars } from "@/utils/format";
import { usePathDocID } from "@/utils/routing";
import { useUserID } from "../user/read";

/**
 * Hook that provides a function to create a new doc. Opens the doc in the app after creation
 * @retruns a boolean representing whether creation is still in progress and the doc creating
 *          function with an optional title parameter
 */
export function useCreateDoc(): [boolean, (title?: string, text?: string) => void] {
    const userID = useSelector<RootState, string>(
        state => state.user.ID
    );
    const pathDocID = usePathDocID();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [inProgress, setInProgress] = useState(false);
    const [newDocID, setNewDocID] = useState<string>();

    useEffect(() => {
        if (newDocID === pathDocID) {
            setInProgress(false);
        }
    }, [pathDocID, newDocID]);

    const createDoc = async (title: string = "", text: string = "") => {
        try {
            setInProgress(true);

            const docsRef = collection(db, "users", userID, "docs");
            const newDocRef = await addDoc(docsRef, {
                text: [text],
                questions: {},
                questionIDs: {}
            });

            const docID = newDocRef.id;
            setNewDocID(docID);
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
    const MIN_SECTION_LENGTH = useLocalStorage("sectionSize", words2Chars(100))[0];
    const CHARS_PER_COMP = useLocalStorage("compFreq", words2Chars(100))[0];
    const SECTIONS_PER_BIG_IDEA = useLocalStorage("bigIdeaFreq", 4)[0];
    const userID = useUserID();

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
                body: JSON.stringify({ 
                    text,
                    MIN_SECTION_LENGTH,
                    CHARS_PER_COMP,
                    SECTIONS_PER_BIG_IDEA,
                    userID
                })
            });

            if (!questionsRes.body) {
                // An unexpected error occurred
                return;
            };

            const reader = questionsRes.body.getReader();
            let sectionIndex = 0;

            while (true) {
                const { done, value } = await reader.read();

                if (done) {
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

                        break;
                    case "newQuestion":
                        const { type, question, ID, last } = update.data;

                        dispatch(questionsActions.add({
                            sectionIndex, 
                            ID,
                            status: "ready",
                            question,
                            type
                        }));

                        if (last) sectionIndex++;

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

export function useAddQuestion(sectionIndex: number, questionIndex?: number): Trigger {
    const dispatch = useAppDispatch();

    return () => {
        dispatch(questionsActions.add({
            sectionIndex,
            questionIndex,
            ID: crypto.randomUUID()
        }))
    }
}