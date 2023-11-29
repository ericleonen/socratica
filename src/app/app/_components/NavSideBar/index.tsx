"use client"

import Logo from "@/components/Logo";
import NewDocumentButton from "./NewDocumentButton";
import LibraryList from "./LibraryList";
import { useUserData } from "@/utils/store";
import BuyTokensButton from "./BuyTokensButton";

export default function NavSideBar() {
    const userData = useUserData();

    return (
        <div className="h-full flex flex-col p-3 bg-theme-black w-64">
            <div className="flex p-3 items-center">
                <Logo />
                <BuyTokensButton tokens={userData?.tokens} />
            </div>
            <NewDocumentButton />
            <LibraryList documents={userData?.documents}/>
        </div>
    );
}