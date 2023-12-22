import { Trigger } from "@/types"

type PrimaryButtonProps = {
    onClick: Trigger
    className?: string,
    children: React.ReactNode,
    disabled?: boolean,
    colors?: string
}

export default function PrimaryButton({ onClick, className, children, disabled, colors }: PrimaryButtonProps) {
    return (
        <button 
            disabled={disabled || false}
            onClick={() => { onClick() }}
            className={`flex items-center px-3 py-2 font-bold border-2 border-b-4 rounded-full border-slate-700 text-slate-700 active:border-b-2 active:translate-y-[2px] active:mb-[2px] disabled:bg-slate-200 disabled:active:border-b-4 disabled:active:translate-y-0 disabled:active:mb-0 ${className || ""} ${colors || "bg-amber-200 hover:bg-yellow-300"}`}
        >
            {children}
        </button>
    )
}