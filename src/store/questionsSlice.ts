import { QuestionIDsMap, QuestionType, QuestionsMap } from "@/db/schemas"
import { ResourceStatus, SavingStatus } from "./types"
import { createSlice } from "@reduxjs/toolkit";
import { QuestionID } from "@/types";

export type QuestionsState = {
    map: QuestionsMap,
    IDs: string[][],
    loadingStatus: ResourceStatus,
    generatingStatus: ResourceStatus,
    savingStatus: SavingStatus,
    error: string,
    focusSection: number
}

const initialState: QuestionsState = {
    map: {},
    IDs: [],
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
            type Payload = {
                map: QuestionsMap,
                IDs: QuestionIDsMap,
            }
            const { map, IDs } = action.payload as Payload;

            state.map = map;
            // converts the IDs map of arrays to a nested array
            state.IDs = Object.values(IDs);
        },
        scaffoldSections: (state, action) => {
            const numSections = action.payload as number;

            state.IDs = [];
            for (let i = 0; i < numSections; i++) {
                state.IDs.push([]);
            }
        },
        add: (state, action) => {
            type Payload = {
                questionIndex?: number,
                sectionIndex: number,
                ID: string,
                type: QuestionType,
                question?: string,
                replace?: boolean
            }
            const { questionIndex, sectionIndex, ID, type, question, replace } = action.payload as Payload;

            state.map[ID] = {
                question: question || "",
                type,
                answer: ""
            }

            if (sectionIndex < 0 || sectionIndex >= state.IDs.length) return state;

            if (typeof questionIndex === "number") {
                if (replace) {
                    state.IDs[sectionIndex][questionIndex] = ID;
                } else {
                    state.IDs[sectionIndex].splice(questionIndex, 0, ID);
                }
            } else {
                state.IDs[sectionIndex].push(ID);
            }
        },
        setQuestion: (state, action) => {
            type Payload = {
                ID: string,
                question?: string,
                answer?: string,
                type?: QuestionType
            }
            const { ID, question, answer, type } = action.payload as Payload;

            if (typeof question === "string") {
                state.map[ID].question = question;
            }
            if (typeof answer === "string") {
                state.map[ID].answer = answer;
            }
            if (type) {
                state.map[ID].type = type;
            }
            
        },
        delete:(state, action) => {
            type Payload = {
                sectionIndex?: number,
                ID: string
            }

            const { sectionIndex, ID } = action.payload as Payload;

            if (state.map.hasOwnProperty(ID)) {
                delete state.map[ID];
            }

            if (typeof sectionIndex === "number") {
                if (sectionIndex > 0 && sectionIndex < state.IDs.length) {
                    state.IDs[sectionIndex] = state.IDs[sectionIndex].filter(
                        questionID => questionID !== ID
                    )
                }
            } else {
                state.IDs = state.IDs.map(sectionIDs =>
                    sectionIDs.filter(questionID => questionID !== ID)
                );
            }
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