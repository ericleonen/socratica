import { LayoutProps } from "@/types";

export default function AuthContent({ children }: LayoutProps) {
    return (
        <div className="border-2 flex flex-col items-center">
            {children}
        </div>
    )
}