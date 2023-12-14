type DocOptionButtonProps = {
    icon: React.ReactNode,
    children: React.ReactNode,
    onClick: () => void
}

export function DocOptionButton({ icon, children, onClick }: DocOptionButtonProps) {
    return (
        <button
            onClick={onClick}
            className="flex w-full p-2 text-theme-black hover:bg-gray-200 rounded-md items-center text-sm"
        >
            <div className="mr-3">{icon}</div>
            {children}
        </button>
    )
}