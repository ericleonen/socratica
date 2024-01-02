import { useUserEmail } from "@/db/user/read"
import { LayoutProps } from "@/types";

export default function EmailDisplay({ className }: LayoutProps) {
    const email = useUserEmail();

    return (
        <input
            type="email"
            value={email}
            onChange={() => {}}
            spellCheck={false}
            className={`
              text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 focus:border-amber-300 bg-white dark:bg-slate-800 rounded font-medium px-3 py-2
                border-2 w-full focus:outline-none focus:shadow-focus hover:cursor-not-allowed
                ${className || ""}
            `}
        />
    )
}