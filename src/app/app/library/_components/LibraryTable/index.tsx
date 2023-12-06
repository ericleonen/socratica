import { useContext } from "react";
import LibraryTableHeaderItem from "./LibraryTableHeaderItem";
import LibraryContext from "../../LibraryContext";
import { RootState } from "@/store";
import { DocMetadataMap } from "@/store/docsMetadatasSlice";
import { formatAbsoluteDate } from "@/utils/format";
import Link from "next/link";
import { useSelector } from "react-redux";
import LibraryTableRowItem from "./LibraryTableRowItem";
import NoDocsFound from "./NoDocsFound";
import LibraryTableRowOptions from "./LibraryTableRowOptions";
import { ResourceStatus } from "@/store/types";
import Skeleton from "@/components/Skeleton";

export default function LibraryTable() {
    const { query } = useContext(LibraryContext);

    const docsMetadatas = useSelector<RootState, DocMetadataMap>(
        state => state.docsMetadatas.map
    );
    const sortedFilteredIDs = Object.keys(docsMetadatas)
        .filter(ID => docsMetadatas[ID].title.toLowerCase().includes(query.toLowerCase()))
        .sort((ID1, ID2) => docsMetadatas[ID2].lastSaved.seconds - docsMetadatas[ID1].lastSaved.seconds)

    const status = useSelector<RootState, ResourceStatus>(
        state => state.docsMetadatas.status
    );

    return status === "succeeded" ? (
        <div className="mt-6 w-full flex flex-col rounded-md shadow-md overflow-hidden border-2 border-slate-300">
            {/* Header */}
            <div className="flex border-b-2 border-slate-300 bg-slate-200">
                <LibraryTableHeaderItem className="w-2/3">Title</LibraryTableHeaderItem>
                <LibraryTableHeaderItem>Last saved</LibraryTableHeaderItem>
            </div>
            {/* Content */}
            {
                sortedFilteredIDs.length ?
                sortedFilteredIDs.map((docID, i) => 
                    <div className="relative w-full">
                        <Link 
                            href={`/app/library/${docID}`}
                            key={`docLibraryItem_${i}`}
                            scroll={false}
                            className="flex hover:bg-gray-200 bg-theme-white-lighter items-center"
                        >
                            <LibraryTableRowItem className="w-2/3 font-medium pr-4 text-theme-black">{docsMetadatas[docID].title || "Untitled"}</LibraryTableRowItem>
                            <LibraryTableRowItem className="text-slate-400">{formatAbsoluteDate(docsMetadatas[docID].lastSaved)}</LibraryTableRowItem>
                        </Link>
                        <LibraryTableRowOptions docID={docID} />
                    </div>
                ) :
                <div className="bg-theme-white-lighter">
                   <NoDocsFound /> 
                </div>
            }
        </div>
    ) : (<>
        <Skeleton className="w-full py-3 mt-6">Library table loading...</Skeleton>
        {
            Array.from(Array(3)).map((_, i) => 
                <Skeleton 
                    key={`library_skeleton_${i}`}
                    className="my-5"
                >
                    Library table item loading...
                </Skeleton>
            )
        }
    </>)
}