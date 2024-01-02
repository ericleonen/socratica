import { Trigger } from "@/types";

type DeleteButtonsProps = {
    onClick: Trigger,
    children: React.ReactNode,
    className?: string
}

export default function DeleteButton({ onClick, children, className }: DeleteButtonsProps) {
    return (
        <button
            onClick={onClick}
            className={`
                bg-red-500/10 hover:bg-red-500/30 focus-visible:bg-red-500/30 text-red-500
                rounded px-3 py-2 font-medium flex items-center w-min whitespace-nowrap focus:outline-none
                ${className || ""}
            `}
        >
            {children}
        </button>
    )
}