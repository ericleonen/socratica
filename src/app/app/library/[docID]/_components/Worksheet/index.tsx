import { Fragment, forwardRef } from "react"
import "./styles.css";
import { useQuestionIDs, useQuestions, useTitle } from "@/db/docs/read";
import TextDisplay from "../Document/TextDisplay";
import { questionTheme } from "@/theme/questions";

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
            {
                questionIDs.length > 0 &&
                <p className="text-4xl font-bold mb-6">
                    {title} <span className="text-slate-500">Questions</span>
                </p>
            }
            {
                questionIDs.map((sectionIDs, sectionIndex) =>
                    <Fragment key={`questionSection_${sectionIndex}`}>
                        <p className="font-bold w-full border-b-2 border-slate-300 mb-3 text-slate-500 tracking-wider text-sm break-after-avoid">SECTION {sectionIndex + 1}</p>
                        {
                            sectionIDs
                            .filter(ID => questions[ID].status === "ready")
                            .map((ID, questionIndex) => 
                                <div 
                                    key={ID}
                                    className="flex pb-32 break-inside-avoid-page"
                                >
                                    <div className="font-bold mr-1 text-slate-500">{sectionIndex + 1}.{questionIndex + 1}</div>
                                    <div>
                                        <span 
                                            className={`
                                                font-bold mr-1 uppercase text-sm tracking-wider
                                                ${questionTheme[questions[ID].type].print}
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