"use client"

import store from "@/store";
import { LayoutType } from "@/types";
import { Provider } from "react-redux";

export default function ReduxProvider({ children }: LayoutType) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}