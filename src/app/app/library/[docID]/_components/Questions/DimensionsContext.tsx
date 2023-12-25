import { createContext, useContext } from "react";

type HeightState = {
    height: number,
    setHeight: React.Dispatch<React.SetStateAction<number>>
}

type WidthState = {
    width: number,
    setWidth: React.Dispatch<React.SetStateAction<number>>
}

export const HeightStateContext = createContext<HeightState>({} as HeightState);
export const WidthStateContext = createContext<WidthState>({} as WidthState);