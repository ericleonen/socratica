import { Help } from "@icon-park/react";
import NavButton from "./NavButton";
import { useContext } from "react";
import { modalContexts } from "../modals/ModalProviders";

export default function HelpButton() {
    const { open } = useContext(modalContexts["help"]);

    return (
        <NavButton
            icon={Help}
            onClick={open}
            text="Help"
        />
    )
}