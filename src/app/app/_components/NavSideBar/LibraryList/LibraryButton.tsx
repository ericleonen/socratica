import SecondaryButton from "@/theme/SecondaryButton";
import { BookOpen } from "@icon-park/react";
import { useRouter } from "next/navigation";

export default function LibraryButton() {
    const router = useRouter();

    const handleClick = () => router.push("/app/library");

    return (
        <SecondaryButton
            onClick={handleClick}
            className="font-bold text-sm w-full px-3 py-2"
        >
            <BookOpen strokeWidth={5} className="mr-3 text-lg"/> Library
        </SecondaryButton>
    )
}