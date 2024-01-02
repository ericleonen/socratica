import { Trigger } from "@/types";
import { useContext } from "react";
import { modalContexts } from "../ModalProviders";

type BuyTokensButtonProps = {
    className?: string,
    onClick?: Trigger
}

export default function BuyTokensButton({ onClick, className }: BuyTokensButtonProps) {
    const { open } = useContext(modalContexts["tokens"]);

    return (
        <button 
            onClick={() => {
                open();
                if (onClick) onClick();
            }}
            className={`
                bg-blue-500/10 hover:bg-blue-500/30 focus-visible:bg-blue-500/30 text-blue-500
                rounded px-3 py-2 font-medium flex items-center w-min whitespace-nowrap focus:outline-none
                ${className || ""}
            `}
        >
            Buy more tokens
        </button>
    )
}