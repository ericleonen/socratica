import { Fragment, forwardRef } from "react"
import "./styles.css";
import { useQuestionIDs, useQuestions, useText, useTitle } from "@/db/docs/read";
import TextDisplay from "../Document/TextDisplay";


const Worksheet = forwardRef((props: any, ref: React.Ref<HTMLDivElement> | null) => {
    const title = useTitle();
    const questionIDs = useQuestionIDs();
    const questions = useQuestions();
    
    return (
        <div 
            ref={ref}
            className="block"
        >
            <p className="text-4xl font-bold">{title} <span className="text-slate-500">Reading</span></p>
            <TextDisplay forPrinting />
            <div className="page-break"/>
            <p className="text-4xl font-bold mb-6">{title} <span className="text-slate-500">Questions</span></p>
            {
                questionIDs.map((sectionIDs, sectionIndex) =>
                    <Fragment key={`questionSection_${sectionIndex}`}>
                        <p className="font-bold w-full border-b-2 border-slate-300 mb-3 text-slate-500 tracking-wider text-sm break-after-avoid">SECTION {sectionIndex + 1}</p>
                        {
                            sectionIDs.map((ID, questionIndex) => 
                                <div 
                                    key={ID}
                                    className="flex pb-32 break-inside-avoid-page"
                                >
                                    <div className="font-bold mr-1 text-slate-500">{sectionIndex + 1}.{questionIndex + 1}</div>
                                    <div>
                                        <span 
                                            className={`
                                                font-bold mr-1 uppercase text-sm tracking-wider
                                                ${
                                                    questions[ID].type === "comprehension" ? "bg-sky-200" :
                                                    questions[ID].type === "research"      ? "bg-emerald-200" :
                                                    questions[ID].type === "big idea"      && "bg-violet-200"
                                                }
                                            `}
                                        >
                                            {questions[ID].type}
                                        </span>
                                        {questions[ID].question}
                                    </div>
                                </div>
                            )
                        }
                    </Fragment>
                )
            }
        </div>
    )
})

export default Worksheet;