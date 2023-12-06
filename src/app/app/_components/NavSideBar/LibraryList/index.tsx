import { useSelector } from "react-redux";
import DocumentItem from "./DocumentItem";
import LibraryButton from "./LibraryButton";
import Skeleton from "@/components/Skeleton";
import { RootState } from "@/store";
import { ResourceStatus } from "@/store/types";
import { DocMetadataMap } from "@/store/docsMetadatasSlice";
import { usePathDocID } from "@/utils/routing";

export default function LibraryList() {
    const currDocID = usePathDocID();

    const docsMetadatas = useSelector<RootState, DocMetadataMap>(
        state => state.docsMetadatas.map
    );
    const docsMetadatasStatus = useSelector<RootState, ResourceStatus>(
        state => state.docsMetadatas.status
    );

    return (<>
        <LibraryButton />
        <div className="flex flex-col flex-grow w-full">{
            docsMetadatasStatus ==="succeeded" ? 
            Object.keys(docsMetadatas).map((ID, i) => {
                return (
                    <DocumentItem
                        key={`doc_${i}`}
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
        }</div>
    </>);
}