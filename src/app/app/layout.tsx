import HorizontalLayout from "@/components/HorizontalLayout";
import { LayoutType } from "@/types";

export default function AppLayout({ children }: LayoutType) {
    return (
        <HorizontalLayout screenWidth>
            {children}
        </HorizontalLayout>
    )
}