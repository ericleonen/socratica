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
import { logInWithEmailAndPassword, signInWithGoogle, useAutoLogin } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { AUTH_ERROR_MESSAGE } from "@/config/authConfig";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email.length === 0) {
            setError(AUTH_ERROR_MESSAGE.EMAIL_EMPTY);
        } else if (password.length === 0) {
            setError(AUTH_ERROR_MESSAGE.PASSWORD_EMPTY);
        } else {
            const signInError = await logInWithEmailAndPassword(email, password);
            
            if (signInError) {
                setError(signInError);
            } else {
                router.push("/app");
            }
        }
    }

    useAutoLogin();

    return (<>
        <AuthHeader>Login</AuthHeader>
        <AuthContent>
            <SignInWithGoogle onClick={signInWithGoogle}>Sign in with Google</SignInWithGoogle>
            <HorizontalDivider />
            <Form
                onSubmit={handleSubmit}
            >
                <EmailField {...{email, setEmail}} />
                <PasswordField {...{password, setPassword}} />
                <SubmitButton>Log in</SubmitButton>
            </Form>
            { error }
        </AuthContent>
    </>);
}