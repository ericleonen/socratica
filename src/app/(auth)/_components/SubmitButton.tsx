type SubmitButtonProps = {
    onClick?: () => void,
    children: React.ReactNode
}

export default function SubmitButton({ onClick, children }: SubmitButtonProps) {
    return (
        <button
            type="submit"
            className="border-2"
        >
            { children}
        </button>
    );
}