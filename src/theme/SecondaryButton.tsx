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
                rounded font-medium flex items-center focus:outline-none focus:opacity-100
                ${
                    weight === "heavy"  ? "bg-amber-300 dark:bg-amber-300/10 hover:bg-amber-400 focus-visible:bg-amber-400 dark:focus-visible:bg-amber-300/20 dark:hover:bg-amber-300/20 text-slate-700 dark:text-amber-300" :
                    weight === "normal" ? "hover:bg-gray-200 focus-visible:bg-gray-200 dark:hover:bg-white/5 dark:focus-visible:bg-white/5 text-slate-500" :
                    weight === "light" && "hover:bg-black/5 focus-visible:bg-black/5 dark:hover:bg-white/5 focus-visible:dark:bg-white/5 text-slate-400 dark:text-slate-500"
                                         
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