import { Trigger } from "@/types"

type SecondaryButtonProps = {
    onClick: Trigger
    className?: string,
    children: React.ReactNode,
    size?: "small" | "mid",
    weight?: "light"
}

export default function SecondaryButton({ onClick, className, children, size, weight }: SecondaryButtonProps) {
    return (
        <button 
            onClick={() => onClick()}
            className={`rounded text-slate-500 ${weight === "light" ? "hover:bg-black/10" : "hover:bg-gray-200"} ${size === "small" ? "px-0" : size === "mid" ? "p-1" : "px-2 py-1"} font-medium flex items-center ${className}`}
        >
            {children}
        </button>
    )
}