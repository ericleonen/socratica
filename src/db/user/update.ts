import { useAppDispatch } from "@/store";
import { useUserName } from "./read";
import { userActions } from "@/store/userSlice";

export function useEditableUserName(): [
    string, (newName: string) => void
] {
    const name = useUserName();
    
    const dispatch = useAppDispatch();

    return [
        name,
        (newName: string) => dispatch(userActions.setName(newName))
    ]
}