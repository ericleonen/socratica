import { createContext } from "react";

type LibraryContext = {
    query: string
}

const LibraryContext = createContext<LibraryContext>({
    query: ""
});

export default LibraryContext;