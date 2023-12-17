type PrimaryTextProps = {
    className?: string,
    children: React.ReactNode
}

export default function PrimaryText({ className, children }: PrimaryTextProps) {
    return (
        <p className={`text-black/80 font-bold ${className || ""}`}>{children}</p>
    )
}