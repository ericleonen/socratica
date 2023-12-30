import Link from "next/link"
import React from "react"

type SignUpButtonProps = {
    children: React.ReactNode
    className?: string,
    size?: "small"
}

export default function SignUpButton({ children, className, size }: SignUpButtonProps) {
    return (
        <Link
            href="/signup"
            className={`
              text-white bg-sky-600 hover:bg-sky-500
                text-base whitespace-nowrap rounded-md shadow-md
                px-3 w-min
                flex items-center 
                ${size === "small" ? "py-1 font-medium" : "py-2 font-bold"}
                ${className || ""}
            `}
        >
            {children}
        </Link>
    )
}