import { LayoutType } from "@/types";

export default function LibraryLayout({ children }: LayoutType) {
    return (
        <div className="flex-grow">
            {children}
        </div>
    )
}