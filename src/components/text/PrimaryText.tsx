import { LayoutProps } from "@/types";

export default function PrimaryText({ children, className }: LayoutProps) {
    return (
        <p 
            className={`
                text-slate-700
                flex items-center
                ${className || ""}
            `}
        >
            {children}
        </p>
    )
}