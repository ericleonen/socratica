import { GoogleAuthProvider, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import firebase from "firebase/compat/app";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function signUpWithEmailAndPassword(email: string, password: string) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await setDoc(doc(db, "users", user.uid), {
            authProvider: "local",
            email
        });

        return null;
    } catch (error) {
        const signUpError = error as firebase.auth.Error;
        return signUpError.message;
    }
}

export async function logInWithEmailAndPassword(email: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        const logInError = error as firebase.auth.Error;
        return logInError.message;
    }
}

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;

        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
            await setDoc(userDocRef, {
                authProvider: "google",
                email: user.email
            });
        }
    } catch (error) {
        const signInError = error as firebase.auth.Error;
        console.log(signInError.message);
        return signInError.message;
    }
}

export function useAutoLogin(router: AppRouterInstance, authUser: User | null | undefined, authError: Error | undefined) {
    useEffect(() => {
        if (authUser && authError === null) {
            router.push("/app");
        }
    }, [authUser, authError]);
}