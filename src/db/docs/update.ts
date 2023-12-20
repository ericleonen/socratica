import { RootState, useAppDispatch } from "@/store";
import { useQuestions, useQuestionsStatus, useSavingStatus, useText, useTitle } from "./read";
import { updateError, updateQuestion, updateQuestionAnswer, updateSavingStatus, updateText } from "@/store/docSlice";
import { useSelector } from "react-redux";
import { updateLastSaved, updateTitle } from "@/store/docsMetadatasSlice";
import { usePathDocID } from "@/utils/routing";
import { useUserID } from "../user";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { AUTOSAVE_DELAY } from "@/config";
import { Trigger } from "@/types";
import { Question, QuestionType } from "../schemas";

/**
 * If no questions have been generated, is a hook that provides the current text and a text setter.
 * If questions have been generated, is a hook that provides the joined text sections and a useless
 * text setter (it doesn't do anything)
 * @returns a text string and a (possibly useless) text setter
 */
export function useEditableText(): [string, (newText: string) => void] {
    const text = useText();
    const dispatch = useAppDispatch();
    const hasQuestions = useSelector<RootState, boolean>(
        state => state.doc.questions.length > 0
    );

    if (!hasQuestions) {
        return [
            text[0],
            (newText: string) => dispatch(updateText(newText))
        ]
    } else {
        return [text.join(""), (newText: string) => {}];
    }
}

/**
 * Hook that provides the current title and a title setter
 * @returns a title string and a title setter
 */
export function useEditableTitle(): [string, (newTitle: string) => void] {
    const docID = usePathDocID();
    const title = useTitle();
    
    const dispatch = useAppDispatch();

    return [
        title,
        (newTitle: string) => dispatch(updateTitle({
            docID,
            title: newTitle
        }))
    ];
}

/**
 * Hook that provides the current question, the type, a non-saving question setter, a non-saving
 * type setter, a question resetter, and a trigger to save the question
 * @param section 
 * @param index 
 * @returns a question string, a QuestionType, a question setter, a type setter and Triggers
 *          for reverting and saving
 */
export function useEditableQuestion(section: number, index: number): [
    string,
    QuestionType,
    (question: string) => void,
    (type: QuestionType) => void,
    Trigger,
    Trigger
] {
    const currQuestion = useQuestions()[section][index];

    const saveDoc = useSaveDoc();
    const dispatch = useAppDispatch();

    const [question, setQuestion] = useState(currQuestion.question);
    const [type, setType] = useState<QuestionType>(currQuestion.type);

    const revertQuestion = () => {
        setQuestion(currQuestion.question);
        setType(currQuestion.type);
    };

    const saveQuestion = () => {
        dispatch(updateQuestion({
            type,
            question,
            section,
            index
        }));
        saveDoc();
    }

    return [question, type, setQuestion, setType, revertQuestion, saveQuestion];
}

/**
 * Hook that provides the current question's answer and an answer setter
 * @param section 
 * @param index 
 * @returns an answer string and setter
 */
export function useEditableAnswer(section: number, index: number):
    [string, (newAnswer: string) => void] 
{
    const answer = useQuestions()[section][index].answer;
    
    const dispatch = useAppDispatch();

    const setAnswer = (newAnswer: string) => {
        dispatch(updateQuestionAnswer({
            section,
            index,
            answer: newAnswer
        }));
    };

    return [answer, setAnswer];
}

/**
 * Hook that provides a trigger to save the current doc
 * @returns a Trigger that saves the current doc
 */
export function useSaveDoc() {
    const userID = useUserID();
    const docID = usePathDocID() as string;
    const title = useTitle();
    const text = useText();
    const questions = useQuestions();
    
    const dispatch = useAppDispatch();

    return async () => {
        try {
            dispatch(updateSavingStatus("saving"));
            const lastSaved = Timestamp.now();

            const docRef = doc(db, "users", userID, "docs", docID);
            await setDoc(docRef, {
                text, 
                questions: {...questions}
            });

            const docMetadataRef = doc(db, "users", userID, "docsMetadatas", docID);
            await setDoc(docMetadataRef, {
                title,
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
 * Hook that provides a trigger to automatically save the current doc whenever a dependency changes
 * @param dependency the string value in the doc that, when altered triggers the save
 * @returns a trigger that allows saves to happen
 */
export function useAutoSaveDoc(dependency: string) {
    const savingStatus = useSavingStatus();
    const questionsStatus = useQuestionsStatus();

    const saveDoc = useSaveDoc();
    const dispatch = useAppDispatch();

    useEffect(() => {
        let countdown = -1;

        if (savingStatus === "unsaved" && ["idle", "succeeded"].includes(questionsStatus)) {
            countdown = window.setTimeout(saveDoc, AUTOSAVE_DELAY);
        }

        return () => clearTimeout(countdown);
    }, [dependency]);

    return async () => {
        dispatch(updateSavingStatus("unsaved"));
    }
}