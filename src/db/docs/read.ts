"use client"

import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { useUserID } from "../user/read";
import { ResourceStatus, SavingStatus } from "@/store/types";
import { useEffect } from "react";
import { DocMetadataMap, fetchDocsMetadatas } from "@/store/docsMetadatasSlice";
import { usePathDocID } from "@/utils/routing";
import { Question, QuestionStatus, QuestionType, QuestionsMap } from "../schemas";
import { db } from "@/firebase";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { docActions } from "@/store/docSlice";
import { questionsActions } from "@/store/questionsSlice";

// DOCS
// ==========
export function useLoadDoc() {
    const userID = useUserID();
    const docID = usePathDocID() as string;

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!userID || !docID) return;

        dispatch(docActions.clear());
        dispatch(questionsActions.clear());
        dispatch(docActions.setLoadingStatus("loading"));
        dispatch(questionsActions.setLoadingStatus("loading"));

        const docRef = doc(db, "users", userID, "docs", docID);
        getDoc(docRef)
            .then(docRes => {
                const data = docRes.data();
                if (data) {
                    dispatch(docActions.setText(data.text));

                    for (let ID in data.questions) {
                        data.questions[ID].status = "ready"
                    }

                    dispatch(questionsActions.setQuestions({
                        map: data.questions,
                        IDs: data.questionIDs
                    }));

                    dispatch(docActions.setLoadingStatus("succeeded"));
                    dispatch(questionsActions.setLoadingStatus("succeeded"));
                } else {
                    throw new Error("Document doesn't exist");
                }
            })
            .catch((err: Error) => {
                dispatch(docActions.setLoadingStatus("failed"));
                dispatch(questionsActions.setLoadingStatus("failed"));
                dispatch(docActions.setError(err.message));
            })
    }, [userID, docID]);
}

export function useDocLoadingStatus() {
    const status = useSelector<RootState, ResourceStatus>(
        state => state.doc.loadingStatus
    );

    return status;
}

export function useText() {
    const text = useSelector<RootState, string[]>(
        state => state.doc.text
    );

    return text;
}

export function useDocSavingStatus() {
    const status = useSelector<RootState, SavingStatus>(
        state => state.doc.savingStatus
    );

    return status;
}

// QUESTIONS
// ==========
export function useQuestionIDs() {
    const questions = useSelector<RootState, string[][]>(
        state => state.questions.IDs
    );

    return questions;
}

export function useQuestions() {
    const questions = useSelector<RootState, QuestionsMap<Question>>(
        state => state.questions.map
    );

    return questions;
}

export function useHasQuestions() {
    const hasQuestions = useSelector<RootState, boolean>(
        state => state.questions.IDs.length > 0
    );

    return hasQuestions;
}

export function useQuestionsGeneratingStatus() {
    const status = useSelector<RootState, ResourceStatus>(
        state => state.questions.generatingStatus
    )

    return status;
}

export function useQuestionsSavingStatus() {
    const status = useSelector<RootState, SavingStatus>(
        state => state.questions.savingStatus
    )

    return status;
}

export function useFocusSection() {
    const section = useSelector<RootState, number>(
        state => state.questions.focusSection
    );

    return section;
}

export function useQuestion(ID: string) {
    const question = useSelector<RootState, Question>(
        state => state.questions.map[ID]
    );

    return question;
}

export function useQuestionType(ID: string) {
    const type = useSelector<RootState, QuestionType>(
        state => state.questions.map[ID].type
    );

    return type;
}

export function useAnswer(ID: string) {
    const answer = useSelector<RootState, string>(
        state => state.questions.map[ID].answer
    );

    return answer;
}

export function useNumQuestions() {
    const numQuestions = useSelector<RootState, number>(
        state => state.questions.IDs.flat().length
    );

    return numQuestions;
}

export function useQuestionStatus(ID: string) {
    const status = useSelector<RootState, QuestionStatus>(
        state => state.questions.map[ID].status
    );

    return status;
}

// DOCS METADATAS
// ==========
export function useLoadDocsMetadatas() {
    const userID = useUserID();
    const status = useDocsMetadatasLoadingStatus();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userID && status === "idle") {
            dispatch(fetchDocsMetadatas(userID));
        }
    }, [status, userID]);
}

export function useDocsMetadatas() {
    const map = useSelector<RootState, DocMetadataMap>(
        state => state.docsMetadatas.map
    );

    return map;
}

export function useDocsMetadatasLoadingStatus() {
    const status = useSelector<RootState, ResourceStatus>(
        state => state.docsMetadatas.loadingStatus
    );

    return status;
}

export function useDocsMetadatasSavingStatus() {
    const status = useSelector<RootState, SavingStatus>(
        state => state.docsMetadatas.savingStatus
    );

    return status;
}

export function useTitle() {
    const docID = usePathDocID() as string;
    const title = useSelector<RootState, string>(
        state => state.docsMetadatas.map.hasOwnProperty(docID) ?
        state.docsMetadatas.map[docID].title :
        ""
    );

    return title;
}

export function useLastSaved() {
    const docID = usePathDocID() as string;
    const lastSaved = useSelector<RootState, Timestamp | undefined>(
        state => state.docsMetadatas.map.hasOwnProperty(docID) ?
        state.docsMetadatas.map[docID].lastSaved :
        undefined
    );

    return lastSaved;
}