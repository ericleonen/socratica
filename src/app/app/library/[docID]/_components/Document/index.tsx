import { useSelector } from "react-redux";
import TextField from "./TextField";
import TitleField from "./TitleField";
import { RootState } from "@/store";
import TextDisplay from "./TextDisplay";


export default function Document() {
    const questions = useSelector<RootState, boolean>(
        state => state.doc.questions.length > 0
    );

    return (
        <div className="flex flex-col px-16 overflow-y-scroll relative">
            <div className="flex-grow mt-16 w-[720px] border-2 border-slate-300 border-b-0 shadow-md rounded-t-md bg-theme-white-lighter p-24 pb-6">
                <TitleField />
                { questions ? <TextDisplay /> : <TextField /> }
            </div>
        </div>
    )
}