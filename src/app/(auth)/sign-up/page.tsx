"use client"

import { FormEvent, useState } from "react";
import AuthContent from "../_components/AuthContent";
import AuthHeader from "../_components/AuthHeader";
import EmailField from "../_components/EmailField";
import HorizontalDivider from "../_components/HorizontalDivider";
import PasswordField from "../_components/PasswordField";
import Form from "../_components/Form";
import SubmitButton from "../_components/SubmitButton";
import { signInWithGoogle, signUpLocally, useAutoLogIn } from "@/auth";
import SignInWithGoogle from "../_components/SignInWithGoogle";

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<Error>();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const signUpError = await signUpLocally(name, email, password, confirmPassword);
        if (signUpError) setError(signUpError);
    }

    const handleSignUpWithGoogle = async () => {
        const signUpError = await signInWithGoogle();
        if (signUpError) setError(signUpError);
    }

    useAutoLogIn();

    return (<>
        <AuthHeader>Sign up</AuthHeader>
        <AuthContent>
            <SignInWithGoogle 
                onClick={handleSignUpWithGoogle}
            >
                Sign up with Google
            </SignInWithGoogle>
            <HorizontalDivider />
            <Form onSubmit={handleSubmit}>
                <EmailField {...{email, setEmail}} />
                <PasswordField {...{password, setPassword}} />
                <PasswordField
                    password={confirmPassword}
                    setPassword={setConfirmPassword}
                    confirm
                />
                <SubmitButton>Sign up</SubmitButton>
                { error?.message }
            </Form>
        </AuthContent>
    </>);
}