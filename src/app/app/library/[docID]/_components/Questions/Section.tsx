import { useQuestions } from "@/db/docs/read"
import Question from "./Question";
import { Transition } from "@headlessui/react";
import { Division } from "@icon-park/react";

type Section = {
    section: number
}

export default function Section({ section }: Section) {
    const questions = useQuestions()[section];

    return (
        <div className="px-4">{
            questions.map((_, index) =>
                <Question 
                    key={`question_${index}`}
                    {...{section, index}}
                />
            )
        }</div>
    )
}