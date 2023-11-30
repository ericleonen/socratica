import { createContext } from "react";

type CurrTitleState = {
    currTitle: string,
    setCurrTitle: (title: string) => void
}
const CurrTitleContext = createContext<CurrTitleState>({
    currTitle: "",
    setCurrTitle: () => {}
});

export default CurrTitleContext;