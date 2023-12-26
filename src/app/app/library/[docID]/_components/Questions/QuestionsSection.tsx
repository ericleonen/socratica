import { useContext } from "react"
import Question from "./Question"
import { WidthStateContext } from "./DimensionsContext"
import Icon from "@/theme/Icon"
import { LoadingFour } from "@icon-park/react"
import { Transition } from "@headlessui/react"
import { useQuestionsGeneratingStatus } from "@/db/docs/read"

type QuestionsSectionsProps = {
    sectionIDs: string[],
    focus: boolean
}

export default function QuestionsSection({ sectionIDs, focus }: QuestionsSectionsProps) {
    const { width } = useContext(WidthStateContext);
    const generatingStatus = useQuestionsGeneratingStatus();
    
    return (
        <div
            style={{ width: `${width}px` }}
            className="px-3"
        >
            <Transition
                show={focus}
                leave="delay-150"
            >{
            sectionIDs.length === 0 ? (
                <div className="flex items-center text-slate-500 justify-center">{
                    generatingStatus === "loading" ? <>
                        <Icon type={LoadingFour} className="animate-spin mr-2" />
                        <p className="font-medium">Section loading</p>
                    </> : (
                        <p className="font-medium">This section is empty</p>
                    )
                }</div>
            ) : 
            sectionIDs.map(ID => 
                <Question
                    key={ID}
                    {...{ID}}
                />
            )
            }</Transition>
        </div>
    )
}