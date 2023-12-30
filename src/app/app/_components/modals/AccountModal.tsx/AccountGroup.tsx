import { LayoutProps } from "@/types";

export default function AccountGroup({ children }: LayoutProps) {
    return (
        <div className="flex flex-col items-center px-12 py-6 border-t-2 border-slate-200 dark:border-slate-600">
            {children}
        </div>
    )
}