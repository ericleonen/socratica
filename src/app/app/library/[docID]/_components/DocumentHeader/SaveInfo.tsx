import { RootState } from "@/store";
import { SavingStatus } from "@/store/types";
import { useFormattedLastSaved } from "@/utils/format";
import { ArrowPathIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

export default function SaveInfo() {
    const lastSaved = useFormattedLastSaved() as string;
    const status = useSelector<RootState, SavingStatus>(
        state => state.doc.savingStatus
    )

    return (
        <div className="text-slate-400 flex items-center">{
            status === "saved" && lastSaved ? (<>
                <CheckCircleIcon className="h-5 w-5 mr-2"/> {lastSaved}
            </>) :
            status === "failed" ? (<>
                <ExclamationTriangleIcon className="h-5 w-5 mr-2" /> Failed to save
            </>) :
            status === "deleting" ? (<>
                <ArrowPathIcon className="h-5 w-4 animate-spin mr-2"/> Deleting
            </>) :
            ["unsaved", "saving"].includes(status) ? (<>
                <ArrowPathIcon className="h-5 w-4 animate-spin mr-2"/> Saving
            </>) :
            ""
        }</div>
    );
}