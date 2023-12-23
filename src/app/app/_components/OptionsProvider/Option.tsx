import Icon from "@/theme/Icon"

type OptionProps = {
    text: string,
    icon: React.ElementType,
    onClick: () => void,
    theme?: "danger"
}

export function Option({ text, icon, onClick, theme }: OptionProps) {
    return (
        <button
            onClick={onClick}
            className={`flex w-full p-2 font-medium hover:bg-gray-200 rounded-md items-center text-sm mb-1 last:mb-0 ${theme === "danger" ? "text-red-500" : "text-slate-700"}`}
        >
            <Icon type={icon} className="mr-3 text-lg"/>
            {text}
        </button>
    )
}