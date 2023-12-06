import { useSelector } from "react-redux";
import DocOptions from "./DocOptions";
import MiniTitle from "./MiniTitle";
import SaveInfo from "./SaveInfo";
import { RootState } from "@/store";
import { ResourceStatus } from "@/store/types";
import Skeleton from "@/components/Skeleton";

export default function DocumentHeader() {
    const status = useSelector<RootState, ResourceStatus>(
        state => state.doc.status
    )

    return (
        <div className="py-3 w-full sticky top-0 flex items-center bg-slate-50/95 shadow-sm px-3">
            <MiniTitle />
            {
                status === "succeeded" ? (
                    <div className="ml-auto flex items-center">
                        <SaveInfo />
                        <DocOptions />
                    </div>
                ) : (
                    <Skeleton className="ml-auto">Doc info loading...</Skeleton>
                )
            }
        </div>
    )
}