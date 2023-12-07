"use client"

import SearchBar from "./_components/SearchBar";
import { useState } from "react";
import LibraryContext from "./LibraryContext";
import LibraryTable from "./_components/LibraryTable";

export default function LibraryPage() {

    const [query, setQuery] = useState("");

    return (
        <div className="py-20 px-24">
            <SearchBar {...{query, setQuery}} />
            <LibraryContext.Provider value={{ query }}>
                <LibraryTable />
            </LibraryContext.Provider>
        </div>
    )
}