import { Trigger } from "@/types";

type ActionButtonProps = {
    children: React.ReactNode,
    className?: string,
    onClick: Trigger,
    disabled?: boolean
}

export default function ActionButton({ onClick, className, children, disabled }: ActionButtonProps) {

    return (
        <button 
            onClick={onClick}
            disabled={disabled || false}
            className={`
                bg-blue-500/10 hover:bg-blue-500/30 focus-visible:bg-blue-500/30 text-blue-500
                disabled:bg-gray-200 disabled:text-slate-500 disabled:dark:bg-white/5 disabled:hover:cursor-not-allowed
                rounded px-3 py-2 font-medium flex items-center w-min whitespace-nowrap focus:outline-none
                ${className || ""}
            `}
        >
            {children}
        </button>
    )
}