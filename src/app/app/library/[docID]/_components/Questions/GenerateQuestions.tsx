import PrimaryButton from "@/theme/PrimaryButton"
import Icon from "@/theme/Icon"
import { LoadingFour, Magic } from "@icon-park/react"
import { useGenerateQuestions } from "@/db/docs/create"
import { useQuestionsGeneratingStatus, useText } from "@/db/docs/read"
import TooltipProvider from "@/components/TooltipProvider"
import { useLocalStorage } from "@/utils/localStorage"
import { words2Chars } from "@/utils/format"
import { useContext } from "react"
import { modalContexts } from "@/app/app/_components/modals/ModalProviders"

export default function GenerateQuestions() {
    const status = useQuestionsGeneratingStatus();
    const MIN_SECTION_LENGTH = useLocalStorage("sectionSize", words2Chars(100))[0];
    const disabled = useText().join("").length < MIN_SECTION_LENGTH;

    const { open } = useContext(modalContexts["spend"]);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center px-3">
            <p className="mb-3 text-slate-400 dark:text-slate-600 text-center font-medium">You don't have any questions yet</p>
            <TooltipProvider
                text={
                    disabled ? 
                    "Text is too short. Add more" : 
                    "Do not close the document while generating"
                }
                containerClassName="w-2/3"
                className="left-1/2 translate-x-[-50%] translate-y-2"
            >
                <button
                    disabled={disabled}
                    onClick={open}  
                    className="disabled:bg-gray-200 disabled:text-slate-500 disabled:dark:bg-white/5 bg-amber-300 dark:bg-amber-300/10 hover:bg-amber-400 focus-visible:bg-amber-400 dark:focus-visible:bg-amber-300/20 dark:hover:bg-amber-300/20 text-slate-700 dark:text-amber-300 w-full justify-center font-bold px-3 py-2 flex items-center rounded focus:outline-none"  
                >{
                    status === "loading" ? <>
                        <Icon type={LoadingFour} className="mr-3 animate-spin text-lg" />
                        Reading your text
                    </> : <>
                        <Icon type={Magic} className="mr-3 text-lg" />
                        Generate questions
                    </>
                }</button>
            </TooltipProvider>
        </div>
    );
}