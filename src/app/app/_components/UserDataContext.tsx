import { UserDataType } from "@/utils/store";
import { createContext } from "react";

export const nullUserData: UserDataType = {
    authProvider: null,
    email: null,
    documents: null,
    tokens: null
}

const UserDataContext = createContext<UserDataType>(nullUserData);

export default UserDataContext;
