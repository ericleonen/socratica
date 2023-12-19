import { Doc, Question, QuestionType } from "@/db/schemas"
import { ResourceStatus, SavingStatus, UserDocID } from "./types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from "@/firebase"
import { doc, getDoc } from "firebase/firestore"
import { sentencify } from "@/utils/format"

export type DocState = {
    text: string[],
    questions: Question[][],
    status: ResourceStatus,
    error: string,
    savingStatus: SavingStatus,
    questionsStatus: ResourceStatus,
    focusQuestion: number,
    threatenDelete: string
}

const initialState: DocState = {
    text: [""],
    questions: [],
    status: "idle",
    error: "",
    savingStatus: "saved",
    questionsStatus: "idle",
    focusQuestion: -1,
    threatenDelete: ""
}

const docSlice = createSlice({
    name: "doc",
    initialState,
    reducers: {
        updateText: (state, action) => {
            state.text[0] = action.payload as string;
        },
        sectionifyText: (state, action) => {
            type Payload = [number, number][];
            const sentences = sentencify(state.text[0]);
            state.text = [];

            (action.payload as Payload).forEach(interval => {
                state.text.push(sentences.slice(interval[0], interval[1] + 1).join(""));
            });
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
        addQuestionSections: (state, action) => {
            state.questions = Array.from(Array(action.payload as number)).map(
                () => []
            );
        },
        addQuestion: (state, action) => {
            type Payload = {
                section: number,
                questionData: {
                    type: QuestionType,
                    question: string,
                    answer: string
                }
            }

            const { section, questionData } = action.payload as Payload;

            state.questions[section].push(questionData);
        },
        updateQuestionAnswer: (state, action) => {
            type Payload = {
                answer: string,
                section: number
                index: number
            };

            const { answer, section, index } = action.payload as Payload;

            state.questions[section][index].answer = answer;
        },
        updateQuestionsStatus: (state, action) => {
            state.questionsStatus = action.payload as ResourceStatus;
        },
        updateThreatenDelete: (state, action) => {
            state.threatenDelete = action.payload as string;
        },
        updateQuestion: (state, action) => {
            type Payload = {
                question: string,
                section: number,
                index: number
            };

            const { question, section, index } = action.payload as Payload;

            state.questions[section][index].question = question;
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
    clearDoc,
    focusOnQuestion,
    blurQuestionFocus,
    updateQuestionAnswer,
    addQuestion,
    updateQuestionsStatus,
    updateThreatenDelete,
    updateQuestion,
    addQuestionSections,
    sectionifyText
} = docSlice.actions;

export default docSlice;