import { Trigger } from "@/types"

type PrimaryButtonProps = {
    onClick: Trigger
    className?: string,
    children: React.ReactNode,
    disabled?: boolean,
    theme?: "danger"
}

export default function PrimaryButton({ onClick, className, children, disabled, theme }: PrimaryButtonProps) {
    return (
        <button 
            disabled={disabled || false}
            onClick={() => { onClick() }}
            className={`
                border-slate-700 dark:border-amber-300 text-slate-700 dark:text-amber-300 disabled:bg-slate-200 disabled:dark:bg-white/10 disabled:dark:text-slate-300 disabled:dark:shadow-sm-dark disabled:dark:border-slate-300 shadow-sm dark:shadow-sm-amber
                overflow-hidden whitespace-nowrap transition-all duration-75 flex items-center px-3 py-2 font-bold border-2 rounded-md active:border-b-2 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:hover:cursor-not-allowed disabled:active:shadow-sm disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:active:mb-0 
                ${
                    theme === "danger" ? 
                        "hover:bg-red-500 bg-red-400" : 
                        "hover:bg-amber-300 dark:hover:bg-amber-300/20 bg-amber-200 dark:bg-amber-300/10"
                } 
                ${className || ""}
            `}
        >
            {children}
        </button>
    )
}