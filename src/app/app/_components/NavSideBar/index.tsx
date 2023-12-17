"use client"

import LibraryList from "./LibraryList";
import NewDocButton from "./NewDocButton";
import NavButton from "./NavButton";
import { Config, Help, Search } from "@icon-park/react";
import AccountButton from "./AccountButton";
import SearchButton from "./SearchButton";

export default function NavSideBar() {
    return (
        <div className="sticky flex flex-col w-72 h-full p-3 shadow-lg bg-stone-100">
            <AccountButton />
            <div className="my-5 w-full flex flex-col">
                <NewDocButton/>
                <SearchButton />
                <NavButton 
                    href="/app/help"
                    icon={Help}
                    text="Help"
                />
                <NavButton 
                    href="/app/settings"
                    icon={Config}
                    text="Settings"
                />
                <LibraryList />
            </div>
        </div>
    );
}