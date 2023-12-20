import TextField from "./TextField";
import TitleField from "./TitleField";
import TextDisplay from "./TextDisplay";
import { PAPER_DIMS, PAPER_MARGINS } from "@/config";
import { useQuestions } from "@/db/docs/read";

const { height, width } = PAPER_DIMS;
const margins = PAPER_MARGINS

export default function Document() {
    const hasQuestions = useQuestions().length > 0;

    return (
        <div className="overflow-y-scroll flex-grow py-16 relative">
            <div 
                style={{ 
                    minHeight: `${height}px`, 
                    width: `${width}px`,
                    padding: `${margins}px`
                }}
                className="h-auto border-2 border-b-4 rounded-md border-slate-700 bg-white mx-auto"
            >
                <TitleField />
                { hasQuestions ? <TextDisplay /> : <TextField /> }
            </div>
        </div>
    )
}