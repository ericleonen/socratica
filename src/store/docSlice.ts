import { Doc, Question } from "@/db/schemas"
import { ResourceStatus, SavingStatus, UserDocID } from "./types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from "@/firebase"
import { doc, getDoc } from "firebase/firestore"
import axios from "axios"

export type DocState = {
    text: string,
    questions: Question[],
    status: ResourceStatus,
    error: string,
    savingStatus: SavingStatus,
    generateQuestionsStatus: ResourceStatus,
    focusQuestion: number
}

const initialState: DocState = {
    text: "",
    questions: [],
    status: "idle",
    error: "",
    savingStatus: "saved",
    generateQuestionsStatus: "idle",
    focusQuestion: -1
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
        clearDoc: () => initialState,
        focusOnQuestion: (state, action) => {
            state.focusQuestion = action.payload as number;
        },
        blurQuestionFocus: (state) => { state.focusQuestion = -1 },
        updateQuestionAnswer: (state, action) => {
            type Payload = {
                answer: string,
                index: number
            };

            const { answer, index } = action.payload as Payload;

            state.questions[index].answer = answer;
        }
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
            .addCase(generateQuestions.pending, (state) => {
                state.generateQuestionsStatus = "loading";
            })
            .addCase(generateQuestions.fulfilled, (state, action) => {
                const questions = action.payload as Question[];

                state.questions = questions;
                state.generateQuestionsStatus = "idle";
            })
            .addCase(generateQuestions.rejected, (state, action) => {
                state.generateQuestionsStatus = "failed";
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

export const generateQuestions = createAsyncThunk(
    "doc/generateQuestions",
    async (text: string) => {
        const questionsRes = await axios.post("/api/questions", { text }); 
        const { questions } = questionsRes.data;

        return questions;
    }
)

export const { 
    updateText, 
    updateSavingStatus,
    updateError,
    clearDoc,
    focusOnQuestion,
    blurQuestionFocus,
    updateQuestionAnswer
} = docSlice.actions;

export default docSlice;