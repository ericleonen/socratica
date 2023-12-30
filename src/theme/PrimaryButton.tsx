import { Trigger } from "@/types"

type PrimaryButtonProps = {
    onClick: Trigger
    className?: string,
    children: React.ReactNode,
    disabled?: boolean,
    theme?: "danger"
    size?: "sm"
}

export default function PrimaryButton({ onClick, className, children, disabled, theme, size }: PrimaryButtonProps) {
    return (
        <button 
            disabled={disabled || false}
            onClick={() => { onClick() }}
            className={`
                border-slate-700 disabled:bg-slate-200 disabled:dark:bg-white/10 disabled:dark:text-slate-300 disabled:dark:border-slate-300 shadow-sm
                overflow-hidden whitespace-nowrap transition-all duration-75 flex items-center px-3 font-bold border-2 rounded-md disabled:hover:cursor-not-allowed disabled:active:shadow-sm disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:active:mb-0 
                focus:outline-none
                ${
                    theme === "danger" ? 
                        "bg-red-500/10 hover:bg-red-500/30 text-red-500 border-2 border-red-500 focus:shadow-red-500/30 focus:shadow-[0_0_0_4px]" : 
                        "hover:bg-amber-300 dark:hover:bg-amber-300/20 bg-amber-200 dark:bg-amber-300/10 dark:border-amber-300 dark:text-amber-300"
                } 
                ${
                    size === "sm" ? "py-1" : "py-2"
                }
                ${className || ""}
            `}
        >
            {children}
        </button>
    )
}