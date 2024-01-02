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
        <div className="w-full p-3">
            <div className={`flex rounded-md w-full items-center bg-white dark:bg-slate-800 border-2 ${focused ? "shadow-focus border-amber-300" : "border-slate-300"}`}>
                <Icon type={Search} className="text-base text-slate-400 dark:text-slate-600 py-3 px-3"/>
                <input 
                    autoFocus
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    type="text"
                    value={query}
                    onChange={handleChange(setQuery)}
                    placeholder="Type to search your documents"
                    spellCheck={false}
                    className="text-slate-700 dark:text-slate-300 placeholder:text-slate-400 placeholder:dark:text-slate-600 focus:border-amber-300 bg-transparent rounded font-medium py-2 focus:outline-none"
                />
            </div>
        </div>
    )
}