"use client"

import LibraryList from "./LibraryList";
import NewDocButton from "./NewDocButton";
import NavButton from "./NavButton";
import { Config, Help, Search } from "@icon-park/react";
import AccountButton from "./AccountButton";
import SearchButton from "./SearchButton";

export default function NavSideBar() {
    return (
        <div className="sticky flex flex-col w-72 h-full p-3 pb-0 bg-stone-100 border-r-2 border-slate-400">
            <AccountButton />
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
    );
}