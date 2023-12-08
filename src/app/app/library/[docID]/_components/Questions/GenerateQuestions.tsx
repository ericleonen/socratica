import { LightBulbIcon } from "@heroicons/react/24/outline"

type GenerateQuestionsProps = {
    onClick: () => void
}

export default function GenerateQuestions({ onClick }: GenerateQuestionsProps) {
    return (
        <div className="flex justify-center items-center flex-col h-full w-full">
            <p className="text-black/50">You don't have any questions yet</p>
            <button
                onClick={onClick} 
                className="mt-3 flex items-center rounded-md text-theme-white py-2 pl-3 pr-5 bg-slate-900/90 shadow-md hover:bg-slate-800/80 font-medium"
            >
                <LightBulbIcon className="h-5 w-5 mr-2"/>
                Generate questions
            </button>
        </div>
    )
}