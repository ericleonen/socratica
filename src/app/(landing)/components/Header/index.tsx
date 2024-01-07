import Logo from "@/components/Logo";
import SignUpButton from "../SignUpButton";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <div className="py-2 px-5 border-b-2 border-transparent w-full flex items-center bg-stone-100 dark:bg-slate-800 justify-center">
            <Logo className="text-lg" />
            <div className="ml-auto items-center h-full md:flex hidden">
                <ThemeToggle />
                <NavLink 
                    href="/login"
                >
                    Login
                </NavLink>
                <SignUpButton
                    className="ml-3"
                >
                    Create an account
                </SignUpButton>
            </div>
        </div>
    )
}