"use client"

import SearchBar from "./_components/SearchBar";
import { useState } from "react";
import LibraryContext from "./LibraryContext";
import LibraryTable from "./_components/LibraryTable";

export default function LibraryPage() {

    const [query, setQuery] = useState("");

    return (
        <LibraryContext.Provider value={{ query }}>
            <div className="py-20 px-24">
                <SearchBar {...{query, setQuery}} />
                <LibraryTable />
            </div>
        </LibraryContext.Provider>
    )
}