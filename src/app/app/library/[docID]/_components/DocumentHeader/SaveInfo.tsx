import { useDocSavingStatus, useDocsMetadatasSavingStatus, useQuestionsSavingStatus } from "@/db/docs/read";
import Icon from "@/theme/Icon";
import { useFormattedLastSaved } from "@/utils/format";
import { CheckOne, Error, LoadingFour } from "@icon-park/react";

export default function SaveInfo() {
    const lastSaved = useFormattedLastSaved();
    
    const docSavingStatus = useDocSavingStatus(); // text
    const questionsSavingStatus = useQuestionsSavingStatus(); // questions
    const docsMetadatas = useDocsMetadatasSavingStatus(); // title

    const statusArr = [docSavingStatus, questionsSavingStatus, docsMetadatas];

    const someFailed = statusArr.includes("failed");
    const deleting = docSavingStatus === "deleting";
    const someSaving = statusArr.includes("unsaved") || statusArr.includes("saving");
    const allSaved = (
        docSavingStatus === questionsSavingStatus
        && questionsSavingStatus === docsMetadatas
        && docsMetadatas === "saved"
    );


    return (
        <div className="text-slate-700/70 flex items-center font-medium mr-2">{
            allSaved && lastSaved ? (<>
                <Icon type={CheckOne} className="mr-2"/> {lastSaved}
            </>) :
            someFailed ? (<>
                <Icon type={Error} className="mr-2" /> Failed to save
            </>) :
            deleting ? (<>
                <Icon type={LoadingFour} className="mr-2 animate-spin" /> Deleting
            </>) :
            someSaving && (<>
                <Icon type={LoadingFour} className="mr-2 animate-spin" /> Saving
            </>)
        }</div>
    );
}