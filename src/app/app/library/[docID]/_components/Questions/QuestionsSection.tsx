import { useContext } from "react"
import Question from "./Question"
import { HeightStateContext, WidthStateContext } from "./DimensionsContext"
import Icon from "@/theme/Icon"
import { LoadingFour } from "@icon-park/react"

type QuestionsSectionsProps = {
    sectionIDs: string[],
    focus: boolean
}

export default function QuestionsSection({ sectionIDs, focus }: QuestionsSectionsProps) {
    const { width } = useContext(WidthStateContext);
    
    return (
        <div
            style={{ width: `${width}px` }}
            className="px-3 h-full"
        >{
            sectionIDs.length === 0 ? (
                <div className="flex items-center text-slate-500 justify-center">
                    <Icon type={LoadingFour} className="animate-spin mr-2" />
                    <p className="font-medium">Section loading</p>
                </div>
            ) : 
            sectionIDs.map((ID, questionIndex) => 
                <Question
                    key={ID}
                    {...{ID}}
                    isBottom={focus && questionIndex === sectionIDs.length - 1}
                />
            )
        }</div>
    )
}