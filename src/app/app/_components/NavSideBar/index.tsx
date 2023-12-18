"use client"

import LibraryList from "./LibraryList";
import NewDocButton from "./NewDocButton";
import NavButton from "./NavButton";
import { Config, DoubleLeft, DoubleRight, Help, Search } from "@icon-park/react";
import AccountButton from "./AccountButton";
import SearchButton from "./SearchButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ResourceStatus } from "@/store/types";
import SkeletonList from "@/components/SkeletonList";
import Skeleton from "@/components/Skeleton";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import SecondaryButton from "@/theme/SecondaryButton";
import Icon from "@/theme/Icon";
import TooltipProvider from "@/components/TooltipProvider";

export default function NavSideBar() {
    const status = useSelector<RootState, ResourceStatus>(
        state => state.docsMetadatas.status
    );
    const [showMain, setShowMain] = useState(false);
    const [showMini, setShowMini] = useState(true);

    return (<>
        <Transition
            show={showMini}
            enter="transition-all"
            enterFrom="ml-[-3.5rem]"
            enterTo="ml-0"
            leave="transition-all"
            leaveFrom="ml-0"
            leaveTo="ml-[-3.5rem]"
            afterLeave={() => setShowMain(true)}
            className="w-[3.5rem] duration-75 border-r-2 border-slate-700 bg-stone-100 h-full"
        >
            <TooltipProvider 
                text="Open sidebar"
                className="left-3 z-50 top-[100%] translate-y-1"
            >
                <SecondaryButton
                    onClick={() => setShowMini(false)}
                    className="mx-auto my-3"
                >
                    <Icon type={DoubleRight} className="text-xl"/>
                </SecondaryButton>
            </TooltipProvider>
        </Transition>
        <Transition
            show={showMain}
            enter="transition-all"
            enterFrom="ml-[-18rem]"
            enterTo="ml-0"
            leave="transition-all"
            leaveFrom="ml-0"
            leaveTo="ml-[-18rem]"
            afterLeave={() => setShowMini(true)}
            className="duration-75 sticky flex flex-col w-72 h-full p-3 pb-0 bg-stone-100 border-r-2 border-slate-700 overflow-hidden"
        >
            <div className="flex items-center">
                <AccountButton />
                <TooltipProvider 
                    text="Close sidebar"
                    className="right-0 translate-y-1"
                >
                    <SecondaryButton 
                        onClick={() => setShowMain(false)}
                    >
                        <Icon type={DoubleLeft} className="text-xl" />
                    </SecondaryButton>
                </TooltipProvider>
            </div>
            {
                status === "succeeded" ? <>
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
                </> : (
                    <div className="mt-3">
                        <SkeletonList count={4} className="px-3 py-2 mt-2 w-full"/>
                        <Skeleton className="w-full text-sm py-1 mt-10">spooky</Skeleton>
                        <SkeletonList count={3} className="px-3 py-2 mt-2 w-full"/>
                    </div>
                )
            }
        </Transition>
    </>);
}