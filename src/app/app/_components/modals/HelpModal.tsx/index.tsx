import { useContext, useState } from "react"
import { modalContexts } from "../ModalProviders"
import Modal from "../Modal";
import HelpSlider from "./HelpSlider";
import HelpNavigation from "./HelpNavigation";

export default function HelpModal() {
    const { close } = useContext(modalContexts["help"]);

    const [helpIndex, setHelpIndex] = useState(0);
    const numHelp = 5;

    return (
        <Modal
            {...{close}}
            className="text-slate-700 dark:text-slate-300"
        >
            <p className="w-full p-3 font-bold text-center border-b-2 border-slate-200 dark:border-slate-700">Help</p>
            <div className="p-3 flex flex-col">
                <HelpSlider {...{helpIndex, numHelp}} />
                <HelpNavigation {...{helpIndex, setHelpIndex, numHelp}} />
            </div>
        </Modal>
    )
}