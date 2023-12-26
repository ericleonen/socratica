"use client"

import LibraryList from "./LibraryList";
import NewDocButton from "./NewDocButton";
import { DoubleLeft, DoubleRight } from "@icon-park/react";
import AccountButton from "./AccountButton";
import SearchButton from "./SearchButton";
import SkeletonList from "@/components/SkeletonList";
import Skeleton from "@/components/Skeleton";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import SecondaryButton from "@/theme/SecondaryButton";
import Icon from "@/theme/Icon";
import TooltipProvider from "@/components/TooltipProvider";
import { useDocsMetadatasLoadingStatus } from "@/db/docs/read";
import HelpButton from "./HelpButton";
import SettingsButton from "./SettingsButton";

export default function NavSideBar() {
    const status = useDocsMetadatasLoadingStatus();
    const [showMain, setShowMain] = useState(true);
    const [showMini, setShowMini] = useState(false);

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
            className="w-[3.5rem] duration-75 border-r-2 border-slate-400 bg-stone-100 h-full shrink-0"
        >
            <TooltipProvider 
                text="Open sidebar"
                disabled={!showMini}
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
            className="duration-75 flex flex-col w-72 h-full p-3 pb-0 bg-stone-100 border-r-2 border-slate-400 overflow-hidden shrink-0"
        >
            <div className="flex items-center">
                <AccountButton />
                <TooltipProvider 
                    text="Close sidebar"
                    disabled={!showMain}
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
                    <HelpButton />
                    <SettingsButton />
                    <LibraryList />
                </> : (
                    <div className="flex flex-col">
                        <Skeleton className="py-2 mt-6">.</Skeleton>
                        <SkeletonList count={3} className="mt-3 py-1 w-2/3"/>
                        <Skeleton className="mt-12">.</Skeleton>
                        <div className="flex flex-col mt-2">
                            <SkeletonList count={3} className="mt-3 py-1 w-2/3"/>
                        </div>
                    </div>
                )
            }
        </Transition>
    </>);
}