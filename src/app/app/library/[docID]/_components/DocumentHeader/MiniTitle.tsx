import Skeleton from "@/components/Skeleton";
import { useDocTitle } from "@/db/docs";
import { RootState } from "@/store";
import { ResourceStatus } from "@/store/types";
import { useSelector } from "react-redux";

export default function MiniTitle() {
    const [title, setTitle] = useDocTitle();
    const status = useSelector<RootState, ResourceStatus>(
        state => state.docsMetadatas.status
    )

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