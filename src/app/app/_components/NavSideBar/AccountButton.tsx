import SecondaryButton from "@/theme/SecondaryButton";
import { useRouter } from "next/navigation";

export default function AccountButton() {
    const router = useRouter();

    const handleClick = () => router.push("/app/account")

    return (
        <SecondaryButton
            onClick={handleClick}
            className="mr-auto"
        >
            <div className="rounded-full h-8 w-8 border-[3px] border-slate-400 mr-2 bg-gray-300" />
            <div className="flex flex-col items-start">
                <p className="text-slate-700 font-bold text-base">eleonen's <mark className="bg-amber-200 text-black/80">highlights</mark></p>
                <p className="text-xs font-medium">ericleonen@gmail.com</p>
            </div>
        </SecondaryButton>
    )
}