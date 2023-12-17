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
        <div className="p-16 overflow-y-scroll bg-yellow-50">
            <div className="flex flex-col w-[734.4px] h-[950.4px] mx-auto">
                <div className="flex-grow w-full p-[86.4px] border-[3px] border-b-[5px] rounded-xl bg-white border-slate-700">
                    <TitleField />
                    { questions ? <TextDisplay /> : <TextField /> }
                </div>
            </div>
        </div>
    )
}