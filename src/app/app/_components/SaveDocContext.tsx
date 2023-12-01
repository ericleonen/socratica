import { createContext } from "react";

const SaveDocContext = createContext<() => void>(() => {});

export default SaveDocContext;