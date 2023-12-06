import { DocMetadata } from "@/db/schemas"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Timestamp, collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase"
import { ResourceStatus } from "./types"

export type DocMetadataMap = {
    [docID: string]: DocMetadata
}

export type DocsMetadatasState = {
    map: DocMetadataMap,
    status: ResourceStatus,
    error: string
}

const initialState: DocsMetadatasState = {
    map: {},
    status: "idle",
    error: ""
}

const docsMetadatasSlice = createSlice({
    name: "docsMetadatas",
    initialState,
    reducers: {
        updateTitle: (state, action) => {
            type Payload = { 
                docID: string, 
                title: string
            }
            const { docID, title } = action.payload as Payload;

            if (state.map.hasOwnProperty(docID)) {
                state.map[docID].title = title;
            }
        },
        updateLastSaved: (state, action) => {
            type Payload = {
                docID: string,
                lastSaved: Timestamp
            }
            const { docID, lastSaved } = action.payload as Payload;

            if (state.map.hasOwnProperty(docID)) {
                state.map[docID].lastSaved = lastSaved;
            }
        },
        addMetadata: (state, action) => {
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
        removeMetadata: (state, action) => {
            const key = action.payload as string;

            if (state.map.hasOwnProperty(key)) {
                delete state.map[key];
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDocsMetadatas.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDocsMetadatas.fulfilled, (state, action) => {
                state.map = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchDocsMetadatas.rejected, (state, action) => {
                state.status = "failed";
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

export const { 
    updateTitle, 
    updateLastSaved,
    addMetadata, 
    removeMetadata
} = docsMetadatasSlice.actions;

export default docsMetadatasSlice;