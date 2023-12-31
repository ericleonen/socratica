import Skeleton from "@/components/Skeleton";
import { useDocLoadingStatus } from "@/db/docs/read";
import { useAutoSave, useSaveText, useEditableText } from "@/db/docs/update";
import { autoResize, handleChange } from "@/utils/input";

export default function TextField() {
    const [text, setText] = useEditableText();
    const status = useDocLoadingStatus();

    const saveText = useSaveText();
    const allowSaves = useAutoSave(saveText, text);

    return status === "succeeded" ? (
        <textarea
            ref={elem => autoResize(elem)}
            value={text}
            onChange={(e) => {
                handleChange(setText)(e);
                allowSaves();
            }}
            placeholder="Paste some interesting text here..."
            className="placeholder:text-slate-400 placeholder:dark:text-slate-600 h-min mt-6 w-full resize-none bg-transparent focus:outline-none text-slate-700 dark:text-slate-300"
        />
    ) : (
        <Skeleton className="mt-6 w-full">Loading...</Skeleton>
    )
}