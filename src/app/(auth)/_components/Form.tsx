type FormType = {
    onSubmit: (e: React.FormEvent) => void,
    children: React.ReactNode
}

export default function Form({ onSubmit, children }: FormType) {
    return (
        <form {...{onSubmit}}>
            {children}
        </form>
    )
}