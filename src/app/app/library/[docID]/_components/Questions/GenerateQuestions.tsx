import { RootState } from "@/store"
import { ResourceStatus } from "@/store/types"
import { ChatBubbleLeftEllipsisIcon, LightBulbIcon } from "@heroicons/react/24/outline"
import { useSelector } from "react-redux"
import { LayoutType } from "@/types"

type GenerateQuestionsProps = {
    onClick: () => void
}

const Container = ({ children }: LayoutType) => <div className="flex justify-center items-center flex-col h-full w-full">{children}</div>

export default function GenerateQuestions({ onClick }: GenerateQuestionsProps) {
    const status = useSelector<RootState, ResourceStatus>(
        state => state.doc.generateQuestionsStatus
    );

    return status === "idle" ? (
        <Container>
            <p className="text-black/50">You don't have any questions yet</p>
            <button
                onClick={onClick} 
                className="mt-3 flex items-center rounded-md text-theme-white py-2 pl-3 pr-5 bg-slate-900/90 shadow-md hover:bg-slate-800/80 font-medium"
            >
                <LightBulbIcon className="h-5 w-5 mr-2"/>
                Generate questions
            </button>
        </Container>
    ) : (
        <Container>
            <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-black/50 animate-bounce"/>
            <p className="text-black/50 mt-3">Pondering</p>
        </Container>
    )
}