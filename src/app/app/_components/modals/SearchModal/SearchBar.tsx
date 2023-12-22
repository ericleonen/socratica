import Icon from "@/theme/Icon"
import { handleChange } from "@/utils/input"
import { Search } from "@icon-park/react"

type SearchBarProps = {
    query: string,
    setQuery: (newQuery: string) => void
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
    return (
        <div className="w-full p-5 border-b-2 border-slate-700 bg-amber-200">
            <div className="flex border-2 border-b-4 overflow-hidden rounded-md w-full border-slate-700">
                <div className="flex items-center justify-center pl-3 bg-white">
                    <Icon type={Search} className="text-xl text-slate-500"/>
                </div>
                <input 
                    autoFocus
                    value={query}
                    onChange={handleChange(setQuery)}
                    type="text"
                    placeholder="Type to search your documents"
                    className="bg-white font-bold flex-grow focus:outline-none text-slate-700 p-3 placeholder:text-slate-500"
                />
            </div>
        </div>
    )
}