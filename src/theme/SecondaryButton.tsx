import { Trigger } from "@/types"

type SecondaryButtonProps = {
    onClick: Trigger
    className?: string,
    children: React.ReactNode
}

export default function SecondaryButton({ onClick, className, children }: SecondaryButtonProps) {
    return (
        <button 
            onClick={() => onClick()}
            className={`text-slate-500 rounded hover:bg-gray-200 py-1 px-2 font-medium flex items-center ${className}`}
        >
            {children}
        </button>
    )
}