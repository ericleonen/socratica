import { useAppDispatch } from "@/store";
import { useAnswer, useFocusSection, useQuestion, useQuestionIDs, useQuestions, useText, useTitle } from "./read";
import { docsMetadatasActions } from "@/store/docsMetadatasSlice";
import { usePathDocID } from "@/utils/routing";
import { useUserID } from "../user/read";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import React, { useCallback, useEffect, useState } from "react";
import { AUTOSAVE_DELAY } from "@/config";
import { Trigger } from "@/types";
import { QuestionIDsMap, QuestionType, QuestionsMap, ReadyQuestion } from "../schemas";
import { docActions } from "@/store/docSlice";
import { questionsActions } from "@/store/questionsSlice";

// GENERIC
// ==========
export function useSave(saveCallback: Trigger): Trigger {
    const [canSave, setCanSave] = useState(false);

    useEffect(() => {
        if (!canSave) return;

        saveCallback();
        setCanSave(false);

    }, [canSave]);

    return () => setCanSave(true);
}

export function useAutoSave(
    saveCallback: Trigger, 
    dependency: any, 
    delay: number = AUTOSAVE_DELAY,
) {
    const [allowSaves, setAllowSaves] = useState(false);

    useEffect(() => {
        if (!allowSaves) return;

        const timeout = setTimeout(saveCallback, delay);

        return () => clearTimeout(timeout);
    }, [allowSaves, dependency]);

    return () => setAllowSaves(true);
}
 
// DOCS
// ==========
export function useEditableText(): [string, (newText: string) => void] {
    const text = useText();
    const dispatch = useAppDispatch();

    return [
        text.join(""),
        (newText: string) => dispatch(docActions.setText([newText]))
    ]
}

export function useSaveText(): Trigger {
    const userID = useUserID();
    const docID = usePathDocID();
    const text = useText();

    const dispatch = useAppDispatch();
    const saveCallback = useCallback(async () => {
        try {
            dispatch(docActions.setSavingStatus("saving"));
            const lastSaved = Timestamp.now();

            const docRef = doc(db, "users", userID, "docs", docID);
            await updateDoc(docRef, {
                text
            });

            const docMetadataRef = doc(db, "users", userID, "docsMetadatas", docID);
            await updateDoc(docMetadataRef, {
                lastSaved
            });

            dispatch(docsMetadatasActions.setLastSaved({
                docID,
                lastSaved: lastSaved.toJSON()
            }));
            dispatch(docActions.setSavingStatus("saved"));
        } catch (err) {
            const error = (err as Error).message;

            dispatch(docActions.setSavingStatus("failed"));
            dispatch(docActions.setError(error));
        }
    }, [userID, docID, text.join(""), text.length]);
    const saveText = useSave(saveCallback);

    return saveText;
}

// QUESTIONS
// ==========
export function useSaveQuestions(): Trigger {
    const userID = useUserID();
    const docID = usePathDocID() as string;
    const questionIDs = useQuestionIDs();
    const questions = useQuestions();

    const dispatch = useAppDispatch();
    const saveCallback = useCallback(async () => {
        try {
            dispatch(questionsActions.setSavingStatus("saving"));
            const lastSaved = Timestamp.now();

            const readyQuestions: QuestionsMap<ReadyQuestion> = {};
            for (let ID in questions) {
                const question = questions[ID];

                if (question.status === "ready") {
                    readyQuestions[ID] = {
                        question: question.question,
                        answer: question.answer,
                        type: question.type
                    }
                }
            }

            const readyQuestionIDs: QuestionIDsMap = {};
            questionIDs.forEach((sectionIDs, sectionIndex) => {
                readyQuestionIDs[sectionIndex] = sectionIDs.filter(
                    ID => readyQuestions.hasOwnProperty(ID)
                );
            });

            const docRef = doc(db, "users", userID, "docs", docID);
            await updateDoc(docRef, {
                questions: readyQuestions,
                questionIDs: readyQuestionIDs
            });

            const docMetadataRef = doc(db, "users", userID, "docsMetadatas", docID);
            await updateDoc(docMetadataRef, {
                lastSaved
            });

            dispatch(docsMetadatasActions.setLastSaved({
                docID,
                lastSaved: lastSaved.toJSON()
            }));
            dispatch(questionsActions.setSavingStatus("saved"));
        } catch (err) {
            const error = err as Error;

            dispatch(questionsActions.setSavingStatus("failed"));
            dispatch(questionsActions.setError(error.message));
        }
    }, [userID, docID, JSON.stringify(questionIDs), JSON.stringify(questions)]);
    const saveQuestions = useSave(saveCallback);

    return saveQuestions;
}

