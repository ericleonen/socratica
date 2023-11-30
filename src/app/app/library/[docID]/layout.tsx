import VerticalLayout from "@/components/VerticalLayout";
import { LayoutType } from "@/types";

export default function DocLayout({ children }: LayoutType) {
    return (
        <div className="flex-grow">
            <VerticalLayout screenHeight>
                {children}
            </VerticalLayout>
        </div>
    )
}