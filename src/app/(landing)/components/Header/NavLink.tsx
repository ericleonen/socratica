import Link from "next/link"

type NavLinkProps = {
    href: string,
    children: React.ReactNode,
    className?: string
}

export default function NavLink({ href, children, className }: NavLinkProps) {
    return (
        <Link 
            {...{href}}
            className={`px-2 py-1 hover:bg-gray-200 flex items-center text-slate-700 font-medium rounded-md ${className || ""}`}
        >
            {children}
        </Link>
    )
}