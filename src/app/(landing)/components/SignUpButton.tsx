import ActionButton from "@/theme/ActionButton"
import { LayoutProps } from "@/types"
import Link from "next/link"
import React from "react"

export default function SignUpButton({ children, className }: LayoutProps) {
    return (
        <Link
            href="/signup"
            className={className || ""}
        >
            <ActionButton bolded>
                <span className="font-bold flex items-center">
                    {children}
                </span>
            </ActionButton>
        </Link>
    )
}