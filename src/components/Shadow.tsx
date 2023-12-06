type ShadowProps = {
    children?: React.ReactNode,
    transparent?: boolean,
    onClick: () => void
}

export default function Shadow({ transparent, children, onClick }: ShadowProps) {
    return (
        <div
            onClick={onClick}
            className={`w-screen h-screen fixed left-0 top-0 ${transparent ? "bg-transparent" : "bg-black/80"} z-50 hover:cursor-default`}
        >
            {children}
        </div>
    )
}