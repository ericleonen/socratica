import { DocumentMetadataType, getPathDocID } from "@/utils/store";
import DocumentItem from "./DocumentItem";
import LibraryButton from "./LibraryButton";
import LineSkeleton from "@/components/skeletons/LineSkeleton";
import { useContext } from "react";
import UserDataContext, { CurrTitleContext } from "../../UserDataContext";
import { usePathname } from "next/navigation";

export default function LibraryList() {
    const { documents } = useContext(UserDataContext);
    const { currTitle } = useContext(CurrTitleContext);
    const path = usePathname();

    return (<>
        <LibraryButton />
        <div className="flex flex-col flex-grow w-full">{
            documents ? documents.map(({ title, id }, i) => {
                return !(getPathDocID(path) === id) ? (
                    <DocumentItem
                        key={`doc_${i}`}
                        {...{title, id}}
                    />
                ) : (
                    <DocumentItem 
                        key={`doc_${i}`}
                        title={currTitle}
                        id={id}
                        current
                    />
                )
            }) : (
                <div className="flex flex-col pl-3 pr-2">{
                    Array.from(Array(3)).map((_, j) => {
                        return (
                            <LineSkeleton 
                                key={`doc_skeleton_${j}`}
                                dark 
                                className="mt-2 mb-3 text-sm"
                            >
                                    ...
                            </LineSkeleton>
                        )
                    })
}               </div>
            )
        }</div>
    </>);
}