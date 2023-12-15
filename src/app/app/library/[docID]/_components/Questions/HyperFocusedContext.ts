import { useAppDispatch } from "@/store";
import { blurQuestionFocus, focusOnQuestion } from "@/store/docSlice";
import { Trigger } from "@/types";
import { createContext, useContext } from "react";

export const HyperFocusedContext = createContext<[boolean, (hyperFocused: boolean) => void]>(
    [false, (hyperFocused: boolean) => {}]
);

export function useHyperFocus(index: number): [Trigger, Trigger] {
    const setHyperFocused = useContext(HyperFocusedContext)[1];
    const dispatch = useAppDispatch();

    const hyperFocus = () => {
        dispatch(focusOnQuestion(index));
        setHyperFocused(true);
    };

    const hyperBlur = () => {
        dispatch(blurQuestionFocus());
        setHyperFocused(false);
    }

    return [hyperFocus, hyperBlur];
}   

export function useFocus(index: number): [Trigger, Trigger] {
    const hyperFocused = useContext(HyperFocusedContext)[0];
    const dispatch = useAppDispatch();

    const focus = () => {
        if (hyperFocused) return;
        dispatch(focusOnQuestion(index));
    }

    const blur = () => {
        if (hyperFocused) return;
        dispatch(blurQuestionFocus());
    }

    return [focus, blur];
}