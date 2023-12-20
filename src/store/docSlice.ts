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
    focusSection: number,
    threateningDelete: boolean
}

const initialState: DocState = {
    text: [""],
    questions: [],
    status: "idle",
    error: "",
    savingStatus: "saved",
    questionsStatus: "idle",
    focusSection: 0,
    threateningDelete: false
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
        clearDoc: () => ({...initialState}),
        addQuestionSections: (state, action) => {
            state.questions = Array.from(Array(action.payload as number)).map(
                () => []
            );
        },
        addQuestion: (state, action) => {
            type Payload = {
                section: number,
                questionData: Question
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
        updateThreateningDelete: (state, action) => {
            state.threateningDelete = action.payload as boolean;
        },
        updateQuestion: (state, action) => {
            type Payload = {
                question: string,
                section: number,
                index: number
            };

            const { question, section, index } = action.payload as Payload;

            state.questions[section][index].question = question;
        },
        updateFocusSection: (state, action) => {
            state.focusSection = action.payload as number;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoc.pending, () => {
                const newState = {...initialState};
                newState.status = "loading";
                
                return newState;
            })
            .addCase(fetchDoc.fulfilled, (state, action) => {
                const { text, questions } = action.payload as Doc;

                const newState = {...initialState};

                newState.text = text;
                newState.questions = Object.values(questions);
                newState.status = "succeeded";

                return newState;
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
    updateQuestionAnswer,
    addQuestion,
    updateQuestionsStatus,
    updateThreateningDelete,
    updateQuestion,
    addQuestionSections,
    sectionifyText,
    updateFocusSection
} = docSlice.actions;

export default docSlice;