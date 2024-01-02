import { signInWithGoogle, useGoogleAuth } from "@/auth";
import PrimaryText from "@/components/text/PrimaryText";
import Icon from "@/theme/Icon";
import { LayoutProps } from "@/types";
import { LoadingFour } from "@icon-park/react";
import { useEffect } from "react";

export default function GoogleButton({ className }: LayoutProps) {
    const [signingIn, signIn, error] = useGoogleAuth();

    return (
        <button
            onClick={signIn}
            className={`
                text-slate-700 border-slate-300 bg-white hover:bg-gray-200 shadow-md rounded-md font-medium
                py-2 px-3 border-2 w-full focus:shadow-focus focus:outline-none focus:border-amber-300
                ${className || ""}
            `}
        >
            <PrimaryText>
                {
                    signingIn ? <>
                        <Icon type={LoadingFour} className="mr-2 text-lg animate-spin"/>
                        Signing in with Google
                    </> : <>
                        <img 
                            src="./google.png"
                            className="h-6 w-6 mr-2"
                        />
                        Continue with Google
                     </>
                }
            </PrimaryText>
        </button>
    )
}