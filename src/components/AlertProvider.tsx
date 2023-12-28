import Icon from "@/theme/Icon";
import { LayoutProps } from "@/types";
import { Transition } from "@headlessui/react";
import { Copy, Delete, Success } from "@icon-park/react";
import { createContext, useEffect, useState } from "react";

type AlertTheme = "deletion" | "success" | "copied";

export const AlertContext = createContext<(theme: AlertTheme, text: string) => void>(
    (theme: AlertTheme, text: string) => {}
);

export default function AlertProvider({ children }: LayoutProps) {
    const [theme, setTheme] = useState<AlertTheme | undefined>(undefined);
    const [text, setText] = useState<string | undefined>(undefined);
    const [show, setShow] = useState(false);

    const setAlert = (theme: AlertTheme, text: string) => {
        console.log(theme, text, show);

        if (show) return;

        setTheme(theme);
        setText(text);
        setShow(true);
    }

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                setShow(false);
            }, 2000);
        }
    }, [show]);

    return (
        <AlertContext.Provider value={setAlert}>
            <Transition 
                show={show}
                enter="transition-[transform,opacity,top]"
                enterFrom="opacity-0 translate-y-[-100%] top-0"
                enterTo="opacity-100 translate-y-0 top-10"
                leave="transition-opacity"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="z-[100] absolute left-1/2 translate-x-[-50%] top-10"
            >
                <div
                    className={`
                        pointer-events-none whitespace-nowrap flex items-center py-2 px-3 rounded-md border-2 font-bold text-sm
                        ${
                            theme === "deletion" ? "bg-red-200 dark:bg-slate-800 text-red-700 dark:text-red-500 border-red-700 dark:border-red-500" :
                            theme === "success"  ? "bg-green-200 dark:bg-slate-800 text-green-700 dark:text-green-500 border-green-700 dark:border-green-500" :
                            theme === "copied"  && "bg-slate-700 dark:bg-slate-800 text-white dark:text-slate-300 border-slate-700 dark:border-slate-300"
                        }
                    `}
                >
                    <Icon 
                        type={
                            theme === "deletion" ? Delete :
                            theme === "success"  ? Success :
                            undefined
                        } 
                        className="mr-2 text-large"  
                    />
                    {text}
                </div>
            </Transition>
            {children}
        </AlertContext.Provider>
    );
}