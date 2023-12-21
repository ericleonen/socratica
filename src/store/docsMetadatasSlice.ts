import { DocMetadata } from "@/db/schemas"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Timestamp, collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase"
import { ResourceStatus, SavingStatus } from "./types"

export type DocMetadataMap = {
    [docID: string]: DocMetadata
}

export type DocsMetadatasState = {
    map: DocMetadataMap,
    loadingStatus: ResourceStatus,
    savingStatus: SavingStatus,
    error: string
}

const initialState: DocsMetadatasState = {
    map: {},
    loadingStatus: "idle",
    savingStatus: "saved",
    error: ""
}

const docsMetadatasSlice = createSlice({
    name: "docsMetadatas",
    initialState,
    reducers: {
        setTitle: (state, action) => {
            type Payload = { 
                docID: string, 
                title: string
            }
            const { docID, title } = action.payload as Payload;

            if (state.map.hasOwnProperty(docID)) {
                state.map[docID].title = title;
            }
        },
        add: (state, action) => {
            type Payload = {
                docID: string,
                title: string,
                lastSaved: Timestamp
            }
            const { docID, title, lastSaved } = action.payload as Payload;

            state.map[docID] = {
                title,
                lastSaved
            };
        },
        remove: (state, action) => {
            const key = action.payload as string;

            if (state.map.hasOwnProperty(key)) {
                delete state.map[key];
            }
        },
        setSavingStatus: (state, action) => {
            state.savingStatus = action.payload as SavingStatus;
        },
        setLastSaved: (state, action) => {
            type Payload = {
                docID: string,
                lastSaved: Timestamp
            }
            const { docID, lastSaved } = action.payload as Payload;

            if (state.map.hasOwnProperty(docID)) {
                state.map[docID].lastSaved = lastSaved;
            }
        },
        setError: (state, action) => {
            state.error = action.payload as string;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDocsMetadatas.pending, (state) => {
                state.loadingStatus = "loading";
            })
            .addCase(fetchDocsMetadatas.fulfilled, (state, action) => {
                state.map = action.payload;
                state.loadingStatus = "succeeded";
            })
            .addCase(fetchDocsMetadatas.rejected, (state, action) => {
                state.loadingStatus = "failed";
                state.error = action.error.message as string;
            })
    }
});

export const fetchDocsMetadatas = createAsyncThunk(
    "docsMetadatas/fetchDocsMetadatas",
    async (userID: string) => {
        const docsMetadatasRef = collection(db, "users", userID, "docsMetadatas");
        const docsMetadatasSnap = await getDocs(docsMetadatasRef);
        const docsMetadatas: DocMetadataMap = {};

        docsMetadatasSnap.forEach((docMetadata) => {
            const { title, lastSaved } = docMetadata.data() as DocMetadata;

            docsMetadatas[docMetadata.id] = {
                title,
                lastSaved: lastSaved.toJSON() as Timestamp
            };
        });

        return docsMetadatas;
    }
);

export const docsMetadatasActions = docsMetadatasSlice.actions;

export default docsMetadatasSlice;