import { Search } from "@icon-park/react";
import NavButton from "./NavButton";
import { useModalContext } from "../modals/ModalContext";

export default function SearchButton() {
    const { setSearchModal } = useModalContext();
    const open = () => setSearchModal(true);

    return (
        <NavButton
            icon={Search}
            onClick={open}
            text="Search"
        />
    )
}