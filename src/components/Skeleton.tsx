type SkeletonProps = {
    className: string,
    children?: React.ReactNode
}

export default function Skeleton({ className, children }: SkeletonProps) {
    return (
        <div className={`animate-pulse rounded-md text-transparent bg-slate-200 dark:bg-slate-700 ${className}`}>
            {children}
        </div>
    )
}