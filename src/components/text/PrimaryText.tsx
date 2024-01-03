import { LayoutProps } from "@/types";

export default function PrimaryText({ children, className }: LayoutProps) {
    return (
        <p 
            className={`
                text-slate-700 dark:text-slate-300
                flex items-center
                ${className || ""}
            `}
        >
            {children}
        </p>
    )
}