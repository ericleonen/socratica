import { Question, QuestionType, QuestionsMap } from "@/db/schemas"
import { ResourceStatus, SavingStatus } from "./types"
import { createSlice } from "@reduxjs/toolkit";

export type QuestionsState = {
    data: Question[][],
    loadingStatus: ResourceStatus,
    generatingStatus: ResourceStatus,
    savingStatus: SavingStatus,
    error: string,
    focusSection: number
}

const initialState: QuestionsState = {
    data: [],
    loadingStatus: "idle",
    generatingStatus: "idle",
    savingStatus: "saved",
    error: "",
    focusSection: 0
};

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        clear: () => ({...initialState}),
        setQuestions: (state, action) => {
            const map = action.payload as QuestionsMap;

            state.data = Object.values(map).map(
                section => Object.values(section)
            );
        },
        scaffoldSections: (state, action) => {
            const numSections = action.payload as number;

            state.data = [];
            for (let i = 0; i < numSections; i++) {
                state.data.push([]);
            }
        },
        scaffoldQuestions: (state, action) => {
            type Payload = {
                sectionIndex: number,
                numQuestions: number
            }
            const { sectionIndex, numQuestions } = action.payload as Payload;

            for (let i = 0; i < numQuestions; i++) {
                state.data[sectionIndex].push({
                    type: "loading",
                    question: "",
                    answer: ""
                });
            }
        },
        setQuestion: (state, action) => {
            type Payload = {
                sectionIndex: number,
                questionIndex: number,
                question: string,
                type: QuestionType
            }
            const { sectionIndex, questionIndex, question, type } = action.payload as Payload;

            state.data[sectionIndex][questionIndex].question = question;
            state.data[sectionIndex][questionIndex].type = type;
        },
        setAnswer: (state, action) => {
            type Payload = {
                sectionIndex: number,
                questionIndex: number,
                answer: string
            }
            const { sectionIndex, questionIndex, answer } = action.payload as Payload;

            state.data[sectionIndex][questionIndex].answer = answer;
        },
        setLoadingStatus: (state, action) => {
            state.loadingStatus = action.payload as ResourceStatus;
        },
        setGeneratingStatus: (state, action) => {
            state.generatingStatus = action.payload as ResourceStatus;
        },
        setSavingStatus: (state, action) => {
            state.savingStatus = action.payload as SavingStatus;
        },
        setError: (state, action) => {
            state.error = action.payload as string;
        },
        focusOnSection: (state, action) => {
            const sectionIndex = action.payload as number;

            state.focusSection = sectionIndex;
        }
    }
});

export const questionsActions = questionsSlice.actions;

export default questionsSlice;