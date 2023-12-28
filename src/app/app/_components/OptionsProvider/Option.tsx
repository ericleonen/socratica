import Icon from "@/theme/Icon"

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
                flex items-center mb-1 last:mb-0 w-full p-2 rounded-md
                ${
                    theme === "basic"         ? "hover:bg-gray-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-sm font-medium" :
                    theme === "danger"        ? "hover:bg-gray-200 dark:hover:bg-white/10 text-red-500 text-sm font-medium" :
                    theme === "comprehension" ? "hover:bg-sky-100 dark:hover:bg-sky-300/20 text-sky-500 uppercase text-xs font-bold" :
                    theme === "research"      ? "hover:bg-emerald-100 dark:hover:bg-emerald-300/20 text-emerald-500 uppercase text-xs font-bold" :
                    theme === "big idea"     && "hover:bg-violet-100 dark:hover:bg-violet-300/20 text-violet-500 uppercase text-xs font-bold"
                }
            `}
        >
            <Icon type={icon} className="mr-3 text-base"/>
            {text}
        </button>
    )
}