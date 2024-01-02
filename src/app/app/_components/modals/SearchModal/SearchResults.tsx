import { useDocsMetadatas } from "@/db/docs/read";
import { Trigger } from "@/types";
import SearchResult from "./SearchResult";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useKeyDown } from "@/utils/input";
import { useCreateDoc } from "@/db/docs/create";
import PrimaryButton from "@/theme/PrimaryButton";
import Icon from "@/theme/Icon";
import { LoadingFour, PlusCross } from "@icon-park/react";

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
    }, "Enter");

    const [inProgress, createDoc] = useCreateDoc();
    const wasInProgress = useRef(false);

    useEffect(() => {
        if (inProgress) {
            wasInProgress.current = true;
        } else {
            if (wasInProgress.current) {
                close();
            }
        }
    }, [inProgress]);
 
    return (
        <div className="h-40 flex flex-col flex-grow font-medium text-slate-500 px-3 overflow-y-scroll">
            {
                filteredIDs.length > 0 ? filteredIDs.map(ID =>
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
                ) : (
                    <div className="flex flex-col h-full w-full items-center justify-center">
                        <p>No documents found</p>
                        <PrimaryButton 
                            onClick={() => createDoc(query)}
                            className="mt-2 justify-center"
                        >{
                            inProgress ? <>
                                <Icon type={LoadingFour}  className="mr-3 animate-spin"/>
                                Creating "{query}"
                            </>: <>
                                <Icon type={PlusCross}  className="mr-3"/>
                                Create a document titled "{query}"
                            </>
                        }</PrimaryButton>
                    </div>
                )
            }
        </div>
    )
}