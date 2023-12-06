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
        <button 
            className="px-2 py-1 text-theme-black rounded-md hover:bg-gray-200 overflow-hidden whitespace-nowrap text-ellipsis max-w-md"
        >
            {title || "Untitled"}
        </button>
    ) : (
        <Skeleton className="my-1">Mini title loading...</Skeleton>
    )
}