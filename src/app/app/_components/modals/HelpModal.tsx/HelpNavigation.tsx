import Icon from "@/theme/Icon";
import SecondaryButton from "@/theme/SecondaryButton"
import { useKeyDown } from "@/utils/input";
import { Left, Right } from "@icon-park/react";

type HelpNavigationProps = {
    helpIndex: number,
    setHelpIndex: React.Dispatch<React.SetStateAction<number>>,
    numHelp: number
}

export default function HelpNavigation({ helpIndex, setHelpIndex, numHelp }: HelpNavigationProps) {
    const moveBack = () => setHelpIndex(prev => Math.max(prev - 1, 0));
    const moveForward = () => setHelpIndex(prev => Math.min(numHelp - 1, prev + 1));

    useKeyDown(moveBack, "ArrowLeft");
    useKeyDown(moveForward, "ArrowRight");

    return (
        <div className="flex mt-3">
            {
                helpIndex > 0 &&
                <SecondaryButton
                    onClick={moveBack}
                >
                    <Icon type={Left} className="mr-1 text-lg" />
                    Back
                </SecondaryButton>
            }
            {
                helpIndex < numHelp - 1 &&
                <SecondaryButton
                    onClick={moveForward}
                    className="ml-auto"
                >
                    Next
                    <Icon type={Right} className="ml-1 text-lg" />
                </SecondaryButton>
            }
        </div>
    )
}