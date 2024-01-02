import Icon from "@/theme/Icon"
import { questionTheme } from "@/theme/questions";

type OptionProps = {
    text: string,
    icon?: React.ElementType,
    onClick: () => void,
    theme?: "basic" | "danger" | "comprehension" | "research" | "big idea"
}

export function Option({ text, icon, onClick, theme }: OptionProps) {
    if (!theme) theme = "basic";

    return (
        <button
            onClick={onClick}
            className={`
                flex items-center mb-1 last:mb-0 w-full p-2 rounded-md focus:outline-none
                ${
                    theme === "basic"         ? "hover:bg-gray-200 focus-visible:bg-gray-200 hover:dark:bg-white/5 focus-visible:dark:bg-white/5 text-slate-700 dark:text-slate-300 text-sm font-medium" :
                    theme === "danger"        ? "hover:bg-red-500/20 focus-visible:bg-red-500/20 text-red-500 text-sm font-medium" :
                    ["comprehension", "research", "big idea"].includes(theme)
                        && `${questionTheme[theme].save} ${questionTheme[theme].text} uppercase tracking-wider text-xs font-bold`
                }
            `}
        >
            <Icon type={icon} className="mr-3 text-base"/>
            {text}
        </button>
    )
}