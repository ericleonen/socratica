import { Transition } from "@headlessui/react";
import { useState } from "react"

type TooltipProviderProps = {
    text: string,
    className?: string,
    containerClassName?: string
    children: React.ReactNode
}

export default function TooltipProvider({ text, className, containerClassName, children }: TooltipProviderProps) {
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
                show={show}
                enter="transition-opacity duration-25"
                enterFrom="opacity-0"
                enterTo="opacity-100"
            >
                <div className={`z-[100] absolute bg-theme-black border-[1px] border-white/40 rounded-md text-xs text-theme-white py-1 px-2 whitespace-nowrap ${className}`}>{text}</div>
            </Transition>
        </div>
    )
}