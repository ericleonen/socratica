import TooltipProvider from "@/components/TooltipProvider";
import { DocumentTextIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type DocumentItemProps = {
    title: string,
    ID: string,
    current?: boolean,
    onClick?: () => void
}

export default function DocumentItem({ title, ID, current, onClick }: DocumentItemProps) {
    return (
        <TooltipProvider 
            text={title} 
            className={`${!title && "opacity-0"} right-0 top-0 translate-y-[-100%] max-w-full whitespace-pre-wrap break-words`}
        >
            <Link 
                scroll={false}
                href={`/app/library/${ID}`}
                onClick={onClick}
                className={`${current && "bg-slate-50/5"} overflow-hidden flex w-full items-center px-3 py-2 rounded-md hover:bg-slate-50/10 text-medium text-theme-white mt-1`}
            >
                <div><DocumentTextIcon className="h-5 w-5"/></div>
                <span className="ml-2 overflow-hidden whitespace-nowrap text-ellipsis flex-grow">{title.length ? title : "Untitled"}</span>
            </Link>
        </TooltipProvider>
    )
}