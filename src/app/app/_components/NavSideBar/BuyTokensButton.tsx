import LineSkeleton from "@/components/skeletons/LineSkeleton"
import { StopCircleIcon } from "@heroicons/react/24/solid"

type BuyTokensButtonProps = {
    tokens?: number
}

export default function BuyTokensButton({ tokens }: BuyTokensButtonProps) {
    return typeof tokens === "number" ? (
        <button
            className="ml-auto flex items-center text-theme-white hover:bg-slate-50/10 rounded-md p-2"
        >
            <StopCircleIcon className="h-5 w-5 rotate-45"/>
            <span className="ml-2 text-sm font-medium">{tokens}</span>
        </button>
    ) : (
        <LineSkeleton dark className="text-sm ml-auto px-2 h-4">0 123</LineSkeleton>
    )
}