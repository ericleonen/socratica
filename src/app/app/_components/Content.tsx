import { useDocsMetadatas } from "@/db/docs";
import { useUser } from "@/db/user";
import { LayoutType } from "@/types";

export default function Content({ children }: LayoutType) {
    useUser();
    useDocsMetadatas();

    return children;
}