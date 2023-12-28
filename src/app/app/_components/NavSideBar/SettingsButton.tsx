import { Config } from "@icon-park/react";
import NavButton from "./NavButton";
import { useContext } from "react";
import { modalContexts } from "../modals/ModalProviders";

export default function SettingsButton() {
    const { open } = useContext(modalContexts["settings"]);

    return (
        <NavButton
            icon={Config}
            onClick={open}
            text="Settings"
        />
    )
}