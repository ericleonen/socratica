import { QuestionIDsMap, QuestionType, QuestionsMap, QuestionStatus, Question } from "@/db/schemas"
import { ResourceStatus, SavingStatus } from "./types"
import { createSlice } from "@reduxjs/toolkit";

export type QuestionsState = {
    map: QuestionsMap<Question>,
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
                map: QuestionsMap<Question>,
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
                // where to put it?
                sectionIndex: number,
                questionIndex?: number,
                // new info
                ID: string,
                status?: QuestionStatus,
                question?: string,
                type?: QuestionType
            }

            const {
                sectionIndex, questionIndex,
                ID, status, question, type
            } = action.payload as Payload;

            // add to map
            state.map[ID] = {
                question: question || "",
                answer: "",
                type: type || "comprehension",
                status: status || "adding"
            };

            // add to IDs matrix
            if (typeof questionIndex === "number") {
                // insert
                state.IDs[sectionIndex].splice(questionIndex, 0, ID);
            } else {
                // add to end
                state.IDs[sectionIndex].push(ID);
            }
        },
        setQuestionStatus: (state, action) => {
            type Payload = {
                ID: string,
                status: QuestionStatus
            }
            const { ID, status } = action.payload as Payload;

            state.map[ID].status = status;
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

            delete state.map[ID];

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
        },
        removeNonReady: (state, action) => {
            const sectionIndex = action.payload as number;

            state.IDs[sectionIndex] = state.IDs[sectionIndex].filter(ID => {
                if (state.map[ID].status !== "ready") {
                    delete state.map[ID];
                    return false;
                }

                return true;
            })
        }
    }
});

export const questionsActions = questionsSlice.actions;

export default questionsSlice;