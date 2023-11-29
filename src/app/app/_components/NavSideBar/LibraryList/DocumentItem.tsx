import { DocumentMetadataType } from "@/utils/store";
import Link from "next/link";

export default function DocumentItem({ id, title }: DocumentMetadataType) {
    return (
        <Link href="#">
            {title} 
        </Link>
    )
}