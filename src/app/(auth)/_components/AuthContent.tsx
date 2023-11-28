import { LayoutType } from "@/types";

export default function AuthContent({ children }: LayoutType) {
    return (
        <div className="border-2 flex flex-col items-center">
            {children}
        </div>
    )
}