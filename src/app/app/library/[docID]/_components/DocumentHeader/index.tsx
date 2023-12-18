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
        <div className="py-3 w-full flex items-center bg-yellow-50 px-3 z-10 border-b-2 border-slate-700">
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