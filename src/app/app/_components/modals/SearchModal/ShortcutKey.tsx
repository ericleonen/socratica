type ShortcutKeyProps = {
    children: React.ReactNode,
    className?: string
}

export default function ShortcutKey({ children, className }: ShortcutKeyProps) {
    return (
        <div className={`bg-slate-200 rounded-md flex items-center justify-center h-7 px-1 font-bold text-xs ${className || ""}`}>
            {children}
        </div>
    )
}