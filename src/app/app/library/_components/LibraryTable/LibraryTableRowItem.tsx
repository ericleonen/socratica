type LibraryTableRowItemProps = {
    className?: string,
    children: React.ReactNode
}

export default function LibraryTableRowItem({ className, children }: LibraryTableRowItemProps) {
    return (
        <div className={`flex px-5 py-3 ${className}`}>
            {children}
        </div>
    )
}