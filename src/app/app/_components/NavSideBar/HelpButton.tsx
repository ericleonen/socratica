import { Help } from "@icon-park/react";
import NavButton from "./NavButton";
import { useModalContext } from "../modals/ModalContext";

export default function HelpButton() {
    const { setHelpModal } = useModalContext();
    const open = () => setHelpModal(true);

    return (
        <NavButton
            icon={Help}
            onClick={open}
            text="Help"
        />
    )
}