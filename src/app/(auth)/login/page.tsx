"use client"

import { useState } from "react";
import AuthContent from "../_components/AuthContent";
import AuthHeader from "../_components/AuthHeader";
import Form from "../_components/Form";
import EmailField from "../_components/EmailField";
import HorizontalDivider from "../_components/HorizontalDivider";
import PasswordField from "../_components/PasswordField";
import SubmitButton from "../_components/SubmitButton";
import SignInWithGoogle from "../_components/SignInWithGoogle";
import { logInLocally, signInWithGoogle, useAutoLogIn } from "@/auth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<Error>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const loginError = await logInLocally(email, password);
        if (loginError) setError(loginError);
    }

    useAutoLogIn();

    return (<>
        <AuthHeader>Login</AuthHeader>
        <AuthContent>
            <SignInWithGoogle 
                onClick={signInWithGoogle}
            >
                Sign in with Google
            </SignInWithGoogle>
            <HorizontalDivider />
            <Form
                onSubmit={handleSubmit}
            >
                <EmailField {...{email, setEmail}} />
                <PasswordField {...{password, setPassword}} />
                <SubmitButton>Log in</SubmitButton>
            </Form>
        </AuthContent>
    </>);
}