import Skeleton from "@/components/Skeleton"
import TooltipProvider from "@/components/TooltipProvider";
import { RootState } from "@/store"
import { ResourceStatus } from "@/store/types";
import { StopCircleIcon } from "@heroicons/react/24/solid"
import { useSelector } from "react-redux"

export default function BuyTokensButton() {
    const tokens = useSelector<RootState, number>(state => state.user.tokens);
    const userStatus = useSelector<RootState, ResourceStatus>(state => state.user.status);

    return userStatus === "succeeded" ? (
        <TooltipProvider
            text="Buy tokens"
            containerClassName="ml-auto"
            className="right-0 translate-y-1"
        >
            <button
                className="flex items-center text-theme-white hover:bg-slate-50/10 rounded-md px-2 py-1"
            >
                <StopCircleIcon className="h-5 w-5 rotate-45"/>
                <span className="ml-2 text-sm font-medium">{tokens}</span>
            </button>
        </TooltipProvider>
    ) : (
        <Skeleton dark className="text-sm ml-auto p-3 h-4">...</Skeleton>
    )
}