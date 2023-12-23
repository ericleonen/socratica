import { Transition } from "@headlessui/react"

type PopUpProps = {
    children: React.ReactNode,
    style?: React.CSSProperties,
    className?: string
}

export default function PopUp({ children, style, className }: PopUpProps) {
    return (
        <Transition
            show={true}
            appear={true}
            enter="transition-opacity transition-transform"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            className={className}
            style={style}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            {children}
        </Transition>
    )
}