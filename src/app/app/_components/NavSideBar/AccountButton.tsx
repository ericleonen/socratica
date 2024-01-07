import { useUserEmail, useUserLoadingStatus, useUserName } from "@/db/user/read";
import SecondaryButton from "@/theme/SecondaryButton";
import { useContext } from "react";
import { modalContexts } from "../modals/ModalProviders";
import Logo from "@/components/Logo";
import Skeleton from "@/components/Skeleton";
import TooltipProvider from "@/components/TooltipProvider";

export default function AccountButton() {
    const name = useUserName();
    const status = useUserLoadingStatus();
    const email = useUserEmail();

    const { open } = useContext(modalContexts["account"]);

    return status === "succeeded" ? (
        <TooltipProvider
            text="Your account"
            containerClassName="mr-auto"
            className="right-0 translate-y-1"
        >
            <SecondaryButton
                onClick={open}
                size="lg"
                className="overflow-hidden w-full h-12"
            >
                <div className="flex flex-col w-[calc(100%-2rem)]">
                    <p className="font-bold whitespace-nowrap overflow-hidden text-ellipsis text-start text-slate-700 dark:text-slate-300">
                        {name ? `${name}'s` : ""}
                        &nbsp;
                        <Logo />
                    </p>
                    <p className="text-xs text-slate-500 text-start">{email}</p>
                </div>
            </SecondaryButton>
        </TooltipProvider>
    ) : (
        <Skeleton className="w-full h-12"></Skeleton>
    )
}