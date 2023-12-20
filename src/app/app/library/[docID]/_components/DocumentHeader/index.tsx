import DocOptions from "./DocOptions";
import MiniTitle from "./MiniTitle";
import SaveInfo from "./SaveInfo";
import Skeleton from "@/components/Skeleton";
import { useDocStatus } from "@/db/docs/read";

export default function DocumentHeader() {
    const status = useDocStatus();

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