import { Trigger } from "@/types"

type PrimaryButtonProps = {
    onClick: Trigger
    className?: string,
    children: React.ReactNode,
    disabled?: boolean
}

export default function PrimaryButton({ onClick, className, children, disabled }: PrimaryButtonProps) {
    return (
        <button 
            disabled={disabled || false}
            onClick={() => { onClick() }}
            className={`flex items-center px-3 py-2 font-bold border-2 border-b-4 rounded-md border-slate-700 text-slate-700 bg-amber-200 active:border-b-2 active:translate-y-[2px] active:mb-[2px] hover:bg-yellow-300 disabled:bg-slate-200 disabled:active:border-b-4 disabled:active:translate-y-0 disabled:active:mb-0 ${className || ""}`}
        >
            {children}
        </button>
    )
}