import Skeleton from "@/components/Skeleton"
import { RootState } from "@/store"
import { ResourceStatus } from "@/store/types"
import { handleChange } from "@/utils/input"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { useSelector } from "react-redux"

type SearchBarProps = {
    query: string,
    setQuery: (query: string) => void
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
    const status = useSelector<RootState, ResourceStatus>(
        state => state.docsMetadatas.status
    );

    return status === "succeeded" ? (
        <div className="flex rounded-md overflow-hidden bg-theme-white-lighter shadow-md w-[528px] border-2 border-slate-300">
            <div className="flex justify-center items-center px-3 bg-slate-200">
                <MagnifyingGlassIcon className="h-4 w-4 text-theme-black"/>
            </div>
            <input 
                value={query}
                onChange={handleChange(setQuery)}
                placeholder="Search your library"
                className="placeholder:text-slate-400/90 flex-grow p-3 focus:outline-none text-theme-black font-medium"
            />
        </div>
    ) : (
        <Skeleton className="w-[528px] py-3 my-[1px]">Search bar loading...</Skeleton>
    )
}