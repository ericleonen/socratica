import TooltipProvider from "@/components/TooltipProvider"
import Icon from "@/theme/Icon"
import SecondaryButton from "@/theme/SecondaryButton"
import { Left, Right } from "@icon-park/react"

type QuestionsNavigationProps = {
    section: number,
    setSection: (callback: (prevSection: number) => number) => void,
    numSections: number
}

export default function QuestionsNavigation({ section, setSection, numSections }: QuestionsNavigationProps) {
    const goBack = () => setSection(prevSection => Math.max(0, prevSection - 1));
    const goForward = () => setSection(prevSection => Math.min(numSections - 1, prevSection + 1));

    return (
        <div className="shrink-0 w-full h-16 flex items-center px-4">
            <div className="w-full flex justify-between items-center">
                <TooltipProvider 
                    text="Go back"
                    disabled={section === 0}
                    className="left-0 translate-y-1"
                >
                    <SecondaryButton
                        onClick={goBack}
                        className={`${section === 0 && "invisible"}`}
                    >
                        <Icon type={Left} className="text-lg"/>
                    </SecondaryButton>
                </TooltipProvider>
                
                <p className="font-bold text-slate-700 uppercase text-sm tracking-wide">Section {section + 1}/{numSections}</p>
                <TooltipProvider 
                    text="Next"
                    disabled={section === numSections - 1}
                    className="right-0 translate-y-1"
                >
                    <SecondaryButton
                        onClick={goForward}
                        className={`${section === numSections - 1 && "invisible"}`}
                    >
                        <Icon type={Right} className="text-lg"/>
                    </SecondaryButton>
                </TooltipProvider>
            </div>
        </div>
    )
}