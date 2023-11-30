import TextField from "./TextField";
import TitleField from "./TitleField";

type DocumentProps = {
    text: string,
    setText: (text: string) => void
}

export default function Document({ text, setText }: DocumentProps) {
    return (
        <div className="flex flex-col w-[720px] h-full mt-14">
            <div className="h-10" />
            <div className="w-full border-2 border-slate-300 border-b-0 flex-grow shadow-md rounded-t-md bg-theme-white-lighter p-24 pb-6">
                <TitleField />
                <TextField {...{text, setText}} />
            </div>
        </div>
    )
}