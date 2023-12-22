import { Config } from "@icon-park/react";
import NavButton from "./NavButton";
import { useModalContext } from "../modals/ModalContext";

export default function SettingsButton() {
    const { setSettingsModal } = useModalContext();
    const open = () => setSettingsModal(true);

    return (
        <NavButton
            icon={Config}
            onClick={open}
            text="Settings"
        />
    )
}