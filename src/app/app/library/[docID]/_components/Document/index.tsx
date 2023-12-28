import TextField from "./TextField";
import TitleField from "./TitleField";
import TextDisplay from "./TextDisplay";
import { useHasQuestions } from "@/db/docs/read";
import { useLocalStorage } from "@/utils/localStorage";
import { in2Px } from "@/utils/format";

export default function Document() {
    const hasQuestions = useHasQuestions();
    const margins = useLocalStorage("margins", in2Px(1))[0];

    return (
        <div 
            style={{ padding: `${margins}px` }}
            className="transition-[padding] overflow-y-scroll flex-grow relative"
        >
            <TitleField />
            { hasQuestions ? <TextDisplay /> : <TextField /> }
        </div>
    )
}