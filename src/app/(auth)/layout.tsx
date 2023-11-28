import VerticalLayout from "@/components/VerticalLayout";
import { LayoutType } from "@/types";

export default function AuthLayout({ children }: LayoutType) {
    return (
        <VerticalLayout screenHeight>
            {children}
        </VerticalLayout>
    );
}