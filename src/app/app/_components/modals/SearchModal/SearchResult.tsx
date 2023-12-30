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
            className={`text-slate-400 scroll-m-3 w-full px-3 py-2 rounded-md flex items-center ${selected && "bg-gray-200 dark:bg-amber-300/10 text-slate-700 dark:text-amber-300"}`}
        >
            <Icon type={Notes} className="text-lg mr-3"/>
            {
                title ?
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">{preMatch}<b>{query}</b>{postMatch}</p> :
                "Untitled"
            }
        </button>
    )
}