import PopUp from "@/components/PopUp"
import Shadow from "@/components/Shadow"
import { Trigger } from "@/types"
import React, { useRef, useState } from "react"
import { Option } from "./Option"

export type Option = {
    icon: React.ElementType,
    text: string,
    onClick: Trigger,
    theme?: "basic" | "danger" | "comprehension" | "research" | "big idea",
}

type OptionsProviderProps = {
    children: React.ReactNode,
    options: Option[],
    disabled?: boolean,
    className?: string,
    align?: "right" | "left"
}

export default function OptionsProvider({ children, options, disabled, className, align }: OptionsProviderProps) {
    if (!align) align = "right";

    const divRef = useRef<HTMLDivElement>(null);

    const [show, setShow] = useState(false);
    
    return <>
        <div 
            ref={divRef}
            onClick={() => { if (!disabled) setShow(true) }}
        >
            {children}
        </div>
        {
            (divRef.current && show) &&
            <Shadow
                transparent
                onClick={() => setShow(false)}
            >
                <PopUp 
                    style={
                        align === "right" ? {
                            top: divRef.current.getBoundingClientRect().bottom,
                            right: window.innerWidth - divRef.current.getBoundingClientRect().right
                        } : {
                            top: divRef.current.getBoundingClientRect().bottom,
                            left: divRef.current.getBoundingClientRect().left
                        }
                    }
                    className={`bg-white rounded-md p-2 border-2 border-slate-700 fixed translate-y-1 ${className || ""}`}
                >{
                    options.map(option =>
                        <Option
                            onClick={() => {
                                option.onClick();
                                setShow(false);
                            }} 
                            icon={option.icon}
                            text={option.text}
                            theme={option.theme} 
                        />
                    )
                }</PopUp>
            </Shadow>
        }
    </>
}