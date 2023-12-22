import { createSlice } from "@reduxjs/toolkit";
import { ResourceStatus, SavingStatus } from "./types"
import { sentencify } from "@/utils/format";

export type DocState = {
    text: string[],
    loadingStatus: ResourceStatus,
    savingStatus: SavingStatus,
    error: string,
    threateningDelete: boolean
}

const initialState: DocState = {
    text: [],
    loadingStatus: "idle",
    savingStatus: "saved",
    error: "",
    threateningDelete: false
};

const docSlice = createSlice({
    name: "doc",
    initialState,
    reducers: {
        clear: () => ({...initialState}),
        setText: (state, action) => {
            state.text = action.payload as string[];
        },
        sectionifyText: (state, action) => {
            type Payload = [number, number][];

            const intervals = action.payload as Payload;
            const sentences = sentencify(state.text.join(""));

            console.log(intervals)
            
            state.text = intervals.map(interval =>
                sentences.slice(interval[0], interval[1]).join("")
            );
        },
        setLoadingStatus: (state, action) => {
            state.loadingStatus = action.payload as ResourceStatus;
        },
        setSavingStatus: (state, action) => {
            state.savingStatus = action.payload as SavingStatus
        },
        setError: (state, action) => {
            state.error = action.payload as string;
        }
    }
});

export const docActions = docSlice.actions;

export default docSlice;