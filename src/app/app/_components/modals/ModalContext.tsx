import { createContext, useContext, useState } from "react";

type ModalContextType = {
    setDeleteModal: (value: boolean) => void,
    setSearchModal: (value: boolean) => void,
    setHelpModal: (value: boolean) => void,
    setSettingsModal: (value: boolean) => void,
    setAccountModal: (value: boolean) => void
}

const ModalContext = createContext<ModalContextType>({
    setDeleteModal: (value: boolean) => {},
    setSearchModal: (value: boolean) => {},
    setHelpModal: (value: boolean) => {},
    setSettingsModal: (value: boolean) => {},
    setAccountModal: (value: boolean) => {},
});

export function useInitModalContext(): [
    { 
        deleteModal: boolean, 
        searchModal: boolean, 
        helpModal: boolean, 
        settingsModal: boolean, 
        accountModal: boolean 
    },
    ModalContextType
] {
    const [deleteModal, setDeleteModal] = useState(false);
    const [searchModal, setSearchModal] = useState(false);
    const [helpModal, setHelpModal] = useState(false);
    const [settingsModal, setSettingsModal] = useState(false);
    const [accountModal, setAccountModal] = useState(false);

    return [{
        deleteModal,
        searchModal,
        helpModal,
        settingsModal,
        accountModal,
    }, {
        setDeleteModal,
        setSearchModal,
        setHelpModal,
        setSettingsModal,
        setAccountModal
    }]
}

export const useModalContext = () => useContext<ModalContextType>(ModalContext);

export default ModalContext;