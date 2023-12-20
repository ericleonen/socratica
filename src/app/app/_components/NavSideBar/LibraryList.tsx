import NavButton from "./NavButton";
import { Down, Notes } from "@icon-park/react";
import SecondaryButton from "@/theme/SecondaryButton";
import Icon from "@/theme/Icon";
import { useState } from "react";
import { useDocsMetadatasMap } from "@/db/docs/read";

export default function LibraryList() {
    const docsMetadatas = useDocsMetadatasMap();

    const [showRecent, setShowRecent] = useState(true);
    const toggleRecent = () => setTimeout(
        () => setShowRecent(showRecent => !showRecent),
        200
    );

    const sortedIDs = Object.keys(docsMetadatas).toSorted((ID1: string, ID2: string) => {
        return docsMetadatas[ID2].lastSaved.seconds - docsMetadatas[ID1].lastSaved.seconds;
    });

    return (
        <div className="flex flex-col flex-grow w-full mt-8 overflow-hidden">
            <div className={`py-1 flex items-center w-full border-slate-200 ${showRecent && "border-b-2"}`}>
                <SecondaryButton 
                    onClick={toggleRecent}
                    className="mr-2"
                >
                    <Icon type={Down} className={`text-lg text-slate-400 transition-transform ${showRecent ? "0" : "rotate-[-90deg]"}`} />
                </SecondaryButton>
                <p className="text-sm tracking-wider font-bold text-slate-700/50 uppercase">Documents</p>
            </div>
            <div className="w-full flex-grow overflow-y-scroll pb-5">{
                showRecent && <>{
                    sortedIDs.map(ID => 
                        <NavButton
                            key={ID}
                            text={docsMetadatas[ID].title || "Untitled"}
                            href={`/app/library/${ID}`}
                            icon={Notes}
                        />    
                    )
                }</>
            }</div>
        </div>
    );
}