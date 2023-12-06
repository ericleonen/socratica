import VerticalLayout from "@/components/VerticalLayout";
import { LayoutType } from "@/types";

export default function LibraryLayout({ children }: LayoutType) {
    return (
        <div className="flex-grow">
            <VerticalLayout screenHeight>
                {children}
            </VerticalLayout>
        </div>
    )
}