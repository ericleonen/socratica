import PopUp from "@/components/PopUp";
import Shadow from "@/components/Shadow";
import { Trigger } from "@/types";

type ModalProps = {
    close: Trigger,
    children: React.ReactNode,
    className?: string
}

export default function Modal({ close, children, className }: ModalProps) {
    return (
        <Shadow onClick={close}>
            <PopUp className={`bg-white dark:bg-slate-800 overflow-hidden absolute w-[30rem] border-2 border-slate-700 dark:border-slate-300 shadow-sm dark:shadow-sm-dark rounded-md flex flex-col top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] ${className || ""}`}>
                {children}
            </PopUp>
        </Shadow>
    )
}