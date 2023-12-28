import Modal from "../Modal";
import { useContext, useState } from "react";
import { useModalContext } from "../ModalContext";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Icon from "@/theme/Icon";
import { EnterKey, TransferData } from "@icon-park/react";
import SearchShortcuts from "./SearchShortcuts";
import { useKeyDown } from "@/utils/input";
import { modalContexts } from "../ModalProviders";

export default function SearchModal() {
    const [query, setQuery] = useState("");

    const { close } = useContext(modalContexts["search"]);

    useKeyDown(close, "Escape");

    return (
        <Modal 
            close={close}
            className="w-[28rem] bg-white"
        >
            <SearchBar {...{query, setQuery}} />
            <SearchResults {...{close, query}} />
            <SearchShortcuts />
        </Modal>
    )
}