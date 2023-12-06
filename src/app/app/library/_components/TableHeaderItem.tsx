type TableHeaderItemProps = {
    className?: string,
    children: React.ReactNode
}

export default function TableHeaderItem({ className, children }: TableHeaderItemProps) {
    return (
        <div className={`flex py-3 px-5 font-bold text-theme-black ${className}`}>
            {children}
        </div>
    )
}