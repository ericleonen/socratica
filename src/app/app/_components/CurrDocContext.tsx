import { Question } from "@/utils/store";
import { createContext } from "react";

export type CurrDocState = [
    [string | null, (text: string) => void],
    [Question[] | null, (questions: Question[]) => void]
]

const CurrDocContext = createContext<CurrDocState>([
    [null, () => {}],
    [null, () => {}]
]);

export default CurrDocContext;
