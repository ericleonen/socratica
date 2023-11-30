import { auth } from "@/utils/firebase";
import { createNewDocument } from "@/utils/store";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function NewDocumentButton() {
    const router = useRouter();
    const [authUser, authLoading, authError] = useAuthState(auth);

    const handleClick = async () => {
        if (!authUser) return;

        const docID = await createNewDocument(authUser);
        if (docID) router.push(`/app/library/${docID}`);
    }

    return (
        <button
            onClick={handleClick}
            className="mt-4 flex items-center rounded-md text-theme-white p-3 bg-slate-50/5 shadow-md hover:bg-slate-50/10"
        >
            <PlusIcon className="h-5 w-5"/>
            <span className="ml-2 font-medium">New document</span>
        </button>
    )
}