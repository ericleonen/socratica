import Icon from "@/theme/Icon";
import SecondaryButton from "@/theme/SecondaryButton";
import { Trigger } from "@/types";
import { usePathname, useRouter } from "next/navigation";

type NavButtonProps = {
    icon: React.ElementType,
    onClick: Trigger,
    text: string,
    active?: boolean,
    className?: string
}

export default function NavButton({ icon, onClick, text, active, className }: NavButtonProps) {
    return (
        <SecondaryButton
            onClick={onClick}
            className={`font-bold w-full px-3 py-2 mt-2 ${active && "bg-amber-200 hover:bg-amber-300 text-slate-700"} ${className || ""}`}
        >
            <Icon type={icon} className="mr-3"/>
            <p className="overflow-hidden whitespace-nowrap text-ellipsis w-full text-left">{text}</p>
        </SecondaryButton>
    )
}