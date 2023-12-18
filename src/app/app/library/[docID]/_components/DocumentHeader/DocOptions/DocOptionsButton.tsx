import TooltipProvider from "@/components/TooltipProvider";
import Icon from "@/theme/Icon";
import SecondaryButton from "@/theme/SecondaryButton";
import { More } from "@icon-park/react";

type DocOptionsButtonProps = {
    onClick: () => void
}

export default function DocOptionsButton({ onClick }: DocOptionsButtonProps) {
    return (
        <TooltipProvider 
            text="Document options"
            className="right-0 translate-y-1"
        >
            <SecondaryButton
                onClick={onClick}
            >
                <Icon type={More} className="text-2xl"/>
            </SecondaryButton>
        </TooltipProvider>
    )
}