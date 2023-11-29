import { GoogleAuthProvider, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import firebase from "firebase/compat/app";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { initializeUserDoc } from "./store";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export async function signUpWithEmailAndPassword(email: string, password: string) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        initializeUserDoc(user.uid, email, "local");

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
        
        initializeUserDoc(user.uid, user.email, "google");

    } catch (error) {
        const signInError = error as firebase.auth.Error;
        console.log(signInError.message);
        return signInError.message;
    }
}

export function useAutoLogin() {
    const router = useRouter();
    const [authUser, authLoading, authError] = useAuthState(auth);

    useEffect(() => {
        if (authUser && authError === undefined) {
            router.push("/app");
        }
    }, [authUser, authError]);
}