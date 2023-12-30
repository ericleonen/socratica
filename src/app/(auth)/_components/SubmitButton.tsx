import { LayoutProps } from "@/types";

export default function SubmitButton({ children, className }: LayoutProps) {
    return (
        <button
            type="submit"
            className={`
                bg-sky-600 hover:bg-sky-500 text-white font-bold px-3 py-2 rounded-md shadow-md
                w-full flex items-center whitespace-nowrap justify-center
                ${className || ""}
            `}
        >
            {children}
        </button>
    );
}