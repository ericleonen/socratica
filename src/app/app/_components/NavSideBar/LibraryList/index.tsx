import { DocumentMetadataType } from "@/utils/store";
import DocumentItem from "./DocumentItem";
import LibraryButton from "./LibraryButton";
import LineSkeleton from "@/components/skeletons/LineSkeleton";

type LibraryListProps = {
    documents?: DocumentMetadataType[]
}

export default function LibraryList({ documents }: LibraryListProps) {
    return (<>
        <LibraryButton />
        <div className="flex flex-col flex-grow w-full">{
            documents ? documents.map((documentData, i) => {
                return (
                    <DocumentItem
                    key={`doc_${i}`}
                        {...documentData}
                    />
                )
            }) : (
                <div className="flex flex-col pl-3 pr-2">{
                    Array.from(Array(3)).map(() => {
                        return <LineSkeleton dark className="my-2 text-sm">...</LineSkeleton>
                    })
}               </div>
            )
        }</div>
    </>);
}