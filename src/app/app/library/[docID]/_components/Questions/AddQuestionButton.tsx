import { useAddQuestion } from "@/db/docs/create"
import SecondaryButton from "@/theme/SecondaryButton"
import React from "react"

type AddQuestionButtonProps = {
    sectionIndex: number,
    questionIndex?: number,
    className?: string
    hidden?: boolean,
    children: React.ReactNode
}

export default function AddQuestionButton({ sectionIndex, questionIndex, className, hidden, children }: AddQuestionButtonProps) {
    const addQuestion = useAddQuestion(sectionIndex, questionIndex);
    
    return (
        <SecondaryButton
            onClick={addQuestion}
            size="sm"
            className={`w-full justify-center font-bold shrink-0 transition-opacity delay-75 ${hidden && "opacity-20 hover:opacity-100"} ${className || ""}`}
        >
            {children}
        </SecondaryButton>
    )
}