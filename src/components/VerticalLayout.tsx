type VerticalLayoutProps = {
    screenHeight?: boolean,
    children: React.ReactNode
}

export default function VerticalLayout({ children, screenHeight }: VerticalLayoutProps) {
    return (
        <div className={`h-${screenHeight ? "screen" : "full"} w-full flex flex-col relative overflow-y-scroll`}>
            {children}
        </div>
    )
}