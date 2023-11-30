import { UserDataType } from "@/utils/store";
import { createContext } from "react";

export const nullUserData: UserDataType = {
    authProvider: null,
    email: null,
    documents: null,
    tokens: null
}

const UserDataContext = createContext<UserDataType>(nullUserData);

type CurrTitleState = {
    currTitle: string,
    setCurrTitle: (title: string) => void
}

export const CurrTitleContext = createContext<CurrTitleState>({
    currTitle: "",
    setCurrTitle: () => {}
});

export default UserDataContext;
