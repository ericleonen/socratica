import { handleChange } from "@/utils/input"

type PasswordFieldProps = {
    password: string,
    setPassword: (password: string) => void,
    confirm?: boolean
}

export default function PasswordField({ password, setPassword, confirm }: PasswordFieldProps) {
    const name = `${confirm ?? "confirm-"}password`;
    const label = confirm ? "Confirm password" : "Password"

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input 
                type="password"
                name={name}
                placeholder={label}
                required
                value={password}
                onChange={handleChange(setPassword)}
                className="border-2"
            />
        </div>
    )
}