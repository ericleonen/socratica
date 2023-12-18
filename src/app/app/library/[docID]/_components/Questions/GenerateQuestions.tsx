import { RootState } from "@/store"
import { ResourceStatus } from "@/store/types"
import { useSelector } from "react-redux"
import { MIN_PARAGRAPH_LENGTH } from "@/config"
import PrimaryButton from "@/theme/PrimaryButton"
import Icon from "@/theme/Icon"
import { LoadingFour, Magic } from "@icon-park/react"
import { useGenerateQuestions } from "@/db/docs"

export default function GenerateQuestions() {
    const status = useSelector<RootState, ResourceStatus>(
        state => state.doc.questionsStatus
    );
    const disabled = useSelector<RootState, boolean>(
        state => state.doc.text.length < MIN_PARAGRAPH_LENGTH
    );

    const generate = useGenerateQuestions();

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <p className="mb-3 text-slate-700/70 text-center font-medium">You don't have any questions yet</p>
            <PrimaryButton onClick={generate}>{
                status === "loading" ? <>
                    <Icon type={LoadingFour} className="mr-3" />
                    Reading the text
                </> : <>
                    <Icon type={Magic} className="mr-3" />
                    Generate questions
                </>
            }</PrimaryButton>
        </div>
    );
}