import { DocumentTextIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type DocumentItemProps = {
    id: string,
    title: string,
    current?: boolean,
    onClick?: () => void
}

export default function DocumentItem({ id, title, current, onClick }: DocumentItemProps) {
    return (
        <Link 
            href={`/app/library/${id}`}
            onClick={onClick}
            className={`${current && "bg-slate-50/5"} overflow-hidden flex w-full items-center px-3 py-2 rounded-md hover:bg-slate-50/10 text-medium text-theme-white mb-1`}
        >
            <div><DocumentTextIcon className="h-5 w-5"/></div>
            <span className="ml-2 overflow-hidden whitespace-nowrap text-ellipsis flex-grow">{title.length ? title : "Untitled"}</span>
        </Link>
    )
}