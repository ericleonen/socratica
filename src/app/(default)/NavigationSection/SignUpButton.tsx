import Link from "next/link";

export default function SignUpButton() {
    return (
        <Link
            href="/sign-up"
            className="border-2"
        >
            Sign up
        </Link>
    )
}