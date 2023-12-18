import Icon from "@/theme/Icon"

type DocOptionButtonProps = {
    icon: React.ElementType,
    children: React.ReactNode,
    onClick: () => void,
    color?: string
}

export function DocOptionButton({ icon, children, onClick, color }: DocOptionButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`flex w-full p-2 font-medium hover:bg-gray-200 rounded-md items-center text-sm mb-1 last:mb-0 ${color ? color : "text-slate-700"}`}
        >
            <Icon type={icon} className="mr-3 text-lg"/>
            {children}
        </button>
    )
}