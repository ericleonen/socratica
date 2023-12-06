type LibraryTableHeaderItemProps = {
    className?: string,
    children: React.ReactNode
}

export default function LibraryTableHeaderItem(
    { className, children }: LibraryTableHeaderItemProps
) {
    return (
        <div className={`flex py-3 px-5 font-bold text-theme-black ${className}`}>
            {children}
        </div>
    )
}