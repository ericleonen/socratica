import { Search } from "@icon-park/react";
import NavButton from "./NavButton";
import { useContext } from "react";
import { modalContexts } from "../modals/ModalProviders";

export default function SearchButton() {
    const { open } = useContext(modalContexts["search"])

    return (
        <NavButton
            icon={Search}
            onClick={open}
            text="Search"
        />
    )
}