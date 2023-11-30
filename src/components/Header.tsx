type HeaderProps = {
    children: React.ReactNode
}

export default function Header({ children }: HeaderProps) {
    return (
        <>
            <div className="h-14 w-full flex items-center fixed bg-slate-50/50 backdrop-blur-sm shadow-sm">
                {children}
            </div>
        </>
    );
}