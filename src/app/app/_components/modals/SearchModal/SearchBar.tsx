import Icon from "@/theme/Icon"
import { handleChange } from "@/utils/input"
import { Search } from "@icon-park/react"

type SearchBarProps = {
    query: string,
    setQuery: (newQuery: string) => void
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
    return (
        <div className="p-3 border-b-2 border-slate-700 w-full bg-amber-200">
            <div className="flex border-2 border-b-4 rounded-md overflow-hidden w-full border-slate-700 items-center bg-white">
                <Icon type={Search} className="text-lg text-slate-500 py-3 px-3"/>
                <input 
                    autoFocus
                    value={query}
                    onChange={handleChange(setQuery)}
                    type="text"
                    placeholder="Type to search your documents"
                    className="bg-transparent font-semibold flex-grow focus:outline-none text-slate-700 py-3 pr-3 placeholder:text-slate-500"
                />
            </div>
        </div>
    )
}