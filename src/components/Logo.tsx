import { LayoutProps } from "@/types";

export default function Logo({ className }: LayoutProps) {
    return (
        <span 
            className={`text-slate-700 dark:text-amber-300 font-bold bg-amber-300 dark:bg-amber-300/10 ${className || ""}`}
        >
            Socratica
        </span>
    )
}