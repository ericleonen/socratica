import { LayoutProps } from "@/types";

export default function LibraryLayout({ children }: LayoutProps) {
    return (
        <div className="flex-grow">
            {children}
        </div>
    )
}