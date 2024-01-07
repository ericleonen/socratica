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
                    <SecondaryText>AI asks the questions.</SecondaryText>
                    <PrimaryText className="md:mt-3">You do the thinking.</PrimaryText>
                </div>
                <SecondaryText className="mt-3 font-medium md:text-lg"><Logo /> generates deep questions to help you understand any reading.</SecondaryText>
                <SignUpButton className="mt-5">
                    Create an account
                    <Icon type={ArrowRight} className="ml-2 text-lg"/>
                </SignUpButton>
                <SecondaryText className="font-medium mt-2">
                    Or
                    <Link href="/login" className="text-blue-500 hover:text-sky-600 mx-1">log in</Link>
                    to an existing account
                </SecondaryText>
            </div>
            <img 
                className="md:ml-9 w-3/5 md:w-1/4 h-min mb-3 dark:hidden" 
                src="./beanieMonkey.png"
            />
            <img 
                className="md:ml-9 w-3/5 md:w-1/4 h-min mb-3 hidden dark:block" 
                src="./whiteMonkey.png"
            />
        </div>
    )
}