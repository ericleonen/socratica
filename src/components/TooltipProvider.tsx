import { Transition } from "@headlessui/react";
import { useState } from "react"

type TooltipProviderProps = {
    text: string,
    className?: string,
    containerClassName?: string
    children: React.ReactNode,
    disabled?: boolean
}

export default function TooltipProvider({ text, className, containerClassName, children, disabled }: TooltipProviderProps) {
    const [show, setShow] = useState(false);
    
    return (
        <div className={`relative ${containerClassName}`}>
            <div
                onMouseOver={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                {children}
            </div>
            <Transition
                show={show && !disabled}
                enter="transition-opacity duration-25"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                className={`bg-slate-700 dark:bg-slate-800 border-transparent dark:border-2 dark:border-slate-300 text-white dark:text-slate-300 z-[100] absolute rounded-md text-xs font-bold text-theme-white p-2 whitespace-nowrap ${className}`}
            >
                {text}
            </Transition>
        </div>
    )
}