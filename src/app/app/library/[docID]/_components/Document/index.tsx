import TextField from "./TextField";
import TitleField from "./TitleField";


export default function Document() {
    return (
        <div className="flex flex-col w-[720px] h-full">
            <div className="mt-10 w-full border-2 border-slate-300 border-b-0 flex-grow shadow-md rounded-t-md bg-theme-white-lighter p-24 pb-6">
                <TitleField />
                <TextField />
            </div>
        </div>
    )
}