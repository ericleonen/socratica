import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import docSlice from "./docSlice";
import docsMetadatasSlice from "./docsMetadatasSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        doc: docSlice.reducer,
        docsMetadatas: docsMetadatasSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;