import LineSkeleton from "@/components/skeletons/LineSkeleton"
import { StopCircleIcon } from "@heroicons/react/24/solid"
import { useContext } from "react"
import UserDataContext from "../UserDataContext"

export default function BuyTokensButton() {
    const { tokens } = useContext(UserDataContext);

    return typeof tokens === "number" ? (
        <button
            className="ml-auto flex items-center text-theme-white hover:bg-slate-50/10 rounded-md px-2 py-1"
        >
            <StopCircleIcon className="h-5 w-5 rotate-45"/>
            <span className="ml-2 text-sm font-medium">{tokens}</span>
        </button>
    ) : (
        <LineSkeleton dark className="text-sm ml-auto p-3 h-4">...</LineSkeleton>
    )
}