import { DocumentMetadataType } from "@/utils/store";
import DocumentItem from "./DocumentItem";
import LibraryButton from "./LibraryButton";

type LibraryListProps = {
    documents?: DocumentMetadataType[]
}

export default function LibraryList({ documents }: LibraryListProps) {
    return (<>
        <LibraryButton />
        <div className="border-2">{
            documents ? documents.map((documentData, i) => {
                return (
                    <DocumentItem
                    key={`doc_${i}`}
                        {...documentData}
                    />
                )
            }) : "Loading..."
        }</div>
    </>);
}