import { Transition } from "@headlessui/react"

type ShadowProps = {
    children?: React.ReactNode,
    transparent?: boolean,
    onClick: () => void
}

export default function Shadow({ transparent, children, onClick }: ShadowProps) {
    return (
        <Transition
            show={true}
            appear={true}
            enter="transition-color"
            enterFrom="bg-transparent"
            enterTo={`${transparent ? "bg-transparent" : "bg-black/40 dark:bg-black/60"}`}
            onClick={onClick}
            className={`w-screen h-screen fixed left-0 top-0 z-50 hover:cursor-default`}
        >
            {children}
        </Transition>
    )
}