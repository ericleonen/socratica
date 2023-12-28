import { Trigger } from "@/types"

type SecondaryButtonProps = {
    onClick: Trigger
    className?: string,
    children: React.ReactNode,
    size?: "sm" | "md" | "lg" | "xl",
    weight?: "light" | "normal" | "heavy",
}

export default function SecondaryButton({ onClick, className, children, size, weight }: SecondaryButtonProps) {
    if (!weight) weight = "normal";
    if (!size) size = "md";
    
    return (
        <button 
            onClick={() => onClick()}
            className={`
                rounded font-medium flex items-center
                ${
                    weight === "heavy"  ? "bg-amber-200 dark:bg-yellow-300/10 hover:bg-amber-300 dark:hover:bg-yellow-300/20 text-slate-700 dark:text-amber-300" :
                    weight === "normal" ? "hover:bg-gray-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400" :
                    weight === "light" && "hover:bg-black/10 dark:hover:bg-white/5 text-slate-500"
                                         
                }
                ${
                    size === "xl" ? "px-3 py-2" :
                    size === "lg"  ? "px-2 py-1" :
                    size === "md" ? "p-1" :
                    size === "sm" && "p-0"
                }
                ${className || ""}
            `}
        >
            {children}
        </button>
    )
}