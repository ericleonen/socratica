import PrimaryButton from "@/theme/PrimaryButton"
import Icon from "@/theme/Icon"
import { LoadingFour, Magic } from "@icon-park/react"
import { useGenerateQuestions } from "@/db/docs/create"
import { useQuestionsGeneratingStatus, useText } from "@/db/docs/read"
import TooltipProvider from "@/components/TooltipProvider"
import { useLocalStorage } from "@/utils/localStorage"
import { words2Chars } from "@/utils/format"

export default function GenerateQuestions() {
    const status = useQuestionsGeneratingStatus();
    const MIN_SECTION_LENGTH = useLocalStorage("sectionSize", words2Chars(100))[0];
    const disabled = useText().join("").length < MIN_SECTION_LENGTH;

    const generate = useGenerateQuestions();

    return (
        <div className="h-full w-full flex flex-col items-center justify-center px-3">
            <p className="mb-3 text-slate-500 text-center font-medium">You don't have any questions yet</p>
            <TooltipProvider
                text={
                    disabled ? 
                    "Text is too short. Add more" : 
                    "Do not close the document while generating"
                }
                containerClassName="w-2/3"
                className="left-1/2 translate-x-[-50%] translate-y-2"
            >
                <PrimaryButton 
                    disabled={disabled}
                    onClick={generate}
                    className="justify-center w-full"
                >{
                    status === "loading" ? <>
                        <Icon type={LoadingFour} className="mr-3 animate-spin" />
                        Reading your text
                    </> : <>
                        <Icon type={Magic} className="mr-3" />
                        Generate questions
                    </>
                }</PrimaryButton>
            </TooltipProvider>
        </div>
    );
}