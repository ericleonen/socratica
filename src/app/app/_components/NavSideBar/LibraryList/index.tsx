import { useSelector } from "react-redux";
import DocumentItem from "./DocumentItem";
import LibraryButton from "./LibraryButton";
import Skeleton from "@/components/Skeleton";
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
        150
    );

    return (
        <div className="flex flex-col flex-grow w-full mt-8">
            <div className="px-3 flex items-center w-full">
                <p className="text-sm tracking-wider font-bold text-slate-400">MY DOCUMENTS</p>
                <SecondaryButton 
                    onClick={toggleRecent}
                    className="ml-auto"
                >
                    <Icon type={Down} className={`text-lg text-slate-400 transition-transform ${showRecent ? "rotate-0" : "rotate-90"}`} />
                </SecondaryButton>
            </div>
            {
                docsMetadatasStatus === "succeeded" && showRecent ? <>{
                    Object.keys(docsMetadatas).map(ID => 
                        <NavButton
                            key={ID}
                            text={docsMetadatas[ID].title || "Untitled"}
                            href={`/app/library/${ID}`}
                            icon={Notes}
                        />    
                    )
                }</> : <>
                
                </>
            }
            {/* {
                docsMetadatasStatus ==="succeeded" ? 
                Object.keys(docsMetadatas).map((ID) => {
                    return (
                        <DocumentItem
                            key={ID}
                            title={docsMetadatas[ID].title}
                            ID={ID}
                            current={currDocID === ID}
                        />
                    )
                }) : (
                    <div className="flex flex-col pl-3 pr-2">{
                        Array.from(Array(3)).map((_, j) => {
                            return (
                                <Skeleton 
                                    key={`doc_skeleton_${j}`}
                                    dark 
                                    className="mt-2 mb-3 text-sm"
                                >
                                    ...
                                </Skeleton>
                            )
                        })
                    }</div>
                )
            } */}
        </div>
    );
}