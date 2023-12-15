"use client"

import store from "@/store";
import { LayoutProps } from "@/types";
import { Provider } from "react-redux";

export default function ReduxProvider({ children }: LayoutProps) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}