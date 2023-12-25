import Icon from "@/theme/Icon"

type OptionProps = {
    text: string,
    icon: React.ElementType,
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
                    theme === "basic"         ? "hover:bg-gray-200 text-slate-700 text-sm font-medium" :
                    theme === "danger"        ? "hover:bg-gray-200 text-red-500 text-sm font-medium" :
                    theme === "comprehension" ? "hover:bg-sky-100 text-sky-500 uppercase text-xs font-bold" :
                    theme === "research"      ? "hover:bg-emerald-100 text-emerald-500 uppercase text-xs font-bold" :
                    theme === "big idea"     && "hover:bg-violet-100 text-violet-500 uppercase text-xs font-bold"
                }
            `}
        >
            <Icon type={icon} className="mr-3 text-base"/>
            {text}
        </button>
    )
}