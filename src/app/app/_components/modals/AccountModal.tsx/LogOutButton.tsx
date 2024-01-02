import { useLogOut } from "@/auth"
import Icon from "@/theme/Icon";
import { LayoutProps } from "@/types";
import { LoadingFour } from "@icon-park/react";

export default function LogOutButton({ className }: LayoutProps) {
    const [inProgress, logOut] = useLogOut();

    return (
        <button 
            onClick={logOut}
            className={`
                bg-blue-500/10 hover:bg-blue-500/30 focus-visible:bg-blue-500/30 text-blue-500 
                rounded px-3 py-2 font-medium flex items-center w-min whitespace-nowrap focus:outline-none
                ${className || ""}
            `}
        >
            {
                inProgress ? <>
                    <Icon type={LoadingFour} className="text-lg mr-2 animate-spin" /> Logging out
                </> : "Log out"
            }
        </button>
    )
}