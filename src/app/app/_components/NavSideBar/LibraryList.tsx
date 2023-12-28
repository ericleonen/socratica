import NavButton from "./NavButton";
import { Down, Notes } from "@icon-park/react";
import SecondaryButton from "@/theme/SecondaryButton";
import Icon from "@/theme/Icon";
import { useState } from "react";
import { useDocsMetadatas } from "@/db/docs/read";
import { usePathname, useRouter } from "next/navigation";
import { usePathDocID } from "@/utils/routing";
import { Transition } from "@headlessui/react";

export default function LibraryList() {
    const docsMetadatas = useDocsMetadatas();

    const [showRecent, setShowRecent] = useState(true);
    const toggleRecent = () => {
        setTimeout(
            () => setShowRecent(showRecent => !showRecent),
            200
        );
    }
    const router = useRouter();
    const pathDocID = usePathDocID();

    const sortedIDs = Object.keys(docsMetadatas).toSorted((ID1: string, ID2: string) => {
        return docsMetadatas[ID2].lastSaved.seconds - docsMetadatas[ID1].lastSaved.seconds;
    });

    return (
        <div className="flex flex-col flex-grow w-full mt-8 overflow-hidden">
            <div className="py-1 flex items-center w-full">
                <SecondaryButton 
                    onClick={toggleRecent}
                    weight="light"
                    className="mr-2"
                >
                    <Icon type={Down} className={`text-lg transition-transform ${showRecent ? "0" : "rotate-[-90deg]"}`} />
                </SecondaryButton>
                <p className="text-slate-400 dark:text-slate-600 text-sm tracking-wider font-bold uppercase">Documents</p>
            </div>
            <Transition
                show={showRecent} 
                className="border-slate-300 dark:border-slate-600 w-full flex-grow overflow-y-scroll pb-5 border-t-2"
            >{
                sortedIDs.map(ID => 
                    <NavButton
                        key={ID}
                        text={docsMetadatas[ID].title || "Untitled"}
                        onClick={() => router.push(`/app/library/${ID}`)}
                        active={ID === pathDocID}
                        icon={Notes}
                    />    
                )
            }</Transition>
        </div>
    );
}