import { useContext } from "react"
import Question from "./Question"
import { WidthStateContext } from "./DimensionsContext"
import Icon from "@/theme/Icon"
import { LoadingFour } from "@icon-park/react"
import { Transition } from "@headlessui/react"
import { useQuestionsGeneratingStatus } from "@/db/docs/read"
import AddQuestionButton from "./AddQuestionButton"
import EmptySection from "./EmptySection"
import { useAppDispatch } from "@/store"
import { questionsActions } from "@/store/questionsSlice"

type QuestionsSectionsProps = {
    sectionIDs: string[],
    focus: boolean,
    sectionIndex: number
}

export default function QuestionsSection({ sectionIDs, focus, sectionIndex }: QuestionsSectionsProps) {
    const { width } = useContext(WidthStateContext);
    const generatingStatus = useQuestionsGeneratingStatus();

    const dispatch = useAppDispatch();

    const removeNonReady = () => {
        dispatch(questionsActions.removeNonReady(sectionIndex));
    }
    
    return (
        <div
            style={{ width: `${width}px` }}
            className="px-3"
        >
            <Transition
                show={focus}
                leave="delay-150"
                afterLeave={removeNonReady}
                className="w-full flex flex-col items-center pb-6"
            >{
                sectionIDs.length === 0 ? (
                    <div className="text-slate-500 flex flex-col items-center">{
                        generatingStatus === "loading" ? <>
                            <Icon type={LoadingFour} className="animate-spin mr-2" />
                            <p className="font-medium">Section loading</p>
                        </> :
                        <EmptySection {...{sectionIndex}} />
                    }</div>
                ) : 
                <>
                    {
                        sectionIDs.map((ID, questionIndex) => 
                            <Question
                                key={ID}
                                {...{ID, sectionIndex, questionIndex}}
                            />
                        )
                    }
                    <AddQuestionButton
                        {...{sectionIndex}}
                        hidden
                        className="text-lg"
                    >
                        +
                    </AddQuestionButton>
                </>
            }</Transition>
        </div>
    )
}