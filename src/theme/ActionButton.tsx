import { Trigger } from "@/types";

type ActionButtonProps = {
    children: React.ReactNode,
    className?: string,
    onClick?: Trigger,
    disabled?: boolean,
    submit?: boolean,
    bolded?: boolean
}

export default function ActionButton({ onClick, className, children, disabled, submit, bolded }: ActionButtonProps) {

    return (
        <button 
            type={submit ? "submit" : "button"}
            onClick={(onClick) || (() => {})}
            disabled={disabled || false}
            className={`
                bg-blue-500/10 hover:bg-blue-500/30 focus-visible:bg-blue-500/30 text-blue-500
                disabled:bg-gray-200 disabled:text-slate-500 disabled:dark:bg-white/5 disabled:hover:cursor-not-allowed
                rounded px-3 py-2 flex items-center whitespace-nowrap focus:outline-none justify-center
                ${bolded ? "font-bold" : "font-medium"}
                ${className || ""}
            `}
        >
            {children}
        </button>
    )
}