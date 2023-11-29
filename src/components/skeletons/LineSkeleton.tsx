type LineSkeletonProps = {
    className: string,
    dark?: boolean
    children?: React.ReactNode
}

export default function LineSkeleton({ className, dark, children }: LineSkeletonProps) {
    return (
        <div className={`animate-pulse rounded-md ${className} ${dark && "bg-slate-800"} text-transparent`}>
            {children}
        </div>
    )
}