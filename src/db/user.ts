import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { INITIAL_TOKENS } from "@/auth/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { ResourceStatus } from "@/store/types";
import { fetchUser } from "@/store/userSlice";

/**
 * Initializes user data in Firestore. If the user already has their data initialized, does nothing
 * @param name user's name
 * @param userID user's unique Firestore-generated ID
 * @param email user's email
 * @param authProvider user's authentication provider
 * @return a Promise that resolves to undefined for a success and an Error for a failure
 */
export async function initializeUser(
    name: string, userID: string, email: string, authProvider: string
) {
    try {
        const userRef = doc(db, "users", userID);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                name,
                ID: userID,
                email,
                authProvider,
                tokens: INITIAL_TOKENS
            });
        } else if (authProvider !== "google") {
            throw new Error("User already exists");
        }
    } catch (err) {
        return err as Error;
    }
}

/**
 * Hook that loads a user into the store from Firestore
 */
export function useUser() {
    const [authUser, authLoading, authError] = useAuthState(auth);
    const dispatch = useAppDispatch();
    const userStatus = useSelector<RootState, ResourceStatus>(state => state.user.status);

    useEffect(() => {
        if (!authUser || authLoading || authError) return;

        if (userStatus === "idle") {
            dispatch(fetchUser(authUser.uid));
        }

    }, [userStatus, authUser, authLoading, authError]);
}

/**
 * Hook that provides the user's ID
 * @returns the current userID string
 */
export function useUserID() {
    const userID = useSelector<RootState, string>(
        state => state.user.ID
    );

    return userID;
}

/**
 * Hook that provides the status of the user's info
 * @returns a ResourceStatus of the user's info
 */
export function useUserStatus() {
    const status = useSelector<RootState, ResourceStatus>(
        state => state.user.status
    );

    return status;
}