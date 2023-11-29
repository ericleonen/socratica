type HorizontalLayoutProps = {
    screenWidth?: boolean,
    children: React.ReactNode
}

export default function HorizontalLayout({ children, screenWidth}: HorizontalLayoutProps) {
    return (
        <div className={`w-${screenWidth ? "screen" : "full"} h-full flex border-2 relative`}>
            {children}
        </div>
    )
}