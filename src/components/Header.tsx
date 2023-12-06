type HeaderProps = {
    children: React.ReactNode
}

export default function Header({ children }: HeaderProps) {
    return (
        <div className="py-2 w-full sticky top-0 flex items-center bg-slate-50/50 backdrop-blur-sm shadow-sm px-3">
            {children}
        </div>
    );
}