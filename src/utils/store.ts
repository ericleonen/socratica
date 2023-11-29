import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

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

type UserDataType = {
    authProvider: string,
    email: string,
    documents: DocumentMetadataType[],
    tokens: number
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