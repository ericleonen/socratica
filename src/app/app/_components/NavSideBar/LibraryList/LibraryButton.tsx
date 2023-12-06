import Link from "next/link";

export default function LibraryButton() {
    return (
        <Link
            href="/app/library"
            className="mt-6 rounded-md hover:bg-slate-50/10 flex p-3 text-slate-50/60 font-medium text-sm"
        >
            My Library
        </Link>
    )
}