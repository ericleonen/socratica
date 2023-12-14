type LibraryTableRowOptionButtonProps = {
    icon: React.ReactNode,
    children: React.ReactNode,
    onClick: () => void
}

export function LibraryTableRowOptionButton({ icon, children, onClick }: LibraryTableRowOptionButtonProps) {
    return (
        <button
            onClick={onClick}
            className="flex w-full p-2 text-theme-black hover:bg-gray-200/70 rounded-md items-center text-sm"
        >
            <div className="mr-2">{icon}</div>
            {children}
        </button>
    )
}