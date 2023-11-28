type HeaderProps = {
    children: React.ReactNode
}

export default function AuthHeader({ children } : HeaderProps) {
    return (
        <div className="border-2">
            <p className="text-center">{children}</p>
        </div>
    )
}