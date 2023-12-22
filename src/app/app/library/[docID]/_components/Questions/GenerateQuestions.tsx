import { MIN_SECTION_LENGTH } from "@/config"
import PrimaryButton from "@/theme/PrimaryButton"
import Icon from "@/theme/Icon"
import { LoadingFour, Magic } from "@icon-park/react"
import { useGenerateQuestions } from "@/db/docs/create"
import { useQuestionsGeneratingStatus, useText } from "@/db/docs/read"
import TooltipProvider from "@/components/TooltipProvider"

export default function GenerateQuestions() {
    const status = useQuestionsGeneratingStatus();
    const disabled = useText().join("").length < MIN_SECTION_LENGTH;

    const generate = useGenerateQuestions();

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <p className="mb-3 text-slate-500 text-center font-medium">You don't have any questions yet</p>
            <TooltipProvider
                disabled={!disabled} 
                text="Text is too short. Add more"
                className="left-1/2 translate-x-[-50%] translate-y-1"
            >
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
            </TooltipProvider>
        </div>
    );
}