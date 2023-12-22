import Icon from "@/theme/Icon"
import { handleChange } from "@/utils/input"
import { Search } from "@icon-park/react"

type SearchBarProps = {
    query: string,
    setQuery: (newQuery: string) => void
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
    return (
        <div className="flex border-2 border-b-4 overflow-hidden rounded-md w-full border-slate-700 mb-1 items-center">
            <Icon type={Search} className="text-lg text-slate-700 border-r-2 border-slate-700 py-6 px-3 bg-amber-200"/>
            <input 
                autoFocus
                value={query}
                onChange={handleChange(setQuery)}
                type="text"
                placeholder="Type to search your documents"
                className="bg-white font-medium flex-grow focus:outline-none text-slate-700 py-6 px-3 placeholder:text-slate-500"
            />
        </div>
    )
}