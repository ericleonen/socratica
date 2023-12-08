import { useSelector } from "react-redux";
import GenerateQuestions from "./GenerateQuestions";
import Question from "./Question";
import axios from "axios";
import { RootState } from "@/store";
import { useState } from "react";

export default function Questions() {
    const text = useSelector<RootState, string>(
        state => state.doc.text
    );
    const [questions, setQuestions] = useState<string[]>([]);

    const generateQuestions = async () => {
        const result = await axios.post(
            "/api/questions",
            { text },
            {
                params: {
                    count: 10
                }
            }
        );

        console.log(result.data);

        setQuestions(result.data.questions);
    }

    return (
        <div className="flex-grow h-full px-10 shadow-2xl w-min py-16 overflow-y-scroll">
            {
                questions.length ? questions.map(
                    question => <Question question={question} />
                ) : (
                    <GenerateQuestions  onClick={generateQuestions} />
                )
            }
        </div>
    )
}