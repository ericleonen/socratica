import { createContext } from "react";

type WidthState = {
    width: number,
    setWidth: React.Dispatch<React.SetStateAction<number>>
}
export const WidthStateContext = createContext<WidthState>({} as WidthState);