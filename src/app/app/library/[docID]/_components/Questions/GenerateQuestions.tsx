import { RootState } from "@/store"
import { ResourceStatus } from "@/store/types"
import { useSelector } from "react-redux"
import { LayoutProps } from "@/types"
import { MIN_PARAGRAPH_LENGTH } from "@/config"
import TooltipProvider from "@/components/TooltipProvider"
import PrimaryButton from "@/theme/PrimaryButton"
import Icon from "@/theme/Icon"
import { LoadingFour, Magic } from "@icon-park/react"
import { useGenerateQuestions } from "@/db/docs"

type GenerateQuestionsProps = {
    onClick: () => void
}

const Container = ({ children }: LayoutProps) => <div className="flex justify-center items-center flex-col h-full w-full">{children}</div>;

export default function GenerateQuestions({ onClick }: GenerateQuestionsProps) {
    const status = useSelector<RootState, ResourceStatus>(
        state => state.doc.questionsStatus
    );
    const disabled = useSelector<RootState, boolean>(
        state => state.doc.text.length < MIN_PARAGRAPH_LENGTH
    );

    const generate = useGenerateQuestions();

    return (
        <Container>
            <p className="text-slate-400 mb-5 text-center">
                Your questions will appear here once generated
            </p>
            <TooltipProvider
                disabled={!disabled}
                className="mt-2 whitespace-pre-wrap left-0"
                text={`Psst! Text must be at least ${MIN_PARAGRAPH_LENGTH} characters`}
            >
                <PrimaryButton
                    disabled={disabled}
                    onClick={generate}
                    className=""
                >{
                    status === "idle" ? <>
                        <Icon type={Magic} className="mr-3 text-lg"/>
                        Generate questions
                    </> : <>
                        <Icon type={LoadingFour} className="mr-3 text-lg animate-spin"/>
                        Thinking
                    </>
                }</PrimaryButton>
            </TooltipProvider>
        </Container>
    );
}