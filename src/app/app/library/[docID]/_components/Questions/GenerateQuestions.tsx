import { RootState } from "@/store"
import { ResourceStatus } from "@/store/types"
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline"
import { SparklesIcon } from "@heroicons/react/24/solid"
import { useSelector } from "react-redux"
import { LayoutType } from "@/types"
import { MIN_PARAGRAPH_LENGTH } from "@/app/api/questions/config"
import TooltipProvider from "@/components/TooltipProvider"

type GenerateQuestionsProps = {
    onClick: () => void
}

const Container = ({ children }: LayoutType) => <div className="flex justify-center items-center flex-col h-full w-full">{children}</div>

export default function GenerateQuestions({ onClick }: GenerateQuestionsProps) {
    const status = useSelector<RootState, ResourceStatus>(
        state => state.doc.questionsStatus
    );
    const disabled = useSelector<RootState, boolean>(
        state => state.doc.text.length < MIN_PARAGRAPH_LENGTH
    )

    return status === "idle" ? (
        <Container>
            <p className="text-slate-400">You don't have any questions yet</p>
            <TooltipProvider
                disabled={!disabled}
                className="mt-2 whitespace-pre-wrap left-0"
                text={`Text is too short (must be at least ${MIN_PARAGRAPH_LENGTH} characters)`}
            >
                <button
                    disabled={disabled}
                    onClick={onClick} 
                    className="transition-colors mt-3 flex items-center rounded-md text-theme-white py-2 pl-3 pr-5 bg-slate-900/90 shadow-md hover:bg-slate-800/80 font-medium disabled:bg-gray-500 disabled:hover:cursor-not-allowed"
                >
                    <SparklesIcon className="h-5 w-5 mr-2"/>
                    Generate questions
                </button>
            </TooltipProvider>
        </Container>
    ) : (
        <Container>
            <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-slate-400 animate-bounce"/>
            <p className="text-slate-400 mt-3">Pondering</p>
        </Container>
    )
}