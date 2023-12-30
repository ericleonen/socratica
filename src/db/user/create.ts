import { INITIAL_TOKENS } from "@/auth/config";
import { db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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