export function useSaveQuestion(ID: string) {
    const userID = useUserID();
    const docID = usePathDocID() as string;
    const question = useQuestion(ID);

    const dispatch = useAppDispatch();
    const saveCallback = useCallback(async () => {
        try {
            if (question.status !== "ready") {
                throw new Error("Attempting to save non-ready question!");
            }
            
            dispatch(questionsActions.setSavingStatus("saving"));
            const lastSaved = Timestamp.now();

            const readyQuestion: ReadyQuestion = {
                question: question.question,
                answer: question.answer,
                type: question.type
            };

            const docRef = doc(db, "users", userID, "docs", docID);
            await updateDoc(docRef, {
                [`questions.${ID}`]: readyQuestion
            });

            const docMetadataRef = doc(db, "users", userID, "docsMetadatas", docID);
            await updateDoc(docMetadataRef, {
                lastSaved
            });

            dispatch(docsMetadatasActions.setLastSaved({
                docID,
                lastSaved: lastSaved.toJSON()
            }));
            dispatch(questionsActions.setSavingStatus("saved"));
        } catch (err) {
            const error = err as Error;

            dispatch(questionsActions.setSavingStatus("failed"));
            dispatch(questionsActions.setError(error.message));
        }
    }, [userID, docID, JSON.stringify(question)]);
    const saveQuestion = useSave(saveCallback);

    return saveQuestion;
}

export function useEditableQuestion(ID: string): [
    string, QuestionType, (newQuestion: string, newType: QuestionType) => void
] {
    const { question, type } = useQuestion(ID);

    const dispatch = useAppDispatch();

    return [
        question,
        type,
        (newQuestion: string, newType: QuestionType) => {
            dispatch(questionsActions.setQuestion({
                ID,
                question: newQuestion,
                type: newType
            }));
        }
    ]
}

export function useEditableAnswer(ID: string):
    [string, (newAnswer: string) => void] 
{
    const answer = useAnswer(ID);
    
    const dispatch = useAppDispatch();

    const setAnswer = (newAnswer: string) => {
        dispatch(questionsActions.setQuestion({
            ID,
            answer: newAnswer
        }));
    };

    return [answer, setAnswer];
}

export function useEditableFocusSection(): [number, (newSection: number) => void] {
    const focusSection = useFocusSection();

    const dispatch = useAppDispatch();

    return [
        focusSection,
        (newSection: number) => dispatch(questionsActions.focusOnSection(newSection))
    ]
}

// DOCS METADATAS
// ==========
export function useEditableTitle(): [string, (newTitle: string) => void] {
    const docID = usePathDocID();
    const title = useTitle();
    
    const dispatch = useAppDispatch();

    return [
        title,
        (newTitle: string) => dispatch(docsMetadatasActions.setTitle({
            docID,
            title: newTitle
        }))
    ];
}

export function useSaveTitle() {
    const userID = useUserID();
    const docID = usePathDocID();
    const title = useTitle();

    const dispatch = useAppDispatch();
    const saveCallback = useCallback(async () => {
        try {
            dispatch(docsMetadatasActions.setSavingStatus("saving"));
            const lastSaved = Timestamp.now();

            const docMetadataRef = doc(db, "users", userID, "docsMetadatas", docID);
            await updateDoc(docMetadataRef, {
                title,
                lastSaved
            });

            dispatch(docsMetadatasActions.setLastSaved({
                docID,
                lastSaved: lastSaved.toJSON()
            }));
            dispatch(docsMetadatasActions.setSavingStatus("saved"));
        } catch (err) {
            const error = err as Error;

            dispatch(docsMetadatasActions.setSavingStatus("failed"));
            dispatch(docsMetadatasActions.setError(error.message));
        }
    }, [userID, docID, title]);
    const saveTitle = useSave(saveCallback);

    return saveTitle;
}