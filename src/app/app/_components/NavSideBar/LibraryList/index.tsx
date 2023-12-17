import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ResourceStatus } from "@/store/types";
import { DocMetadataMap } from "@/store/docsMetadatasSlice";
import NavButton from "../NavButton";
import { Down, Notes } from "@icon-park/react";
import SecondaryButton from "@/theme/SecondaryButton";
import Icon from "@/theme/Icon";
import { useState } from "react";

export default function LibraryList() {
    const docsMetadatas = useSelector<RootState, DocMetadataMap>(
        state => state.docsMetadatas.map
    );
    const docsMetadatasStatus = useSelector<RootState, ResourceStatus>(
        state => state.docsMetadatas.status
    );

    const [showRecent, setShowRecent] = useState(false);
    const toggleRecent = () => setTimeout(
        () => setShowRecent(showRecent => !showRecent),
        200
    );

    const sortedIDs = Object.keys(docsMetadatas).toSorted((ID1: string, ID2: string) => {
        return docsMetadatas[ID2].lastSaved.seconds - docsMetadatas[ID1].lastSaved.seconds;
    });

    return (
        <div className="flex flex-col flex-grow w-full mt-8 overflow-hidden">
            <div className={`py-1 pl-3 flex items-center w-full border-slate-200 ${showRecent && "border-b-2"}`}>
                <p className="text-sm tracking-wider font-bold text-slate-400">MY DOCUMENTS</p>
                <SecondaryButton 
                    onClick={toggleRecent}
                    className="ml-auto"
                >
                    <Icon type={Down} className={`text-lg text-slate-400 transition-transform ${showRecent ? "rotate-0" : "rotate-90"}`} />
                </SecondaryButton>
            </div>
            <div className="w-full flex-grow overflow-y-scroll pb-5">{
                docsMetadatasStatus === "succeeded" && showRecent ? <>{
                    sortedIDs.map(ID => 
                        <NavButton
                            key={ID}
                            text={docsMetadatas[ID].title || "Untitled"}
                            href={`/app/library/${ID}`}
                            icon={Notes}
                        />    
                    )
                }</> : <>
                
                </>
            }</div>
        </div>
    );
}