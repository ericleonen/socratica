type SignInWithGoogleProps = {
    onClick: () => void,
    children: React.ReactNode
}

export default function SignInWithGoogle({ onClick, children }: SignInWithGoogleProps) {
    return (
        <button
            onClick={onClick}
        >
            {children}
        </button>
    )
}