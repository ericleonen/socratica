import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

type LibraryTableRowOptionsButtonProps = {
    onClick: () => void
}

export default function LibraryTableRowOptionsButton({ onClick }: LibraryTableRowOptionsButtonProps) {
    return (
        <button 
            onClick={onClick}
            className="p-1 h-min rounded-md hover:bg-gray-300 text-slate-400 absolute right-2 top-1/2 translate-y-[-50%]"
        >
            <EllipsisVerticalIcon className="w-5 h-5"/>
        </button>
    )
}