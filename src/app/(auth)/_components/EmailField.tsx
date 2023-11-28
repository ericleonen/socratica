import { handleChange } from "@/utils/input";

type EmailFieldProps = {
    email: string,
    setEmail: (email: string) => void
}

export default function EmailField({ email, setEmail }: EmailFieldProps) {
    return (
        <div>
            <label htmlFor="email">Email</label>
            <input 
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={handleChange(setEmail)}
                className="border-2"
            />
        </div>
    );
}