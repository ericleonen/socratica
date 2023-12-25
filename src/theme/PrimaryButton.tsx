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
            className={`overflow-hidden whitespace-nowrap transition-all duration-75 flex items-center px-3 py-2 font-bold border-2 shadow-sm rounded-md border-slate-700 text-slate-700 active:border-b-2 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:bg-slate-200 disabled:hover:cursor-not-allowed disabled:active:shadow-sm disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:active:mb-0 ${theme === "danger" ? "hover:bg-red-500 bg-red-400" : "hover:bg-amber-300 bg-amber-200"} ${className || ""}`}
        >
            {children}
        </button>
    )
}