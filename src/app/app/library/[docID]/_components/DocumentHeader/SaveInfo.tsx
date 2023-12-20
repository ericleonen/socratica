import { useSavingStatus } from "@/db/docs/read";
import Icon from "@/theme/Icon";
import { useFormattedLastSaved } from "@/utils/format";
import { CheckOne, Error, LoadingFour } from "@icon-park/react";

export default function SaveInfo() {
    const lastSaved = useFormattedLastSaved() as string;
    const status = useSavingStatus();

    return (
        <div className="text-slate-700/70 flex items-center font-medium mr-2">{
            status === "saved" && lastSaved ? (<>
                <Icon type={CheckOne} className="mr-2"/> {lastSaved}
            </>) :
            status === "failed" ? (<>
                <Icon type={Error} className="mr-2" /> Failed to save
            </>) :
            status === "deleting" ? (<>
                <Icon type={LoadingFour} className="mr-2 animate-spin" /> Deleting
            </>) :
            status === "saving" || status === "unsaved" ? (<>
                <Icon type={LoadingFour} className="mr-2 animate-spin" /> Saving
            </>) :
            ""
        }</div>
    );
}