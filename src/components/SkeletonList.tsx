import Skeleton from "./Skeleton";

type SkeletonListProps = {
    count: number,
    className?: string
}

export default function SkeletonList({ count, className }: SkeletonListProps) {
    return Array.from(Array(count)).map((_, key) =>
        <Skeleton 
            className={className || ""}
            key={`skeleton_${key}`}
        >
            spooky
        </Skeleton>
    );
}