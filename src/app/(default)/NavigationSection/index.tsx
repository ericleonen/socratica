import NavLink from "./NavLink";
import SignUpButton from "./SignUpButton";
import VerticalDivider from "./VerticalDivider";

export default function NavigationSection() {
    return (
        <div className="flex ml-auto">
            <NavLink href="/#philosophy">Philosophy</NavLink>
            <NavLink href="/#features">Features</NavLink>
            <VerticalDivider />
            <NavLink href="/login">Login</NavLink>
            <SignUpButton />
        </div>
    );
}