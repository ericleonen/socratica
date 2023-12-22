import Icon from "@/theme/Icon"
import { Trigger } from "@/types"
import { Notes } from "@icon-park/react"

type SearchResultProps = {
    title: string,
    query: string,
    onClick: Trigger,
    selected: boolean,
    select: Trigger
}

export default function SearchResult({ title, query, onClick, selected, select }: SearchResultProps) {
    const matchIndex = title.indexOf(query);
    const preMatch = title.slice(0, matchIndex);
    const postMatch = title.slice(matchIndex + query.length);

    return (
        <button
            onClick={onClick}
            onMouseEnter={select}
            className={`w-full p-3 rounded-md flex items-center ${selected && "bg-gray-200"}`}
        >
            <Icon type={Notes} className="text-lg mr-3"/>
            {
                title ?
                <p className="text-slate-700">{preMatch}<b>{query}</b>{postMatch}</p> :
                "Untitled"
            }
        </button>
    )
}