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
    questions: QuestionsMap
}

/**
 * Map of question ID to its data
 */
export type QuestionsMap = {
    [ID: string]: Question
}

/**
 * Type of question data
 */
export type Question = {
    question: string,
    answer: string,
    type: QuestionType
}

/**
 * Possible question types
 */
export type QuestionType = "comprehension" | "research" | "big idea" | "loading" | "deleting";

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