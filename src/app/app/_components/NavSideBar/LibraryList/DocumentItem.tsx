import { DocumentMetadataType } from "@/utils/store";
import { DocumentTextIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function DocumentItem({ id, title }: DocumentMetadataType) {
    return (
        <Link 
            href={`/app/library/${id}`}
            className="overflow-hidden flex w-full items-center px-3 py-2 rounded-md hover:bg-slate-50/10 text-medium text-theme-white"
        >
            <div><DocumentTextIcon className="h-5 w-5"/></div>
            <span className="ml-2 overflow-hidden whitespace-nowrap text-ellipsis flex-grow">{title}</span>
        </Link>
    )
}