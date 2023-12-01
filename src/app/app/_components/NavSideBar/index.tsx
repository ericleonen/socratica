"use client"

import Logo from "@/components/Logo";
import NewDocumentButton from "./NewDocumentButton";
import LibraryList from "./LibraryList";
import BuyTokensButton from "./BuyTokensButton";

export default function NavSideBar() {
    return (
        <div className="h-full flex flex-col px-3 bg-theme-black w-64">
            <div className="flex px-3 items-center h-14">
                <Logo />
                <BuyTokensButton/>
            </div>
            <NewDocumentButton />
            <LibraryList />
        </div>
    );
}