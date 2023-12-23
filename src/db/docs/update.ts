import { useAppDispatch } from "@/store";
import { useAnswer, useDocSavingStatus, useDocsMetadatasSavingStatus, useFocusSection, useQuestion, useQuestions, useQuestionsSavingStatus, useText, useTitle } from "./read";
import { docsMetadatasActions } from "@/store/docsMetadatasSlice";
import { usePathDocID } from "@/utils/routing";
import { useUserID } from "../user";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { AUTOSAVE_DELAY } from "@/config";
import { Trigger } from "@/types";
import { QuestionType, QuestionsMap } from "../schemas";
import { docActions } from "@/store/docSlice";
import { questionsActions } from "@/store/questionsSlice";

// DOCS
// ==========
export function useEditableText(): [string, (newText: string) => void] {
    const text = useText().join("");
    const dispatch = useAppDispatch();
    const hasQuestions = useQuestions().length > 0;

    return [
        text,
        (newText: string) => dispatch(docActions.setText([newText]))
    ]
}

export function useSaveText(): Trigger {
    const userID = useUserID();
    const docID = usePathDocID() as string;
    const text = useText();

    const dispatch = useAppDispatch();

    return async () => {
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
    }
}

export function useAutoSaveText(): Trigger {
    const savingStatus = useDocSavingStatus();
    const text = useText();
    
    const dispatch = useAppDispatch();
    const saveText = useSaveText();

    useEffect(() => {
        let countdown = -1;

        if (savingStatus === "unsaved") {
            countdown = window.setTimeout(saveText, AUTOSAVE_DELAY);
        }

        return () => clearTimeout(countdown);
    }, [text]);

    return () => { dispatch(docActions.setSavingStatus("unsaved")) };
}

// QUESTIONS
// ==========
export function useSaveQuestions(): Trigger {
    const userID = useUserID();
    const docID = usePathDocID() as string;
    const questions = useQuestions();

    const dispatch = useAppDispatch();

    const [canSave, setCanSave] = useState(false);

    useEffect(() => {
        if (!canSave) return;

        const save = async () => {
            try {
                dispatch(questionsActions.setSavingStatus("saving"));
                const lastSaved = Timestamp.now();

                const questionsMap: QuestionsMap = {};

                // mapify
                questions.forEach((section, sectionIndex) => {
                    questionsMap[sectionIndex] = {};

                    section.forEach((question, questionIndex) => {
                        questionsMap[sectionIndex][questionIndex] = question;
                    })
                });
    
                const docRef = doc(db, "users", userID, "docs", docID);
                await updateDoc(docRef, {
                    questions: questionsMap
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
        }
        save().then(() => {
            setCanSave(false);
        });
    }, [canSave]);

    return () => {
        setCanSave(true);
    };
}

export function useSaveQuestion(sectionIndex: number, questionIndex: number) {
    const userID = useUserID();
    const docID = usePathDocID() as string;

    const question = useQuestion(sectionIndex, questionIndex);

    const dispatch = useAppDispatch();

    return async () => {
        try {
            dispatch(questionsActions.setSavingStatus("saving"));
            const lastSaved = Timestamp.now();

            const docRef = doc(db, "users", userID, "docs", docID);
            await updateDoc(docRef, {
                [`questions.${sectionIndex}.${questionIndex}`]: question
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
    }
}

export function useAutoSaveAnswer(sectionIndex: number, questionIndex: number) {
    const savingStatus = useQuestionsSavingStatus();
    const answer = useAnswer(sectionIndex, questionIndex);
    
    const dispatch = useAppDispatch();
    const saveAnswer = useSaveQuestion(sectionIndex, questionIndex);

    useEffect(() => {
        let countdown = -1;

        if (savingStatus === "unsaved") {
            countdown = window.setTimeout(saveAnswer, AUTOSAVE_DELAY);
        }

        return () => clearTimeout(countdown);
    }, [answer]);

    return () => dispatch(questionsActions.setSavingStatus("unsaved"));
}

export function useEditableQuestionDraft(sectionIndex: number, questionIndex: number): [
    string, 
    QuestionType, 
    (newQuestion: string) => void, 
    (newType: QuestionType) => void,
    Trigger
] {
    const { question, type } = useQuestion(sectionIndex, questionIndex);
    const [questionDraft, setQuestionDraft] = useState(question);
    const [typeDraft, setTypeDraft] = useState(type);

    const dispatch = useAppDispatch();

    return [
        questionDraft,
        typeDraft,
        setQuestionDraft,
        setTypeDraft,
        () => {
            dispatch(questionsActions.setQuestion({
                sectionIndex,
                questionIndex,
                question: questionDraft,
                type: typeDraft
            }))
        }
    ]   
}

export function useEditableAnswer(sectionIndex: number, questionIndex: number):
    [string, (newAnswer: string) => void] 
{
    const answer = useAnswer(sectionIndex, questionIndex);
    
    const dispatch = useAppDispatch();

    const setAnswer = (newAnswer: string) => {
        dispatch(questionsActions.setAnswer({
            sectionIndex,
            questionIndex,
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
    const docID = usePathDocID() as string;
    const title = useTitle();

    const dispatch = useAppDispatch();

    return async () => {
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
    }
}

export function useAutoSaveTitle() {
    const savingStatus = useDocsMetadatasSavingStatus();
    
    const dispatch = useAppDispatch();
    const saveTitle = useSaveTitle();

    useEffect(() => {
        let countdown = -1;

        if (savingStatus === "unsaved") {
            countdown = window.setTimeout(saveTitle, AUTOSAVE_DELAY);
        }

        return () => clearTimeout(countdown);
    }, [saveTitle]);

    return () => dispatch(docsMetadatasActions.setSavingStatus("unsaved"));
}