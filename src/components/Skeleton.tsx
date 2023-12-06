type SkeletonProps = {
    className: string,
    dark?: boolean
    children?: React.ReactNode
}

export default function Skeleton({ className, dark, children }: SkeletonProps) {
    return (
        <div className={`animate-pulse rounded-full ${className} ${dark ? "bg-slate-800" : "bg-gray-200"} text-transparent opacity-80`}>
            {children}
        </div>
    )
}