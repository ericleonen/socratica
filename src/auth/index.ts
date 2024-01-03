import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { initializeUser } from "../db/user/create";
import { MIN_PASSWORD_LENGTH } from "./config";
import { GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import { Trigger } from "@/types";
import { useAppDispatch } from "@/store";
import { docActions } from "@/store/docSlice";
import { userActions } from "@/store/userSlice";
import { questionsActions } from "@/store/questionsSlice";
import { docsMetadatasActions } from "@/store/docsMetadatasSlice";

/**
 * Signs up a user locally, checking that no fields are empty and the password is proper
 * @param name user's name
 * @param email user's email address
 * @param password user's account password
 * @returns a Promise that resolves to undefined for a successful sign-up, otherwise an Error
 */
export async function signUpLocally(
    name: string, email: string, password: string, confirmPassword: string
) {
    try {
        if (name.length === 0) {
            throw new Error("Name field is empty");
        } else if (email.length === 0) {
            throw new Error("Email field is empty");
        } else if (password.length < MIN_PASSWORD_LENGTH) {
            throw new Error(
                `Password is too short. Must be at least ${MIN_PASSWORD_LENGTH} characters`
            );
        } else if (password != confirmPassword) {
            throw new Error("Passwords do not match");
        }

        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        const err = await initializeUser(name, user.uid, email, "local");
        if (err) throw err;
    } catch (err) {
        return err as Error;
    }
}

/**
 * Logs in a user locally
 * @param email user's email address
 * @param password user's account password
 * @returns a Promise that resolves to undefined for a successful sign in, an Error otherwise
 */
export async function logInLocally(email: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        return err as Error;
    }
}

const googleProvider = new GoogleAuthProvider();

/**
 * Signs in a user via Google. 
 * @returns a Promise that resolves to undefined for a successful Google sign in, an 
 *          Error otherwise
 */
export async function signInWithGoogle() {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;

        const name = user.displayName ? user.displayName : "Mystery Philosopher";
        const email = user.email ? user.email : "no.email@mail.com";

        const err = await initializeUser(name, user.uid, email, "google");
        if (err) throw err;
    } catch (err) {
        return (err as Error);
    }
}

export function useGoogleAuth(): [
    boolean, Trigger, Error | undefined
] {
    const [signingIn, setSigningIn] = useState(false);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        if (error) {
            console.error(error);
            setSigningIn(false);
        }
    }, [error]);

    return [
        signingIn,
        async () => {
            setSigningIn(true);

            const error = await signInWithGoogle();
            setError(error);
        },
        error
    ]
}

/**
 * Hook that automatically takes the user to the /app route if they are already logged in
 */
export function useAutoLogIn() {
    const router = useRouter();
    const [authUser, authLoading, authError] = useAuthState(auth);

    useEffect(() => {
        if (authUser && !authLoading && !authError) {
            router.push("/app");
        }
    }, [authUser, authLoading, authError]);
}

export function useAutoLogOut() {
    const router = useRouter();
    const authUser = useAuthState(auth)[0];

    useEffect(() => {
        if (!authUser) {
            router.push("/");
        }
    }, [authUser]);
}

export function useSignUp(
    name: string, email: string, password: string, confirmPassword: string
): [
    boolean, (e: React.FormEvent) => void, Error | undefined
] {
    const [signingUp, setSigningUp] = useState(false);
    const [error, setError] = useState<Error>();

    return [
        signingUp,
        async (e: React.FormEvent) => {
            e.preventDefault();

            setSigningUp(true);
            const error = await signUpLocally(name, email, password, confirmPassword);

            if (error) {
                setSigningUp(false);
                setError(error);
            }
        },
        error
    ]
}

/**
 * Hook that logs a user in
 * @param email 
 * @param password 
 * @returns a boolean representing the logging-in state, a login form submit handler, and, if
 *          there is an error, an Error object, otherwise undefined
 */
export function useLogIn(email: string, password: string): [
    boolean, (e: React.FormEvent) => void, Error | undefined
] {
    const [loggingIn, setLoggingIn] = useState(false);
    const [error, setError] = useState<Error>();

    return [
        loggingIn,
        async (e: React.FormEvent) => {
            e.preventDefault();

            setLoggingIn(true);
            const error = await logInLocally(email, password);

            if (error) {
                setLoggingIn(false);
                setError(error);
            }
        },
        error
    ]
}

export function useLogOut(): [
    boolean, Trigger
] {
    const [loggingOut, setLoggingOut] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    return [
        loggingOut,
        async () => {
            setLoggingOut(true);
            await signOut(auth);

            router.push("/");

            dispatch(docActions.clear());
            dispatch(questionsActions.clear());
            dispatch(userActions.clear());
            dispatch(docsMetadatasActions.clear());
        }
    ]
}