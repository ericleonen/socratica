import Icon from "@/theme/Icon"
import { Trigger } from "@/types"
import { Notes } from "@icon-park/react"
import { useEffect, useRef } from "react"

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

    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const button = buttonRef.current;

        if (selected && button) {
            button.scrollIntoView({ behavior: "smooth" });
        }
    }, [selected])

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            onMouseEnter={select}
            className={`scroll-m-3 w-full p-3 border-r-2 border-y-2 rounded-r-md flex items-center ${selected ? "bg-yellow-50 border-slate-700" : "border-transparent"}`}
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