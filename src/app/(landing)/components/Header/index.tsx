import Logo from "@/components/Logo";
import SignUpButton from "../SignUpButton";
import NavLink from "./NavLink";

export default function Header() {
    return (
        <div className="py-2 px-5 border-b-2 border-transparent w-full flex items-center bg-stone-100 justify-center">
            <Logo className="text-lg" />
            <div className="ml-6 md:flex items-center h-full hidden">
                <NavLink 
                    href="#product"
                >
                    Product
                </NavLink>
                <NavLink 
                    href="#philosophy"
                    className="ml-3"
                >
                    Philosophy
                </NavLink>
                <NavLink 
                    href="#pricing"
                    className="ml-3"
                >
                    Pricing
                </NavLink>
            </div>
            <div className="ml-auto items-center h-full md:flex hidden">
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