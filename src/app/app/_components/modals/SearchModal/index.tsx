import Modal from "../Modal";
import { useState } from "react";
import { useModalContext } from "../ModalContext";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Icon from "@/theme/Icon";
import { EnterKey, TransferData } from "@icon-park/react";
import SearchShortcuts from "./SearchShortcuts";
import { useKeyDown } from "@/utils/input";

export default function SearchModal() {
    const [query, setQuery] = useState("");

    const { setSearchModal } = useModalContext();
    const close = () => {
        setSearchModal(false);
        setQuery("");
    };

    useKeyDown(close, "Escape");

    return (
        <Modal 
            close={close}
            className="w-[36rem] h-1/2 overflow-hidden"
        >
            <SearchBar {...{query, setQuery}} />
            <SearchResults {...{close, query}} />
            <SearchShortcuts />
        </Modal>
    )
}