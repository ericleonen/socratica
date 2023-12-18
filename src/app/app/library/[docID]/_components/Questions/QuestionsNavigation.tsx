import TooltipProvider from "@/components/TooltipProvider"
import Icon from "@/theme/Icon"
import SecondaryButton from "@/theme/SecondaryButton"
import { Left, Right } from "@icon-park/react"

type QuestionsNavigationProps = {
    section: number,
    setSection: (callback: (prevSection: number) => number) => void
}

export default function QuestionsNavigation({ section, setSection }: QuestionsNavigationProps) {
    const goBack = () => setSection(prevSection => Math.max(1, prevSection - 1));
    const goForward = () => setSection(prevSection => Math.min(numSections, prevSection + 1));

    const numSections = 4;

    return (
        <div className="w-full h-16 flex items-center">
            <div className="w-full flex justify-between items-center">
                <TooltipProvider 
                    text="Go back"
                    className="right-0 translate-y-1"
                >
                    <SecondaryButton
                        onClick={goBack}
                    >
                        <Icon type={Left} className="text-lg"/>
                    </SecondaryButton>
                </TooltipProvider>
                
                <p className="font-bold text-slate-700 uppercase text-sm tracking-wide">Section {section}/{numSections}</p>
                <TooltipProvider 
                    text="Next"
                    className="right-0 translate-y-1"
                >
                    <SecondaryButton
                        onClick={goForward}
                    >
                        <Icon type={Right} className="text-lg"/>
                    </SecondaryButton>
                </TooltipProvider>
            </div>
        </div>
    )
}