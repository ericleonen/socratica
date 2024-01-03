import { LayoutProps, Trigger } from "@/types";
import React, { createContext, useState } from "react";
import DeleteWarningModal from "./DeleteModal";
import SearchModal from "./SearchModal";
import SettingsModal from "./SettingsModal.tsx";
import AccountModal from "./AccountModal.tsx";
import TokensModal from "./TokensModal";
import SpendModal from "./SpendModal";

const modals: { [modal: string]: React.ElementType } = {
    "delete": DeleteWarningModal,
    "search": SearchModal,
    "settings": SettingsModal,
    "account": AccountModal,
    "tokens": TokensModal,
    "spend": SpendModal
};
export const modalContexts: { [modal: string]: React.Context<ModalContext> } = {};

type ModalContext = {
    open: Trigger,
    close: Trigger
}

Object.keys(modals).forEach(modal => {
    modalContexts[modal] = createContext<ModalContext>({} as ModalContext);
}); 

type ModalProviderProps = {
    children: React.ReactNode,
    modal: string
}

function ModalProvider({ children, modal }: ModalProviderProps) {
    const [show, setShow] = useState(false);

    const Context = modalContexts[modal];
    const Modal = modals[modal];

    const open = () => setShow(true);
    const close = () => setShow(false);

    return (
        <Context.Provider value={{ open, close }}>
            {children}
            { show && <Modal /> }
        </Context.Provider>
    )
}

export default function ModalProviders({ children }: LayoutProps) {
    let nestedProviders = children;

    for (let modal in modals) {
        nestedProviders = (
            <ModalProvider {...{modal}}>
                {nestedProviders}
            </ModalProvider>
        )
    }

    return nestedProviders;
}