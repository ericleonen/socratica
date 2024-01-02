import { useAddQuestion } from "@/db/docs/create"
import Icon from "@/theme/Icon";
import PrimaryButton from "@/theme/PrimaryButton";
import { Plus } from "@icon-park/react";

type EmptySectionProps = {
    sectionIndex: number
}

export default function EmptySection({ sectionIndex }: EmptySectionProps) {
    const addQuestion = useAddQuestion(sectionIndex, 0);
    
    return (
        <div className="flex flex-col">
            <p className="text-slate-400 dark:text-slate-600 font-medium">It's pretty empty here...</p>
            <button
                onClick={addQuestion}  
                className="mt-3 bg-amber-300 dark:bg-amber-300/10 hover:bg-amber-400 focus-visible:bg-amber-400 dark:focus-visible:bg-amber-300/20 dark:hover:bg-amber-300/20 text-slate-700 dark:text-amber-300 w-full justify-center font-bold px-3 py-2 flex items-center rounded focus:outline-none"  
            >
                <Icon type={Plus} className="text-lg mr-2"/>
                Add a question
            </button>
        </div>
    )
}