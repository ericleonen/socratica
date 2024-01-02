import { User } from "@/db/schemas";
import { db } from "@/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { ResourceStatus, SavingStatus } from "./types";

export type UserState = {
    name: string,
    ID: string,
    email: string,
    authProvider: string,
    loadingStatus: ResourceStatus,
    error: string,
    savingStatus: SavingStatus
}

const initialState: UserState = {
    name: "",
    ID: "",
    email: "",
    authProvider: "",
    loadingStatus: "idle",
    error: "",
    savingStatus: "saved"
    
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload as string;
        },
        setSavingStatus: (state, action) => {
            state.savingStatus = action.payload as SavingStatus;
        },
        setError: (state, action) => {
            state.error = action.payload as string;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loadingStatus = "loading";
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                const { name, ID, email, authProvider } = action.payload as User;
                
                state.name = name;
                state.ID = ID;
                state.email = email;
                state.authProvider = authProvider;
                state.loadingStatus = "succeeded";
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loadingStatus = "failed";
                state.error = action.error.message as string;
            })
    }
});

export const fetchUser = createAsyncThunk(
    "users/fetchUser",
    async (userID: string) => {
        const userRef = doc(db, "users", userID);
        const userSnap = await getDoc(userRef);

        return userSnap.data();
    }
);

export const userActions = userSlice.actions;

export default userSlice;