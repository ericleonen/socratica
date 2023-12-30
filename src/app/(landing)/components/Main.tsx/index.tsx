"use client"

import Logo from "@/components/Logo";
import SignUpButton from "../SignUpButton";
import Icon from "@/theme/Icon";
import { ArrowRight } from "@icon-park/react";
import Link from "next/link";
import SecondaryText from "@/components/text/SecondaryText";
import PrimaryText from "@/components/text/PrimaryText";

export default function Main() {
    return (
        <div className="h-full w-full flex flex-col-reverse md:flex-row justify-center items-center px-9 pb-9">
            <div className="flex flex-col">
                <div className="text-3xl md:text-5xl font-bold">
                    <SecondaryText>AI <Logo /> the important&nbsp;stuff.</SecondaryText>
                    <PrimaryText className="md:mt-3">You do the thinking.</PrimaryText>
                </div>
                <SecondaryText className="mt-3 font-medium md:text-lg">Get a deep understanding of any reading assignment.</SecondaryText>
                <SignUpButton className="mt-5">
                    Create an account
                    <Icon type={ArrowRight} className="ml-2 text-lg"/>
                </SignUpButton>
                <SecondaryText className="font-medium mt-2">
                    <Link href="/login" className="text-sky-600 hover:text-sky-500 mr-1">Log in</Link>
                    to an existing account
                </SecondaryText>
            </div>
            <img 
                className="md:ml-9 w-3/5 md:w-1/4 h-min mb-3" 
                src="./nigga.png"
            />
        </div>
    )
}