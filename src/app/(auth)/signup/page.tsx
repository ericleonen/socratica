"use client"

import { useAutoLogIn, useSignUp } from "@/auth";
import Logo from "@/components/Logo";
import PrimaryText from "@/components/text/PrimaryText";
import Icon from "@/theme/Icon";
import { LoadingFour } from "@icon-park/react";
import { useEffect, useState } from "react";
import GoogleButton from "../_components/GoogleButton";
import InputField from "../_components/InputField";
import OrDivider from "../_components/OrDivider";
import SubmitButton from "../_components/SubmitButton";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [signingUp, signUp, error] = useSignUp(
        name, email, password, confirmPassword
    );
    useAutoLogIn();

    useEffect(() => {
        if (error) console.error(error);
    }, [error]);

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-stone-100 p-3">
            <div className="px-5 w-full max-w-96">
                <div className="flex justify-center p-3">
                    <PrimaryText className="text-lg font-bold">Sign up for <Logo className="ml-1"/></PrimaryText>
                </div>
                <GoogleButton />
                <OrDivider />
                <form 
                    onSubmit={signUp}
                    className="w-full flex flex-col"
                >
                    <InputField 
                        type="name"
                        value={name}
                        setValue={setName}
                    />
                    <InputField 
                        type="email"
                        value={email}
                        setValue={setEmail}
                        className="mt-3"
                    />
                    <InputField 
                        type="password"
                        value={password}
                        setValue={setPassword}
                        className="mt-3"
                    />
                    <InputField 
                        type="password"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        placeholder="Confirm Password"
                        className="mt-3"
                    />
                    <SubmitButton className="mt-8">{
                        signingUp ? <>
                            <Icon type={LoadingFour} className="animate-spin text-lg mr-2" /> Creating account
                        </> : "Create account"
                    }</SubmitButton>
                </form>
            </div>
        </div>    
    )
}