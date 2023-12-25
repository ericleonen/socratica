import TextField from "./TextField";
import TitleField from "./TitleField";
import TextDisplay from "./TextDisplay";
import { useHasQuestions } from "@/db/docs/read";

export default function Document() {
    const hasQuestions = useHasQuestions();

    return (
        <div className="overflow-y-scroll flex-grow p-24 relative">
            <TitleField />
            { hasQuestions ? <TextDisplay /> : <TextField /> }
        </div>
    )
}