import Icon from "@/theme/Icon"
import { handleChange } from "@/utils/input"
import { Search } from "@icon-park/react"

type SearchBarProps = {
    query: string,
    setQuery: (newQuery: string) => void
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
    return (
        <div className="flex border-b-2 overflow-hidden w-full border-slate-400 items-center bg-white">
            <Icon type={Search} className="text-base text-slate-400 py-3 px-3"/>
            <input 
                autoFocus
                value={query}
                onChange={handleChange(setQuery)}
                type="text"
                placeholder="Type to search your documents"
                className="bg-transparent font-medium flex-grow focus:outline-none text-slate-700 py-3 pr-3 placeholder:text-slate-400"
            />
        </div>
    )
}