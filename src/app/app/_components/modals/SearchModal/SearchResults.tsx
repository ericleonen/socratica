import { useDocsMetadatas } from "@/db/docs/read";
import { Trigger } from "@/types";
import SearchResult from "./SearchResult";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useKeyDown } from "@/utils/input";

type SearchResultsProps = {
    query: string,
    close: Trigger
}

export default function SearchResults({ query, close }: SearchResultsProps) {
    const docsMetadatas = useDocsMetadatas();

    const filteredIDs = Object.keys(docsMetadatas).filter(ID =>
        docsMetadatas[ID].title.includes(query)
    );

    const router = useRouter();

    const [selectedID, setSelectedID] = useState("");

    useEffect(() => {
        if (filteredIDs.length > 0) {
            setSelectedID(filteredIDs[0]);
        } else {
            setSelectedID("");
        }
    }, [query]);

    useKeyDown(() => {
        if (filteredIDs.length <= 1 || !selectedID) return;

        const currIndex = filteredIDs.indexOf(selectedID);

        if (currIndex === filteredIDs.length - 1) {
            setSelectedID(filteredIDs[0]);
        } else {
            setSelectedID(filteredIDs[currIndex + 1]);
        }
    }, "ArrowDown");

    useKeyDown(() => {
        if (filteredIDs.length <= 1 || !selectedID) return;

        const currIndex = filteredIDs.indexOf(selectedID);

        if (currIndex === 0) {
            setSelectedID(filteredIDs[filteredIDs.length - 1]);
        } else {
            setSelectedID(filteredIDs[currIndex - 1]);
        }
    }, "ArrowUp");

    useKeyDown(() => {
        if (filteredIDs.length === 0 || !selectedID) return;

        router.push(`/app/library/${selectedID}`);
        close();
    }, "Enter")
 
    return (
        <div className="flex flex-col h-full flex-grow font-medium text-slate-500 pr-5 overflow-y-scroll bg-white rounded-md border-2 border-b-4 border-slate-700 mb-3">
            {
                filteredIDs.map(ID =>
                    <SearchResult 
                        key={ID}
                        title={docsMetadatas[ID].title}
                        onClick={() => {
                            router.push(`/app/library/${ID}`);
                            close();
                        }}
                        query={query}
                        selected={selectedID === ID}
                        select={() => setSelectedID(ID)}
                    />
                )
            }
        </div>
    )
}