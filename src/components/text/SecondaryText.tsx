import { LayoutProps } from "@/types";

export default function SecondaryText({ children, className }: LayoutProps) {
    return (
        <p 
            className={`text-slate-500 ${className || ""}`}
        >
            {children}
        </p>
    )
}