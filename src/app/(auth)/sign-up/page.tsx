"use client"

import { FormEvent, useEffect, useState } from "react";
import AuthContent from "../_components/AuthContent";
import AuthHeader from "../_components/AuthHeader";
import EmailField from "../_components/EmailField";
import HorizontalDivider from "../_components/HorizontalDivider";
import PasswordField from "../_components/PasswordField";
import Form from "../_components/Form";
import SubmitButton from "../_components/SubmitButton";
import { signInWithGoogle, signUpWithEmailAndPassword, useAutoLogin } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { AUTH_ERROR_MESSAGE, MIN_PASSWORD_LENGTH } from "@/config/authConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";
import SignInWithGoogle from "../_components/SignInWithGoogle";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const [authUser, authLoading, authError] = useAuthState(auth);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (email.length === 0) {
            setError(AUTH_ERROR_MESSAGE.EMAIL_EMPTY);
        } else if (password.length === 0) {
            setError(AUTH_ERROR_MESSAGE.PASSWORD_EMPTY);
        }
        else if (password !== confirmPassword) {
            setError(AUTH_ERROR_MESSAGE.PASSWORD_MISMATCH);
        } else if (password.length < MIN_PASSWORD_LENGTH) {
            setError(AUTH_ERROR_MESSAGE.PASSWORD_TOO_SHORT);
        } else {
            const signUpError = await signUpWithEmailAndPassword(email, password);

            if (signUpError) {
                setError(signUpError);
            } else {
                router.push("/app");
            }
        }
    }

    useAutoLogin(router, authUser, authError);

    return (<>
        <AuthHeader>Sign up</AuthHeader>
        <AuthContent>
            <SignInWithGoogle onClick={signInWithGoogle}>Sign up with Google</SignInWithGoogle>
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
            </Form>
            { error }
        </AuthContent>
    </>);
}