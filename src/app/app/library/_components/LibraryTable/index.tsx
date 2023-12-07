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
import LibraryTableRow from "./LibraryTableRow";

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
        <div className="mt-6 w-full flex flex-col shadow-md rounded-md">
            {/* Header */}
            <div className="flex border-2 border-slate-300 bg-slate-200 rounded-t-md">
                <LibraryTableHeaderItem className="w-2/3">Title</LibraryTableHeaderItem>
                <LibraryTableHeaderItem>Last saved</LibraryTableHeaderItem>
            </div>
            {/* Content */}
            {
                sortedFilteredIDs.length ?
                sortedFilteredIDs.map((docID, i) =>
                    <LibraryTableRow 
                        key={`row_${i}`}
                        docID={docID}
                        title={docsMetadatas[docID].title}
                        lastSaved={docsMetadatas[docID].lastSaved}
                    />
                ) : (
                    <div className="bg-theme-white-lighter border-2 border-t-0 border-slate-300 rounded-b-md">
                        <NoDocsFound /> 
                    </div>
                )
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