import { PlusIcon } from "@heroicons/react/20/solid";

export default function NewDocumentButton() {
    return (
        <button
            className="mt-4 flex items-center rounded-md text-theme-white p-3 bg-slate-50/5 shadow-md hover:bg-slate-50/10"
        >
            <PlusIcon className="h-5 w-5"/>
            <span className="ml-2 font-medium">New document</span>
        </button>
    )
}