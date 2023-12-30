import { auth } from "@/firebase";
import { useAppDispatch, RootState } from "@/store";
import { ResourceStatus, SavingStatus } from "@/store/types";
import { fetchUser } from "@/store/userSlice";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";

/**
 * Hook that loads a user into the store from Firestore
 */
export function useLoadUser() {
    const [authUser, authLoading, authError] = useAuthState(auth);
    const dispatch = useAppDispatch();
    const status = useUserLoadingStatus();

    useEffect(() => {
        if (!authUser || authLoading || authError) return;

        if (status === "idle") {
            dispatch(fetchUser(authUser.uid));
        }

    }, [status, authUser, authLoading, authError]);
}

export function useUserLoadingStatus() {
    const status = useSelector<RootState, ResourceStatus>(
        state => state.user.loadingStatus
    );

    return status;
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

export function useUserEmail() {
    const email = useSelector<RootState, string>(
        state => state.user.email
    );

    return email;
}

export function useUserName() {
    const name = useSelector<RootState, string>(
        state => state.user.name
    );

    return name;
}

export function useUserSavingStatus() {
    const status = useSelector<RootState, SavingStatus>(
        state => state.user.savingStatus
    );

    return status;
}