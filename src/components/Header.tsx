type HeaderProps = {
    children: React.ReactNode
}

export default function Header({ children }: HeaderProps) {
    return (
        <>
            <div className="h-14 w-full flex items-center border-2 fixed">
                {children}
            </div>
            <div className="h-14 w-full"/>
        </>
    );
}