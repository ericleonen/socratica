import { useCreateDoc } from "@/db/docs";
import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/20/solid";

export default function NewDocButton() {
    const [inProgress, createDoc] = useCreateDoc();

    return (
        <button
            onClick={() => createDoc()}
            className="font-medium mt-4 flex items-center rounded-md text-theme-white p-3 bg-slate-50/5 shadow-md hover:bg-slate-50/10"
        >{
            inProgress ? <>
                <Cog6ToothIcon className="h-4 w-4 mr-3 animate-spin"/> Creating
            </> : <>
                <PlusIcon className="h-5 w-5 mr-2"/> New Document
            </>
            
        }</button>
    )
}