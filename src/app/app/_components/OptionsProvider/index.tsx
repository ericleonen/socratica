import PopUp from "@/components/PopUp"
import Shadow from "@/components/Shadow"
import { Trigger } from "@/types"
import React, { useRef, useState } from "react"
import { Option } from "./Option"

export type Option = {
    icon: React.ElementType,
    text: string,
    onClick: Trigger,
    theme?: "danger"
}

type OptionsProviderProps = {
    children: React.ReactNode,
    options: Option[]
}

export default function OptionsProvider({ children, options }: OptionsProviderProps) {
    const divRef = useRef<HTMLDivElement>(null);

    const [show, setShow] = useState(false);
    
    return <>
        <div 
            ref={divRef}
            onClick={() => setShow(true)}
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
                    style={{
                        top: divRef.current.getBoundingClientRect().bottom,
                        right: window.innerWidth - divRef.current.getBoundingClientRect().right
                    }}
                    className="bg-white rounded-md p-2 w-[16rem] right-4 top-16 border-2 border-b-4 border-slate-700 fixed translate-y-1"
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