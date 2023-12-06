import { Doc, Question } from "@/db/schemas"
import { ResourceStatus, SavingStatus, UserDocID } from "./types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from "@/firebase"
import { doc, getDoc } from "firebase/firestore"

export type DocState = {
    text: string,
    questions: Question[],
    status: ResourceStatus,
    error: string,
    savingStatus: SavingStatus
}

const initialState: DocState = {
    text: "",
    questions: [],
    status: "idle",
    error: "",
    savingStatus: "not ready"
}

const docSlice = createSlice({
    name: "doc",
    initialState,
    reducers: {
        updateText: (state, action) => {
            state.text = action.payload as string;
        },
        updateSavingStatus: (state, action) => {
            state.savingStatus = action.payload as SavingStatus;
        },
        updateError: (state, action) => {
            state.error = (action.payload as Error).message;
        },
        clearDoc: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoc.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDoc.fulfilled, (state, action) => {
                const { text, questions } = action.payload as Doc;

                state.text = text;
                state.questions = questions;
                state.status = "succeeded";
            })
            .addCase(fetchDoc.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message as string;
            })
    } 
});

export const fetchDoc = createAsyncThunk(
    "doc/fetchDoc",
    async ({ userID, docID }: UserDocID) => {
        const docRef = doc(db, "users", userID, "docs", docID);
        const docSnap = await getDoc(docRef);

        return docSnap.data();
    }
);

export const { 
    updateText, 
    updateSavingStatus,
    updateError,
    clearDoc
} = docSlice.actions;

export default docSlice;