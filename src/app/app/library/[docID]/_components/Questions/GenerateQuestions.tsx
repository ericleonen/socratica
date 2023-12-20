import { MIN_SECTION_LENGTH } from "@/config"
import PrimaryButton from "@/theme/PrimaryButton"
import Icon from "@/theme/Icon"
import { LoadingFour, Magic } from "@icon-park/react"
import { useGenerateQuestions } from "@/db/docs/create"
import { useQuestionsStatus, useText } from "@/db/docs/read"

export default function GenerateQuestions() {
    const status = useQuestionsStatus();
    const disabled = useText().join("").length < MIN_SECTION_LENGTH;

    const generate = useGenerateQuestions();

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <p className="mb-3 text-slate-700/70 text-center font-medium">You don't have any questions yet</p>
            <PrimaryButton 
                disabled={disabled}
                onClick={generate}
            >{
                status === "loading" ? <>
                    <Icon type={LoadingFour} className="mr-3 animate-spin" />
                    Reading the text
                </> : <>
                    <Icon type={Magic} className="mr-3" />
                    Generate questions
                </>
            }</PrimaryButton>
        </div>
    );
}