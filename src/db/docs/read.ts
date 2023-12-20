"use client"

import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { useUserID } from "../user";
import { ResourceStatus, SavingStatus } from "@/store/types";
import { useEffect } from "react";
import { DocMetadataMap, fetchDocsMetadatas } from "@/store/docsMetadatasSlice";
import { usePathDocID } from "@/utils/routing";
import { fetchDoc } from "@/store/docSlice";
import { Question } from "../schemas";

/**
 * Hook that makes the current doc data accessible to the app
 */
export function useDoc() {
    const userID = useUserID();
    const docID = usePathDocID();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userID && docID) {
            dispatch(fetchDoc({
                userID,
                docID
            }));
        }
    }, [userID, docID]);
}

/**
 * Hook that provides the status of the current doc
 * @returns a ResourceStatus of the current doc
 */
export function useDocStatus() {
    const status = useSelector<RootState, ResourceStatus>(
        state => state.doc.status
    );

    return status;
}

/**
 * Hook that provides the current sectionified text
 */
export function useText() {
    const text = useSelector<RootState, string[]>(
        state => state.doc.text
    );

    return text;
}

export function useQuestions() {
    const questions = useSelector<RootState, Question[][]>(
        state => state.doc.questions
    );

    return questions;
}

/**
 * Hook that makes the user's docs metadatas accessible in the app
 */
export function useDocsMetadatas() {
    const userID = useUserID();
    const status = useDocsMetadatasStatus();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userID && status === "idle") {
            dispatch(fetchDocsMetadatas(userID));
        }
    }, [status, userID]);
}

/**
 * Hook that provides the doc metadatas
 * @returns the DocMetadataMap of the current user
 */
export function useDocsMetadatasMap() {
    const map = useSelector<RootState, DocMetadataMap>(
        state => state.docsMetadatas.map
    );

    return map;
}

/**
 * Hook that provides the user's docs metadatas' status
 * @returns a ResourceStatus of the docsMetadatas
 */
export function useDocsMetadatasStatus() {
    const status = useSelector<RootState, ResourceStatus>(
        state => state.docsMetadatas.status
    );

    return status;
}

/**
 * Hook that provides the current doc title or an empty string if there is no valid current
 * docID
 * @returns a title string
 */
export function useTitle() {
    const docID = usePathDocID() as string;
    const title = useSelector<RootState, string>(
        state => state.docsMetadatas.map.hasOwnProperty(docID) ?
        state.docsMetadatas.map[docID].title :
        ""
    );

    return title;
}

/**
 * Hook that provides the saving status of the current doc
 * @returns a SavingStatus of the current doc
 */
export function useSavingStatus() {
    const status = useSelector<RootState, SavingStatus>(
        state => state.doc.savingStatus
    );

    return status;
}

/**
 * Hook that provides the generation status of the doc's questions
 * @returns a ResourceStatus of the current doc's questions (when generating)
 */
export function useQuestionsStatus() {
    const status = useSelector<RootState, ResourceStatus>(
        state => state.doc.questionsStatus
    );

    return status;
}

export function useFocusSection() {
    const section = useSelector<RootState, number>(
        state => state.doc.focusSection
    );

    return section;
}