import TooltipProvider from "@/components/TooltipProvider";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";

type DocOptionsButtonProps = {
    onClick: () => void
}

export default function DocOptionsButton({ onClick }: DocOptionsButtonProps) {
    return (
        <TooltipProvider 
            text="Delete or copy"
            className="right-0 translate-y-1"
        >
            <button 
                onClick={onClick}
                className="ml-3 px-1 rounded-md hover:bg-gray-200/70 text-theme-black"
            >
                <EllipsisHorizontalIcon className="w-6 h-6"/>
            </button>
        </TooltipProvider>
    )
}