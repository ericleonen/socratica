"use client"

import Logo from "@/components/Logo";
import NewDocumentButton from "./NewDocumentButton";
import LibraryList from "./LibraryList";
import MyAccountButton from "./MyAccountButton";
import { useUserData } from "@/utils/store";
import BuyTokensButton from "./BuyTokensButton";

export default function NavSideBar() {
    const userData = useUserData();

    return (
        <div className="h-full flex flex-col border-2">
            <Logo />
            <BuyTokensButton tokens={userData?.tokens} />
            <NewDocumentButton />
            <LibraryList documents={userData?.documents}/>
            <MyAccountButton />
        </div>
    );
}