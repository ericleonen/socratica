import { Timestamp } from "firebase/firestore"

// users/{userID}
export type User = {
    name: string,
    ID: string
    email: string,
    authProvider: string
}

// users/{userID}/docs/{docID}
export type Doc = {
    text: string[],
    questionIDs: string[][],
    questions: QuestionsMap<Question>
}

/**
 * Map of question ID to its data
 */
export type QuestionsMap<T> = {
    [ID: string]: T
}

/**
 * Type of question data
 */
export type Question = {
    question: string,
    answer: string,
    type: QuestionType,
    status: QuestionStatus
}

export type ReadyQuestion = {
    question: string,
    answer: string,
    type: QuestionType
}

/**
 * Possible question types
 */
export type QuestionType = "comprehension" | "research" | "big idea";

/**
 * Possible question statuses (not included in Firestore)
 */
export type QuestionStatus = "deleting" | "adding" | "ready" | "generating";

/**
 * Type of questionIDs field in Firestore
 */
export type QuestionIDsMap = {
    [index: number]: string[]
};

// users/{userID}/docsMetadatas/{docID}
export type DocMetadata = {
    title: string,
    lastSaved: Timestamp
}