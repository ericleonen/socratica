import { useAddQuestion } from "@/db/docs/create"
import PrimaryButton from "@/theme/PrimaryButton";

type EmptySectionProps = {
    sectionIndex: number
}

export default function EmptySection({ sectionIndex }: EmptySectionProps) {
    const addQuestion = useAddQuestion(sectionIndex, 0);
    
    return (
        <div className="flex flex-col">
            <p className="text-slate-500 font-medium">It's pretty empty here...</p>
            <PrimaryButton
                onClick={addQuestion}
                className="mt-3 justify-center"
            >
                <span className="mr-2">+</span>
                Add a question
            </PrimaryButton>
        </div>
    )
}