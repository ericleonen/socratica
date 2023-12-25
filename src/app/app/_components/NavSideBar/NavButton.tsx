import Icon from "@/theme/Icon";
import SecondaryButton from "@/theme/SecondaryButton";
import { Trigger } from "@/types";

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
            size="xl"
            weight={active ? "heavy" : "normal"}
            className={`w-full mt-2 ${className || ""}`}
        >
            <Icon type={icon} className="mr-3"/>
            <p className="overflow-hidden whitespace-nowrap text-ellipsis w-full text-left">{text}</p>
        </SecondaryButton>
    )
}