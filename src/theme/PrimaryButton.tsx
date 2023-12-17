import { Trigger } from "@/types"

type PrimaryButtonProps = {
    onClick: Trigger
    className?: string,
    children: React.ReactNode
}

export default function PrimaryButton({ onClick, className, children }: PrimaryButtonProps) {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center px-3 py-2 font-bold border-2 border-b-4 rounded-md border-black/80 text-black/80 bg-amber-200 active:border-b-2 active:translate-y-[2px] active:mb-[2px] hover:bg-yellow-300 ${className || ""}`}
        >
            {children}
        </button>
    )
}