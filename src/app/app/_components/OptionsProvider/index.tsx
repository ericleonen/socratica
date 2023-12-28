import PopUp from "@/components/PopUp"
import Shadow from "@/components/Shadow"
import { Trigger } from "@/types"
import React, { useRef, useState } from "react"
import { Option } from "./Option"

export type Option = {
    icon?: React.ElementType,
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
    position?: "above" | "below",
    absolute?: boolean
}

type Position = number  | "";

export default function OptionsProvider({ 
    children, options, disabled, className, align, position, absolute }: OptionsProviderProps
) {
    if (!align) align = "right";
    if (!position) position = "below";

    const divRef = useRef<HTMLDivElement>(null);

    const [show, setShow] = useState(false);

    let top: Position = "", bottom: Position = "", right: Position = "", left: Position = "";
    if (divRef.current) {
        const div = divRef.current;

        if (align === "right") {
            let totalWidth = 0;
            if (div.offsetParent) totalWidth = div.offsetParent.getBoundingClientRect().width;
            else totalWidth = window.innerWidth;

            right = totalWidth - div.offsetLeft - div.offsetWidth;
        } else {
            left = div.offsetLeft;
        }

        if (position === "below") {
            top = absolute ? div.getBoundingClientRect().bottom : div.offsetTop + div.offsetHeight;
        } else {
            let totalHeight = 0;
            if (div.offsetParent) totalHeight = div.offsetParent.getBoundingClientRect().height;
            else totalHeight = window.innerHeight;

            bottom = totalHeight - div.offsetTop;
        }
    }
    
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
                    style={{ top, bottom, left, right }}
                    className={`bg-white dark:bg-slate-800 border-slate-700 dark:border-slate-300 rounded-md p-2 border-2 fixed z-[100] translate-y-1 ${className || ""}`}
                >{
                    options.map((option, optionIndex) =>
                        <Option
                            key={`option_${optionIndex}`}
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