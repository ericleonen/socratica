import { LayoutProps } from "@/types";

export default function Logo({ className }: LayoutProps) {
    return (
        <span 
            className={`text-slate-700 font-bold bg-amber-300 ${className || ""}`}
        >
            highlights
        </span>
    )
}