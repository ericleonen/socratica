import Icon from "@/theme/Icon";
import SecondaryButton from "@/theme/SecondaryButton";
import { usePathname, useRouter } from "next/navigation";

type NavButtonProps = {
    icon: React.ElementType,
    href: string,
    text: string,
    className?: string
}

export default function NavButton({ icon, href, text, className }: NavButtonProps) {
    const router = useRouter();
    const handleClick = () => router.push(href);

    const path = usePathname();
    const active = path === href;

    return (
        <SecondaryButton
            onClick={handleClick}
            className={`font-bold w-full px-3 py-2 mt-2 ${active && "bg-amber-200 hover:bg-yellow-300"} ${className || ""}`}
        >
            <Icon type={icon} className="mr-3"/>
            <p className="overflow-hidden whitespace-nowrap text-ellipsis w-full text-left">{text}</p>
        </SecondaryButton>
    )
}