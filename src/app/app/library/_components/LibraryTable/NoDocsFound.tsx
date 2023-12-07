import { useContext } from "react"
import LibraryContext from "../../LibraryContext"
import { useCreateDoc } from "@/db/docs";
import LibraryTableRowItem from "./LibraryTableRowItem";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function NoDocsFound() {
    const { query } = useContext(LibraryContext);
    const createDoc = useCreateDoc();

    return (
        <LibraryTableRowItem className="text-theme-black justify-center items-center py-5 flex-col">
            No documents match your query.
            <button
                onClick={() => createDoc(query)} 
                className="mt-3 flex items-center rounded-md text-theme-white py-2 pl-3 pr-5 bg-slate-900/90 shadow-md hover:bg-slate-800/80 font-medium"
            >
                <PlusIcon className="h-5 w-5 mr-2"/>
                Create a document titled "{query}"
            </button>
        </LibraryTableRowItem>
    )
}