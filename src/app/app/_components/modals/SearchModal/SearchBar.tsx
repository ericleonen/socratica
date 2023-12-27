import Icon from "@/theme/Icon"
import { handleChange } from "@/utils/input"
import { Search } from "@icon-park/react"
import { useState } from "react"

type SearchBarProps = {
    query: string,
    setQuery: (newQuery: string) => void
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
    const [focused, setFocused] = useState(false);

    return (
        <div className={`transition-colors p-1 border-b-2 border-slate-400 ${focused && "bg-amber-200"}`}>
            <div className="flex rounded-md overflow-hidden w-full items-center bg-transparent">
                <Icon type={Search} className="text-base text-slate-400 py-3 px-3"/>
                <input 
                    autoFocus
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    value={query}
                    onChange={handleChange(setQuery)}
                    type="text"
                    placeholder="Type to search your documents"
                    className="bg-transparent font-medium flex-grow focus:outline-none text-slate-700 py-3 pr-3 placeholder:text-slate-400"
                />
            </div>
        </div>
    )
}