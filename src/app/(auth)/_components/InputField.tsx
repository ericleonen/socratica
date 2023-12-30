import { handleChange } from "@/utils/input";

type InputFieldProps = {
    value: string,
    setValue: (newValue: string) => void,
    type: "name" | "password" | "email",
    className?: string,
    placeholder?: string
}

export default function InputField({ value, setValue, type, className, placeholder }: InputFieldProps) {
    return (
        <input 
            type={type === "name" ? "text" : type}
            placeholder={placeholder || `${type[0].toUpperCase()}${type.substring(1)}`}
            value={value}
            onChange={handleChange(setValue)}
            spellCheck={false}
            autoComplete={type}
            className={`
              text-slate-700 placeholder:text-slate-400 border-slate-300 focus:border-amber-300 bg-white rounded font-medium px-3 py-2
                border-2 w-full focus:outline-none focus:shadow-focus
                ${className || ""}
            `}
        />
    );
}