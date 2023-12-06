import { User } from "@/db/schemas";
import { db } from "@/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { ResourceStatus } from "./types";

export type UserState = {
    name: string,
    ID: string,
    email: string,
    authProvider: string,
    tokens: number,
    status: ResourceStatus,
    error: string
}

const initialState: UserState = {
    name: "",
    ID: "",
    email: "",
    authProvider: "",
    tokens: 0,
    status: "idle",
    error: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                const { name, ID, email, authProvider, tokens } = action.payload as User;
                
                state.name = name;
                state.ID = ID;
                state.email = email;
                state.authProvider = authProvider;
                state.tokens = tokens;
                state.status = "succeeded";
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = "failed";
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

export default userSlice;