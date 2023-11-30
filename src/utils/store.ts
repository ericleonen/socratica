import { addDoc, arrayUnion, collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import { usePathname } from "next/navigation";

export async function initializeUserDoc(userID: string, email: string | null, authProvider: string) {
    const userDocRef = doc(db, "users", userID);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
        await setDoc(userDocRef, {
            authProvider,
            email,
            documents: [],
            tokens: 0
        });
    }
}

export type DocumentMetadataType = {
    id: string,
    title: string
}

export type UserDataType = {
    authProvider: string | null,
    email: string | null,
    documents: DocumentMetadataType[] | null,
    tokens: number | null
}

export function useUserData() {
    const [authUser, authLoading, authError] = useAuthState(auth);
    const [userData, setUserData] = useState<UserDataType>();

    useEffect(() => {
        if (!authUser) return;

        const unsubscribe = onSnapshot(
            doc(db, "users", authUser.uid),
            (snapshot) => {
                setUserData(snapshot.data() as UserDataType);
            }
        );

        return unsubscribe;
    }, [authUser]);

    return userData;
}

export async function createNewDocument(authUser: User) {
    const newDocRef = await addDoc(collection(db, "docs", authUser.uid, "userDocs"), {
        text: "",
        questions: []
    });

    await updateDoc(doc(db, "users", authUser.uid), {
        documents: arrayUnion({
            id: newDocRef.id,
            title: ""
        })
    });

    return newDocRef.id;
}

export function getPathDocID(path: string) {
    const segments = path.split("/");

    if (segments.length >= 4) {
        return segments[3];
    } else {
        return null;
    }
}

export async function getDocument(userID: string, docID: string) {
    const docRef = doc(db, "docs", userID, "userDocs", docID)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as Document;
    } else {
        return null;
    }
}

type Question = {
    question: string,
    answer: string
}

type Document = {
    text: string,
    questions: Question[]
}

export function useLoadDocument() {
    const [authUser, authLoading, authError] = useAuthState(auth);
    const docID = getPathDocID(usePathname());

    const [text, setText] = useState("");
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        if (!authUser || !docID) return;

        getDocument(authUser.uid, docID)
            .then(docData => {
                if (docData) {
                    setText(docData.text);
                    setQuestions(docData.questions);
                }
            })
    }, [authUser, docID]);

    return {text, setText, questions, setQuestions};
}

export async function saveDocument(userID: string, docID: string, { text, questions }: Document) {
    await updateDoc(doc(db, "docs", userID, "userDocs", docID), {
        text,
        questions
    });
}

export async function saveDocumentMetadata(
    userID: string, docID: string, 
    title: string, documents: DocumentMetadataType[]
) {
    const i = documents.findIndex(({ id }) => docID === id);

    if (i >= 0) {
        documents[i]["title"] = title;
        await updateDoc(doc(db, "users", userID), {
            documents
        });
    }
}


export function useAutoSaveDocument({ text, questions }: Document, title: string, documents: DocumentMetadataType[] | null) {
    const [authUser, authLoading, authError] = useAuthState(auth);
    const docID = getPathDocID(usePathname());

    useEffect(() => {
        if (!authUser || !docID || !documents) return;

        const timer = setTimeout(() => {
            saveDocument(authUser.uid, docID, { text, questions });
            saveDocumentMetadata(authUser.uid, docID, title, documents)
            console.log("saved!");
        }, 10000);

        return () => clearTimeout(timer);
    }, [text, questions, title]);
}