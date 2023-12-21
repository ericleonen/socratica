import { useQuestions } from "@/db/docs/read"
import Question from "./Question";

type Section = {
    sectionIndex: number
}

export default function Section({ sectionIndex }: Section) {
    const questions = useQuestions()[sectionIndex];

    return (
        <div className="px-4">{
            questions.map((_, questionIndex) =>
                <Question 
                    key={`question_${questionIndex}`}
                    {...{sectionIndex, questionIndex}}
                />
            )
        }</div>
    )
}