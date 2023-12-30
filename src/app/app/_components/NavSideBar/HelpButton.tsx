import { Help } from "@icon-park/react";
import NavButton from "./NavButton";

export default function HelpButton() {
    const open = () => {};

    return (
        <NavButton
            icon={Help}
            onClick={open}
            text="Help"
        />
    )
}