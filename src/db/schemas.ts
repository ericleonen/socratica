import { Timestamp } from "firebase/firestore"

// users/{userID}
export type User = {
    name: string,
    ID: string
    email: string,
    authProvider: string,
    tokens: number
}

// users/{userID}/docs/{docID}
export type Doc = {
    text: string,
    questions: Question[]
}

export type Question = {
    question: string,
    answer: string
}

// users/{userID}/docsMetadatas/{docID}
export type DocMetadata = {
    title: string,
    lastSaved: Timestamp
}