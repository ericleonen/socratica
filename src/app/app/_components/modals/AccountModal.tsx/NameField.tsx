import { useEditableUserName } from "@/db/user/update";
import { LayoutProps } from "@/types";
import { handleChange } from "@/utils/input";

export default function NameField({ className }: LayoutProps) {
    const [name, setName] = useEditableUserName();

    return (
        <input 
            type="text"
            value={name}
            onChange={handleChange(setName)}
            placeholder="Name"
            spellCheck={false}
            autoComplete="name"
            className={`
              text-slate-700 placeholder:text-slate-400 border-slate-300 focus:border-amber-300 bg-white rounded font-medium px-3 py-2
                border-2 w-full focus:outline-none focus:shadow-focus
                ${className || ""}
            `}
        />
    )
}