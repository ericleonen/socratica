import Skeleton from "@/components/Skeleton";
import { useDocsMetadatasStatus, useTitle } from "@/db/docs/read";

export default function MiniTitle() {
    const title = useTitle();
    const status = useDocsMetadatasStatus();

    return status === "succeeded" ? (
        <p 
            className="px-2 py-1 text-slate-700 font-bold rounded-md overflow-hidden whitespace-nowrap text-ellipsis max-w-md"
        >
            {title || "Untitled"}
        </p>
    ) : (
        <Skeleton className="my-1">Mini title loading...</Skeleton>
    )
}