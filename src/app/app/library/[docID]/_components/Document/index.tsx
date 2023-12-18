import { useSelector } from "react-redux";
import TextField from "./TextField";
import TitleField from "./TitleField";
import { RootState } from "@/store";
import TextDisplay from "./TextDisplay";
import { MIN_PAPER_DIMS } from "@/config";

const { height, width } = MIN_PAPER_DIMS;

export default function Document() {
    const questions = useSelector<RootState, boolean>(
        state => state.doc.questions.length > 0
    );

    return (
        <div className="overflow-y-scroll flex-grow py-16">
            <div 
                style={{ minHeight: `${height}px`, width: `${width}px` }}
                className="h-auto p-24 border-2 border-b-4 rounded-md border-slate-700 bg-white mx-auto"
            >
                <TitleField />
                { questions ? <TextDisplay /> : <TextField /> }
            </div>
        </div>
    )
}