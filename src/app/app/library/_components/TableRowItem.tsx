type TableRowItemProps = {
    className?: string,
    children: React.ReactNode
}

export default function TableRowItem({ className, children }: TableRowItemProps) {
    return (
        <div className={`flex px-5 py-3 ${className}`}>
            {children}
        </div>
    )
}