"use client"

import { useEffect, useState } from "react";
import SubmitButton from "../_components/SubmitButton";
import { useAutoLogIn, useLogIn } from "@/auth";
import GoogleButton from "../_components/GoogleButton";
import PrimaryText from "@/components/text/PrimaryText";
import Logo from "@/components/Logo";
import InputField from "../_components/InputField";
import Icon from "@/theme/Icon";
import { LoadingFour } from "@icon-park/react";
import OrDivider from "../_components/OrDivider";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loggingIn, logIn, error] = useLogIn(email, password);
    useAutoLogIn();

    useEffect(() => {
        if (error) console.error(error);
    }, [error]);

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-stone-100 p-3">
            <div className="px-5 w-full max-w-96">
                <div className="flex justify-center p-3">
                    <PrimaryText className="text-lg font-bold">Log in to <Logo className="ml-1"/></PrimaryText>
                </div>
                <GoogleButton />
                <OrDivider />
                <form 
                    onSubmit={logIn}
                    className="w-full flex flex-col"
                >
                    <InputField 
                        type="email"
                        value={email}
                        setValue={setEmail}
                    />
                    <InputField 
                        type="password"
                        value={password}
                        setValue={setPassword}
                        className="mt-3"
                    />
                    <SubmitButton className="mt-8">{
                        loggingIn ? <>
                            <Icon type={LoadingFour} className="animate-spin text-lg mr-2" /> Logging you in
                        </> : "Log in"
                    }</SubmitButton>
                </form>
            </div>
        </div>    
    );
}