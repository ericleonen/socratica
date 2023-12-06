type HorizontalLayoutProps = {
    screenWidth?: boolean,
    children: React.ReactNode
}

export default function HorizontalLayout({ children, screenWidth}: HorizontalLayoutProps) {
    return (
        <div className={`w-${screenWidth ? "screen" : "full"} h-full flex bg-theme-white overflow-hidden`}>
            {children}
        </div>
    )
}