import { formatAbsoluteDate } from "@/utils/format"
import Link from "next/link"
import LibraryTableRowItem from "./LibraryTableRowItem"
import LibraryTableRowOptions from "./LibraryTableRowOptions"
import { Timestamp } from "firebase/firestore"
import { useState } from "react"

type LibraryTableRowProps = {
    docID: string,
    title: string,
    lastSaved: Timestamp
}

export default function LibraryTableRow({ docID, title, lastSaved }: LibraryTableRowProps) {
    const [active, setActive] = useState(false);

    return (
        <div className={`last:rounded-b-md last:border-b-2 relative w-full border-x-2 border-slate-300 hover:bg-gray-200 ${active ? "bg-gray-200" : "bg-theme-white-lighter"}`}>
            <Link 
                href={`/app/library/${docID}`}
                scroll={false}
                className="flex items-center bg-transparent"
            >
                <LibraryTableRowItem className="w-2/3 font-medium pr-4 text-theme-black">{title || "Untitled"}</LibraryTableRowItem>
                <LibraryTableRowItem className="text-slate-400">{formatAbsoluteDate(lastSaved)}</LibraryTableRowItem>
            </Link>
            <LibraryTableRowOptions
                active={active}
                setActive={setActive} 
                docID={docID}
            />
        </div>
    )
}