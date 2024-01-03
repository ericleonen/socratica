import { useGoogleAuth } from "@/auth";
import Icon from "@/theme/Icon";
import { LayoutProps } from "@/types";
import { LoadingFour } from "@icon-park/react";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "500", subsets: ["latin"] });

export default function GoogleButton({ className }: LayoutProps) {
    const [signingIn, signIn, error] = useGoogleAuth();

    return (
        <button
            onClick={signIn}
            className={`
                text-[#1F1F1F] dark:text-[#E3E3E3] border-[#747775] dark:border-[#8E918F] bg-[#FFFFFF] dark:bg-[#131314] hover:bg-gray-200 hover:dark:bg-stone-800 rounded-md font-medium
                h-[40px] pr-[12px] border-[1px] w-full focus:outline-none focus-visible:bg-gray-200 focus-visible:dark:bg-stone-800 flex items-center
                ${roboto.className}
                ${className || ""}
            `}
        >{
            signingIn ? <>
                <Icon type={LoadingFour} className="h-[20px] w-[20px] mr-[10px] text-lg animate-spin ml-[12px]"/>
                Signing in with Google
            </> : <>
                <img 
                    src="./google.png"
                    className="h-[40px] w-[40px] ml-[2px]"
                />
                Continue with Google
            </>
        }</button>
    )
}