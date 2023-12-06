"use client"

import TableHeaderItem from "./_components/TableHeaderItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { DocMetadataMap } from "@/store/docsMetadatasSlice";
import TableRowItem from "./_components/TableRowItem";
import Link from "next/link";
import { formatAbsoluteDate } from "@/utils/format";
import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/20/solid";
import SearchBar from "./_components/SearchBar";
import { useState } from "react";
import { useCreateDoc } from "@/db/docs";
import LibraryContext from "./LibraryContext";
import LibraryTable from "./_components/LibraryTable";

export default function LibraryPage() {

    const [query, setQuery] = useState("");

    const createDoc = useCreateDoc();

    return (
        <LibraryContext.Provider value={{ query }}>
            <div className="py-20 px-24">
                <SearchBar {...{query, setQuery}} />
                <LibraryTable />
            </div>
        </LibraryContext.Provider>
    )
}